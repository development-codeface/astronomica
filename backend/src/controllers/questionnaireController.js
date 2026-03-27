import Questionnaire from '../models/Questionnaire.js';
import QuestionnaireResponse from '../models/QuestionnaireResponse.js';
import logger from '../utils/logger.js';
import { HTTP_STATUS_CODES } from '../config/constants.js';

export const getAllQuestionnaires = async (req, res, next) => {
  try {
    const userRole = req.user?.role || 'user';
    const query = { isActive: true };

    // Filter by target roles if user is authenticated
    if (req.user) {
      query.targetRoles = { $in: [userRole] };
    }

    const questionnaires = await Questionnaire.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: questionnaires,
    });
  } catch (error) {
    next(error);
  }
};

export const getQuestionnaireById = async (req, res, next) => {
  try {
    const questionnaire = await Questionnaire.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!questionnaire) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Questionnaire not found',
      });
    }

    // Check if user has access to this questionnaire
    if (req.user) {
      const userRole = req.user.role;
      if (!questionnaire.targetRoles.includes(userRole)) {
        return res.status(HTTP_STATUS_CODES.FORBIDDEN).json({
          success: false,
          message: 'Access denied to this questionnaire',
        });
      }
    }

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: questionnaire,
    });
  } catch (error) {
    next(error);
  }
};

export const createQuestionnaire = async (req, res, next) => {
  try {
    const { title, description, questions, targetRoles, startDate, endDate } = req.body;

    // Validate questions
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'At least one question is required',
      });
    }

    // Validate each question
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (!question.text || question.text.trim() === '') {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
          success: false,
          message: `Question ${i + 1}: Text is required`,
        });
      }

      if (['radio', 'checkbox', 'select'].includes(question.type)) {
        if (!question.options || !Array.isArray(question.options) || question.options.length === 0) {
          return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
            success: false,
            message: `Question ${i + 1}: Options are required for ${question.type} type`,
          });
        }
      }
    }

    const questionnaire = await Questionnaire.create({
      title,
      description,
      questions,
      targetRoles: targetRoles || ['user'],
      createdBy: req.user.id,
      startDate,
      endDate,
    });

    await questionnaire.populate('createdBy', 'name email');

    res.status(HTTP_STATUS_CODES.CREATED).json({
      success: true,
      data: questionnaire,
    });
  } catch (error) {
    next(error);
  }
};

export const updateQuestionnaire = async (req, res, next) => {
  try {
    const questionnaire = await Questionnaire.findById(req.params.id);

    if (!questionnaire) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Questionnaire not found',
      });
    }

    // Only creator or admin can update
    if (questionnaire.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(HTTP_STATUS_CODES.FORBIDDEN).json({
        success: false,
        message: 'Not authorized to update this questionnaire',
      });
    }

    const updates = { ...req.body };
    delete updates.createdBy; // Prevent changing creator

    const updatedQuestionnaire = await Questionnaire.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: updatedQuestionnaire,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteQuestionnaire = async (req, res, next) => {
  try {
    const questionnaire = await Questionnaire.findById(req.params.id);

    if (!questionnaire) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Questionnaire not found',
      });
    }

    // Only creator or admin can delete
    if (questionnaire.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(HTTP_STATUS_CODES.FORBIDDEN).json({
        success: false,
        message: 'Not authorized to delete this questionnaire',
      });
    }

    // Soft delete by setting inactive
    await Questionnaire.findByIdAndUpdate(req.params.id, { isActive: false });

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: 'Questionnaire deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getQuestionnaireStats = async (req, res, next) => {
  try {
    const questionnaire = await Questionnaire.findById(req.params.id);

    if (!questionnaire) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Questionnaire not found',
      });
    }

    const totalResponses = await QuestionnaireResponse.countDocuments({
      questionnaireId: req.params.id,
    });

    const completedResponses = await QuestionnaireResponse.countDocuments({
      questionnaireId: req.params.id,
      isCompleted: true,
    });

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: {
        questionnaire: {
          id: questionnaire._id,
          title: questionnaire.title,
          totalQuestions: questionnaire.questions.length,
        },
        stats: {
          totalResponses,
          completedResponses,
          completionRate: totalResponses > 0 ? (completedResponses / totalResponses) * 100 : 0,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};