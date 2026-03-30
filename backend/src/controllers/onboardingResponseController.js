import OnboardingQuestionnaire from '../models/OnboardingQuestionnaire.js';
import OnboardingResponse from '../models/OnboardingResponse.js';
import { HTTP_STATUS_CODES } from '../config/constants.js';

const isEmptyAnswer = (answer) => {
  return (
    answer === undefined ||
    answer === null ||
    answer === '' ||
    (Array.isArray(answer) && answer.length === 0)
  );
};

const validateAnswers = (questionnaire, answers = []) => {
  const errors = [];

  if (!Array.isArray(answers)) {
    errors.push('answers must be an array');
    return errors;
  }

  for (const item of answers) {
    const question = questionnaire.questions.find(
      (q) => String(q._id) === String(item.questionId)
    );

    if (!question) {
      errors.push(`Invalid questionId: ${item.questionId}`);
      continue;
    }

    if (question.required && isEmptyAnswer(item.answer)) {
      errors.push(`Answer is required for: ${question.label}`);
      continue;
    }

    if (question.type === 'radio' || question.type === 'select') {
      if (!isEmptyAnswer(item.answer) && !question.options.includes(item.answer)) {
        errors.push(`Invalid option for: ${question.label}`);
      }
    }

    if (question.type === 'checkbox') {
      if (!Array.isArray(item.answer)) {
        errors.push(`Answer must be an array for: ${question.label}`);
        continue;
      }

      const invalidOptions = item.answer.filter(
        (option) => !question.options.includes(option)
      );

      if (invalidOptions.length > 0) {
        errors.push(`Invalid options for: ${question.label}`);
      }
    }
  }

  questionnaire.questions.forEach((question) => {
    if (question.required) {
      const found = answers.find(
        (a) => String(a.questionId) === String(question._id)
      );

      if (!found || isEmptyAnswer(found.answer)) {
        errors.push(`Required question missing: ${question.label}`);
      }
    }
  });

  return errors;
};

export const submitOnboardingResponse = async (req, res, next) => {
  try {
    const { onboardingQuestionnaireId, answers } = req.body;

    if (!onboardingQuestionnaireId || !Array.isArray(answers)) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'onboardingQuestionnaireId and answers are required',
      });
    }

    const questionnaire = await OnboardingQuestionnaire.findById(onboardingQuestionnaireId);

    if (!questionnaire) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Onboarding questionnaire not found',
      });
    }

    const validationErrors = validateAnswers(questionnaire, answers);
    if (validationErrors.length > 0) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    const existingResponse = await OnboardingResponse.findOne({
      onboardingQuestionnaireId,
      userId: req.user.id,
    });

    if (existingResponse) {
      return res.status(HTTP_STATUS_CODES.CONFLICT).json({
        success: false,
        message: 'Response already submitted for this questionnaire',
      });
    }

    const response = await OnboardingResponse.create({
      onboardingQuestionnaireId,
      userId: req.user.id,
      answers,
    });

    res.status(HTTP_STATUS_CODES.CREATED).json({
      success: true,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOnboardingResponses = async (req, res, next) => {
  try {
    const responses = await OnboardingResponse.find({ userId: req.user.id })
      .populate('onboardingQuestionnaireId', 'title topic')
      .sort({ createdAt: -1 });

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: responses,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOnboardingResponseByQuestionnaire = async (req, res, next) => {
  try {
    const response = await OnboardingResponse.findOne({
      onboardingQuestionnaireId: req.params.onboardingQuestionnaireId,
      userId: req.user.id,
    }).populate('onboardingQuestionnaireId', 'title topic questions');

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

export const updateMyOnboardingResponse = async (req, res, next) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'answers are required',
      });
    }

    const questionnaire = await OnboardingQuestionnaire.findById(
      req.params.onboardingQuestionnaireId
    );

    if (!questionnaire) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Onboarding questionnaire not found',
      });
    }

    const validationErrors = validateAnswers(questionnaire, answers);
    if (validationErrors.length > 0) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    const response = await OnboardingResponse.findOneAndUpdate(
      {
        onboardingQuestionnaireId: req.params.onboardingQuestionnaireId,
        userId: req.user.id,
      },
      { answers },
      { new: true, runValidators: true }
    );

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

export const deleteMyOnboardingResponse = async (req, res, next) => {
  try {
    const response = await OnboardingResponse.findOneAndDelete({
      onboardingQuestionnaireId: req.params.onboardingQuestionnaireId,
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
export const getAllResponsesForQuestionnaire = async (req, res, next) => {
  try {
    const responses = await OnboardingResponse.find({
      onboardingQuestionnaireId: req.params.onboardingQuestionnaireId,
    })
      .populate('userId', 'name email role')
      .populate('onboardingQuestionnaireId', 'title topic')
      .sort({ createdAt: -1 });

    res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      data: responses,
    });
  } catch (error) {
    next(error);
  }
};

export const getOnboardingResponseAnalytics = async (req, res, next) => {
  try {
    const questionnaire = await OnboardingQuestionnaire.findById(
      req.params.onboardingQuestionnaireId
    );

    if (!questionnaire) {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: 'Onboarding questionnaire not found',
      });
    }

    const responses = await OnboardingResponse.find({
      onboardingQuestionnaireId: req.params.onboardingQuestionnaireId,
      isCompleted: true,
    }).populate('userId', 'name email role');

    const analytics = {
      questionnaire: {
        id: questionnaire._id,
        title: questionnaire.title,
        topic: questionnaire.topic,
        totalQuestions: questionnaire.questions.length,
      },
      summary: {
        totalResponses: responses.length,
      },
      questions: [],
    };

    questionnaire.questions.forEach((question) => {
      const questionAnalytics = {
        questionId: question._id,
        text: question.text,
        type: question.type,
        allowMultiple: question.allowMultiple,
        totalAnswers: 0,
        answers: {},
      };

      responses.forEach((responseDoc) => {
        const questionResponse = responseDoc.responses.find(
          (r) => String(r.questionId) === String(question._id)
        );

        if (
          questionResponse &&
          questionResponse.answer !== undefined &&
          questionResponse.answer !== null &&
          questionResponse.answer !== ''
        ) {
          questionAnalytics.totalAnswers++;

          if (question.allowMultiple && Array.isArray(questionResponse.answer)) {
            questionResponse.answer.forEach((option) => {
              questionAnalytics.answers[option] =
                (questionAnalytics.answers[option] || 0) + 1;
            });
          } else {
            const answerKey = String(questionResponse.answer);
            questionAnalytics.answers[answerKey] =
              (questionAnalytics.answers[answerKey] || 0) + 1;
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