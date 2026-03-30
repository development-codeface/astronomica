import OnboardingQuestionnaire from '../models/OnboardingQuestionnaire.js';
import { HTTP_STATUS_CODES } from '../config/constants.js';

const QUESTION_TYPES_WITH_OPTIONS = ['radio', 'checkbox', 'select'];

const validateQuestions = (questions = []) => {
  const errors = [];

  if (!Array.isArray(questions) || questions.length === 0) {
    errors.push('At least one question is required');
    return errors;
  }

  questions.forEach((question, index) => {
    if (!question.label || !question.label.trim()) {
      errors.push(`Question ${index + 1}: label is required`);
    }

    if (QUESTION_TYPES_WITH_OPTIONS.includes(question.type)) {
      if (!Array.isArray(question.options) || question.options.length === 0) {
        errors.push(`Question ${index + 1}: options are required for ${question.type}`);
      }
    }
  });

  return errors;
};

export const createOnboardingQuestionnaire = async (req, res, next) => {
  try {
    const { title, topic, questions } = req.body;

    if (!title || !title.trim()) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Title is required',
      });
    }

    if (!topic || !topic.trim()) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Topic is required',
      });
    }

    const questionErrors = validateQuestions(questions);
    if (questionErrors.length > 0) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Validation failed',
        errors: questionErrors,
      });
    }

    const questionnaire = await OnboardingQuestionnaire.create({
      title: title.trim(),
      topic: topic.trim(),
      questions,
      createdBy: req.user.id,
    });

    res.status(HTTP_STATUS_CODES.CREATED).json({
      success: true,
      data: questionnaire,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOnboardingQuestionnaires = async (req, res, next) => {
  try {
    const { topic } = req.query;

    const query = {};
    if (topic) {
      query.topic = topic.trim();
    }

    const questionnaires = await OnboardingQuestionnaire.find(query)
      .sort({ createdAt: -1 });

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: questionnaires,
    });
  } catch (error) {
    next(error);
  }
};

export const getOnboardingQuestionnaireById = async (req, res, next) => {
  try {
    const questionnaire = await OnboardingQuestionnaire.findById(req.params.id);

    if (!questionnaire) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Onboarding questionnaire not found',
      });
    }

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: questionnaire,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOnboardingQuestionnaire = async (req, res, next) => {
  try {
    const { title, topic, questions } = req.body;

    const questionnaire = await OnboardingQuestionnaire.findById(req.params.id);

    if (!questionnaire) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Onboarding questionnaire not found',
      });
    }

    if (questions) {
      const questionErrors = validateQuestions(questions);
      if (questionErrors.length > 0) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
          success: false,
          message: 'Validation failed',
          errors: questionErrors,
        });
      }
    }

    if (title !== undefined) questionnaire.title = title;
    if (topic !== undefined) questionnaire.topic = topic;
    if (questions !== undefined) questionnaire.questions = questions;

    await questionnaire.save();

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: questionnaire,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOnboardingQuestionnaire = async (req, res, next) => {
  try {
    const questionnaire = await OnboardingQuestionnaire.findByIdAndDelete(req.params.id);

    if (!questionnaire) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Onboarding questionnaire not found',
      });
    }

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: 'Onboarding questionnaire deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};