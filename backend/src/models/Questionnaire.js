import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Question text is required'],
  },
  type: {
    type: String,
    enum: ['text', 'radio', 'checkbox', 'select'],
    default: 'text',
  },
  options: [{
    type: String,
    trim: true,
  }],
  allowMultiple: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
});

const questionnaireSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Questionnaire title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    questions: [questionSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
    targetRoles: [{
      type: String,
      enum: ['user', 'parent', 'admin'],
      default: ['user'],
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
questionnaireSchema.index({ isActive: 1, targetRoles: 1 });

export default mongoose.model('Questionnaire', questionnaireSchema);