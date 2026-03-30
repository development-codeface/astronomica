import Notification from '../models/Notifications.js';
import { HTTP_STATUS_CODES } from '../config/constants.js';

export const getAllNotifications = async (req, res, next) => {
  try {
    const {
      type,
      isPublished,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const query = { isActive: true };

    if (type) {
      query.type = type;
    }

    if (isPublished !== undefined) {
      query.isPublished = isPublished === 'true';
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { body: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [notifications, total] = await Promise.all([
      Notification.find(query)
        .populate('createdBy', 'name email role')
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Notification.countDocuments(query),
    ]);

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      count: notifications.length,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

export const getNotificationById = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id).populate(
      'createdBy',
      'name email role'
    );

    if (!notification) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Notification not found',
      });
    }

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};

export const createNotification = async (req, res, next) => {
  try {
    const { title, body, image, type, isPublished, isActive, order } = req.body;

    const notification = await Notification.create({
      title,
      body,
      image,
      type,
      isPublished,
      isActive,
      order,
      createdBy: req.user?._id || req.user?.id,
    });

    res.status(HTTP_STATUS_CODES.CREATED).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!notification) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Notification not found',
      });
    }

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Notification not found',
      });
    }

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: 'Notification deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};