import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['text', 'textarea', 'radio', 'checkbox', 'select'],
      default: 'text',
    },
    options: [
      {
        type: String,
        trim: true,
      },
    ],
    required: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

const onboardingQuestionnaireSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    questions: {
      type: [questionSchema],
      required: true,
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: 'At least one question is required',
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('OnboardingQuestionnaire', onboardingQuestionnaireSchema);