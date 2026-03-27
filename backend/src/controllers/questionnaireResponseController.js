import Questionnaire from '../models/Questionnaire.js';
import QuestionnaireResponse from '../models/QuestionnaireResponse.js';
import logger from '../utils/logger.js';
import { HTTP_STATUS_CODES } from '../config/constants.js';

export const getUserResponses = async (req, res, next) => {
  try {
    const responses = await QuestionnaireResponse.find({
      userId: req.user.id,
    })
      .populate('questionnaireId', 'title description')
      .sort({ createdAt: -1 });

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: responses,
    });
  } catch (error) {
    next(error);
  }
};

export const submitResponse = async (req, res, next) => {
  try {
    const { questionnaireId, responses } = req.body;

    if (!questionnaireId || !responses || !Array.isArray(responses)) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Questionnaire ID and responses array are required',
      });
    }

    // Check if questionnaire exists and is active
    const questionnaire = await Questionnaire.findById(questionnaireId);
    if (!questionnaire || !questionnaire.isActive) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Questionnaire not found or inactive',
      });
    }

    // Check if user has access to this questionnaire
    if (!questionnaire.targetRoles.includes(req.user.role)) {
      return res.status(HTTP_STATUS_CODES.FORBIDDEN).json({
        success: false,
        message: 'Access denied to this questionnaire',
      });
    }

    // Check if user already submitted a response
    const existingResponse = await QuestionnaireResponse.findOne({
      questionnaireId,
      userId: req.user.id,
    });

    if (existingResponse) {
      return res.status(HTTP_STATUS_CODES.CONFLICT).json({
        success: false,
        message: 'You have already submitted a response to this questionnaire',
      });
    }

    // Validate responses
    const validationErrors = [];
    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];
      const question = questionnaire.questions.find(
        q => q._id.toString() === response.questionId
      );

      if (!question) {
        validationErrors.push(`Question ${i + 1}: Invalid question ID`);
        continue;
      }

      // Check if required question has answer
      if (question.required && (!response.answer || response.answer === '')) {
        validationErrors.push(`Question "${question.text}": Answer is required`);
        continue;
      }

      // Validate answer format based on question type
      if (question.allowMultiple) {
        // Multi-select: should be array
        if (response.answer && !Array.isArray(response.answer)) {
          validationErrors.push(`Question "${question.text}": Multiple answers should be an array`);
          continue;
        }
        if (response.answer && response.answer.length > 0) {
          // Check if all selected options are valid
          const invalidOptions = response.answer.filter(
            option => !question.options.includes(option)
          );
          if (invalidOptions.length > 0) {
            validationErrors.push(`Question "${question.text}": Invalid options selected: ${invalidOptions.join(', ')}`);
          }
        }
      } else {
        // Single select: should not be array
        if (Array.isArray(response.answer)) {
          validationErrors.push(`Question "${question.text}": Only one answer allowed`);
          continue;
        }
        // Check if answer is valid option (for choice questions)
        if (response.answer && ['radio', 'checkbox', 'select'].includes(question.type)) {
          if (!question.options.includes(response.answer)) {
            validationErrors.push(`Question "${question.text}": Invalid option selected`);
          }
        }
      }
    }

    if (validationErrors.length > 0) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Validation errors',
        errors: validationErrors,
      });
    }

    // Create response
    const questionnaireResponse = await QuestionnaireResponse.create({
      questionnaireId,
      userId: req.user.id,
      responses,
      isCompleted: true,
    });

    await questionnaireResponse.populate([
      { path: 'questionnaireId', select: 'title description' },
      { path: 'userId', select: 'name email' },
    ]);

    res.status(HTTP_STATUS_CODES.CREATED).json({
      success: true,
      data: questionnaireResponse,
    });
  } catch (error) {
    next(error);
  }
};

