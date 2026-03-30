import Tutor from '../models/Tutor.js';
import Course from '../models/Course.js';

export const getAllTutors = async (req, res, next) => {
  try {
    const {
      featured,
      subject,
      expertise,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const query = { isActive: true };

    if (featured !== undefined) {
      query.isFeatured = featured === 'true';
    }

    if (subject) {
      query.subjects = { $in: [subject] };
    }

    if (expertise) {
      query.expertise = { $in: [expertise] };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { headline: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } },
        { subjects: { $elemMatch: { $regex: search, $options: 'i' } } },
        { expertise: { $elemMatch: { $regex: search, $options: 'i' } } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [tutors, total] = await Promise.all([
      Tutor.find(query)
        .sort({ order: 1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Tutor.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: tutors.length,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: tutors,
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedTutors = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;

    const tutors = await Tutor.find({
      isActive: true,
      isFeatured: true,
    })
      .sort({ order: 1, rating: -1, totalStudents: -1, createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: tutors.length,
      data: tutors,
    });
  } catch (error) {
    next(error);
  }
};

export const getTutorById = async (req, res, next) => {
  try {
    const tutor = await Tutor.findById(req.params.id);

    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: 'Tutor not found',
      });
    }

    const courses = await Course.find({
      tutor: tutor._id,
      isActive: true,
      isPublished: true,
    }).select('title thumbnail category subject level rating totalEnrollments');

    res.status(200).json({
      success: true,
      data: {
        ...tutor.toObject(),
        courses,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createTutor = async (req, res, next) => {
  try {
    const tutor = await Tutor.create(req.body);

    res.status(201).json({
      success: true,
      data: tutor,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTutor = async (req, res, next) => {
  try {
    const tutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: 'Tutor not found',
      });
    }

    res.status(200).json({
      success: true,
      data: tutor,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTutor = async (req, res, next) => {
  try {
    const tutor = await Tutor.findByIdAndDelete(req.params.id);

    if (!tutor) {
      return res.status(404).json({
        success: false,
        message: 'Tutor not found',
      });
    }

    await Course.updateMany(
      { tutor: req.params.id },
      { $unset: { tutor: 1 } }
    );

    res.status(200).json({
      success: true,
      message: 'Tutor deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};