import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  answer: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const questionnaireResponseSchema = new mongoose.Schema(
  {
    questionnaireId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Questionnaire',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    responses: [responseSchema],
    completedAt: {
      type: Date,
      default: Date.now,
    },
    isCompleted: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one response per user per questionnaire
questionnaireResponseSchema.index({ questionnaireId: 1, userId: 1 }, { unique: true });

export default mongoose.model('QuestionnaireResponse', questionnaireResponseSchema);