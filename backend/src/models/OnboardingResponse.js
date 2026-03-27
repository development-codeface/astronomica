import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    answer: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { _id: false }
);

const onboardingResponseSchema = new mongoose.Schema(
  {
    onboardingQuestionnaireId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OnboardingQuestionnaire',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    answers: {
      type: [answerSchema],
      default: [],
    },
  },
  { timestamps: true }
);

onboardingResponseSchema.index(
  { onboardingQuestionnaireId: 1, userId: 1 },
  { unique: true }
);

export default mongoose.model('OnboardingResponse', onboardingResponseSchema);