export const getResponse = async (req, res, next) => {
  try {
    const response = await QuestionnaireResponse.findOne({
      questionnaireId: req.params.questionnaireId,
      userId: req.user.id,
    }).populate('questionnaireId', 'title description');

    if (!response) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Response not found',
      });
    }

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const updateResponse = async (req, res, next) => {
  try {
    const { responses } = req.body;

    if (!responses || !Array.isArray(responses)) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Responses array is required',
      });
    }

    // Find existing response
    const existingResponse = await QuestionnaireResponse.findOne({
      questionnaireId: req.params.questionnaireId,
      userId: req.user.id,
    });

    if (!existingResponse) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Response not found',
      });
    }

    // Get questionnaire for validation
    const questionnaire = await Questionnaire.findById(req.params.questionnaireId);
    if (!questionnaire) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Questionnaire not found',
      });
    }

    // Validate responses (same logic as submit)
    const validationErrors = [];
    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];
      const question = questionnaire.questions.find(
        q => q._id.toString() === response.questionId
      );

      if (!question) {
        validationErrors.push(`Question ${i + 1}: Invalid question ID`);
        continue;
      }

      if (question.required && (!response.answer || response.answer === '')) {
        validationErrors.push(`Question "${question.text}": Answer is required`);
        continue;
      }

      if (question.allowMultiple) {
        if (response.answer && !Array.isArray(response.answer)) {
          validationErrors.push(`Question "${question.text}": Multiple answers should be an array`);
          continue;
        }
        if (response.answer && response.answer.length > 0) {
          const invalidOptions = response.answer.filter(
            option => !question.options.includes(option)
          );
          if (invalidOptions.length > 0) {
            validationErrors.push(`Question "${question.text}": Invalid options selected: ${invalidOptions.join(', ')}`);
          }
        }
      } else {
        if (Array.isArray(response.answer)) {
          validationErrors.push(`Question "${question.text}": Only one answer allowed`);
          continue;
        }
        if (response.answer && ['radio', 'checkbox', 'select'].includes(question.type)) {
          if (!question.options.includes(response.answer)) {
            validationErrors.push(`Question "${question.text}": Invalid option selected`);
          }
        }
      }
    }

    if (validationErrors.length > 0) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Validation errors',
        errors: validationErrors,
      });
    }

    // Update response
    const updatedResponse = await QuestionnaireResponse.findByIdAndUpdate(
      existingResponse._id,
      {
        responses,
        completedAt: new Date(),
      },
      { new: true }
    ).populate('questionnaireId', 'title description');

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: updatedResponse,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteResponse = async (req, res, next) => {
  try {
    const response = await QuestionnaireResponse.findOneAndDelete({
      questionnaireId: req.params.questionnaireId,
      userId: req.user.id,
    });

    if (!response) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Response not found',
      });
    }

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: 'Response deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getAllResponses = async (req, res, next) => {
  try {
    const responses = await QuestionnaireResponse.find({
      questionnaireId: req.params.questionnaireId,
    })
      .populate('userId', 'name email role')
      .populate('questionnaireId', 'title')
      .sort({ createdAt: -1 });

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: responses,
    });
  } catch (error) {
    next(error);
  }
};

export const getResponseAnalytics = async (req, res, next) => {
  try {
    const questionnaire = await Questionnaire.findById(req.params.questionnaireId);
    if (!questionnaire) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Questionnaire not found',
      });
    }

    const responses = await QuestionnaireResponse.find({
      questionnaireId: req.params.questionnaireId,
      isCompleted: true,
    }).populate('userId', 'name email role');

    const totalResponses = responses.length;
    const analytics = {
      questionnaire: {
        id: questionnaire._id,
        title: questionnaire.title,
        totalQuestions: questionnaire.questions.length,
      },
      summary: {
        totalResponses,
        responseRate: totalResponses > 0 ? 'Calculated based on target users' : 0,
      },
      questions: [],
    };

    // Analyze each question
    questionnaire.questions.forEach((question, index) => {
      const questionAnalytics = {
        questionId: question._id,
        text: question.text,
        type: question.type,
        allowMultiple: question.allowMultiple,
        totalAnswers: 0,
        answers: {},
      };

      responses.forEach(response => {
        const questionResponse = response.responses.find(
          r => r.questionId.toString() === question._id.toString()
        );

        if (questionResponse && questionResponse.answer) {
          questionAnalytics.totalAnswers++;

          if (question.allowMultiple && Array.isArray(questionResponse.answer)) {
            // Multi-select answers
            questionResponse.answer.forEach(option => {
              questionAnalytics.answers[option] = (questionAnalytics.answers[option] || 0) + 1;
            });
          } else if (!question.allowMultiple) {
            // Single-select answers
            const answer = questionResponse.answer;
            questionAnalytics.answers[answer] = (questionAnalytics.answers[answer] || 0) + 1;
          }
        }
      });

      analytics.questions.push(questionAnalytics);
    });

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};