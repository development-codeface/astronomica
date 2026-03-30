import Analytics from '../models/Analytics.js';
import { HTTP_STATUS_CODES } from '../config/constants.js';

export const getAllAnalytics = async (req, res, next) => {
  try {
    const {
      examType,
      isPublished,
      page = 1,
      limit = 10,
      search,
    } = req.query;

    const query = { isActive: true };

    if (examType) {
      query.examType = examType;
    }

    if (isPublished !== undefined) {
      query.isPublished = isPublished === 'true';
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { examType: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [analytics, total] = await Promise.all([
      Analytics.find(query)
        .populate('createdBy', 'name email role')
        .populate('updatedBy', 'name email role')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Analytics.countDocuments(query),
    ]);

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      count: analytics.length,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};

export const getAnalyticsById = async (req, res, next) => {
  try {
    const analytics = await Analytics.findById(req.params.id)
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role');

    if (!analytics) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Analytics record not found',
      });
    }

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};

export const getLatestPublishedAnalytics = async (req, res, next) => {
  try {
    const analytics = await Analytics.findOne({
      isActive: true,
      isPublished: true,
    })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role');

    if (!analytics) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'No published analytics found',
      });
    }

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};

export const createAnalytics = async (req, res, next) => {
  try {
    const {
      title,
      projectedScore,
      targetScore,
      monthlyPoints,
      monthlyPointsLabel,
      daysLeft,
      daysLeftLabel,
      progressSegments,
      examType,
      description,
      isPublished,
      isActive,
    } = req.body;

    const analytics = await Analytics.create({
      title,
      projectedScore,
      targetScore,
      monthlyPoints,
      monthlyPointsLabel,
      daysLeft,
      daysLeftLabel,
      progressSegments,
      examType,
      description,
      isPublished,
      isActive,
      createdBy: req.user?._id || req.user?.id,
      updatedBy: req.user?._id || req.user?.id,
    });

    res.status(HTTP_STATUS_CODES.CREATED).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAnalytics = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      updatedBy: req.user?._id || req.user?.id,
    };

    const analytics = await Analytics.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!analytics) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Analytics record not found',
      });
    }

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAnalytics = async (req, res, next) => {
  try {
    const analytics = await Analytics.findByIdAndDelete(req.params.id);

    if (!analytics) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Analytics record not found',
      });
    }

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: 'Analytics deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};