import User from '../models/User.js';
import logger from '../utils/logger.js';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS_CODES } from '../config/constants.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }
    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(HTTP_STATUS_CODES.CREATED).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    if (!name || !email || !password) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Name, email, and password are required.',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(HTTP_STATUS_CODES.CONFLICT).json({
        success: false,
        message: 'Email already in use.',
      });
    }

    const user = await User.create({ name, email, password, role });
    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    // Store refresh token in database
    user.refreshToken = refreshToken;
    user.refreshTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
    await user.save();

    res.status(HTTP_STATUS_CODES.CREATED).json({
      success: true,
      data: {
        user: user.toJSON(),
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: 86400, // 24 hours in seconds
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    user.lastLogin = Date.now();
    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    // Store refresh token in database
    user.refreshToken = refreshToken;
    user.refreshTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
    await user.save();

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: {
        user: user.toJSON(),
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: 86400, // 24 hours in seconds
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Profile not found.',
      });
    }

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (updates.password) delete updates.password; // password change separate

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'User not found.',
      });
    }

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Old password, new password, and confirm password are required.',
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'New password and confirm password do not match.',
      });
    }

    if (newPassword.length < 6) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'New password must be at least 6 characters long.',
      });
    }

    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'User not found.',
      });
    }

    // Check old password
    if (!(await user.comparePassword(oldPassword))) {
      return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        message: 'Old password is incorrect.',
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: 'Password changed successfully.',
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Refresh token is required.',
      });
    }

    try {
      // Verify refresh token
      const decoded = jwt.verify(
        refresh_token,
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'your-refresh-secret-key'
      );

      if (decoded.type !== 'refresh') {
        return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
          success: false,
          message: 'Invalid refresh token.',
        });
      }

      // Find user and check if refresh token matches
      const user = await User.findById(decoded.id);
      if (!user || user.refreshToken !== refresh_token) {
        return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
          success: false,
          message: 'Invalid refresh token.',
        });
      }

      // Check if refresh token is expired
      if (user.refreshTokenExpiresAt < new Date()) {
        return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
          success: false,
          message: 'Refresh token has expired.',
        });
      }

      // Generate new tokens
      const newAccessToken = user.generateAuthToken();
      const newRefreshToken = user.generateRefreshToken();

      // Update refresh token in database
      user.refreshToken = newRefreshToken;
      user.refreshTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
      await user.save();

      res.status(HTTP_STATUS_CODES.OK).json({
        success: true,
        data: {
          access_token: newAccessToken,
          refresh_token: newRefreshToken,
          expires_in: 86400, // 24 hours in seconds
        },
      });
    } catch (error) {
      return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid refresh token.',
      });
    }
  } catch (error) {
    next(error);
  }
};

