import Course from '../models/Course.js';

export const getAllCourses = async (req, res, next) => {
  try {
    const {
      category,
      subject,
      level,
      isTrending,
      isPopular,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const query = { isActive: true };

    if (category) query.category = category;
    if (subject) query.subject = subject;
    if (level) query.level = level;

    if (isTrending !== undefined) {
      query.isTrending = isTrending === 'true';
    }

    if (isPopular !== undefined) {
      query.isPopular = isPopular === 'true';
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [courses, total] = await Promise.all([
      Course.find(query)
        .populate('tutor', 'name profileImage headline rating')
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Course.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: courses.length,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

export const getTrendingCourses = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;

    const courses = await Course.find({
      isActive: true,
      isPublished: true,
      isTrending: true,
    })
      .populate('tutor', 'name profileImage headline rating')
      .sort({ order: 1, totalEnrollments: -1, rating: -1, createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

export const getPopularCourses = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;

    const courses = await Course.find({
      isActive: true,
      isPublished: true,
      isPopular: true,
    })
      .populate('tutor', 'name profileImage headline rating')
      .sort({ totalEnrollments: -1, rating: -1, createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      'tutor',
      'name profileImage headline bio expertise rating totalStudents totalCourses'
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};