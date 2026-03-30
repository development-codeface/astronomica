import mongoose from 'mongoose';

const progressSegmentSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      trim: true,
      default: '',
    },
    value: {
      type: Number,
      required: [true, 'Please provide segment value'],
      min: [0, 'Segment value cannot be negative'],
      max: [100, 'Segment value cannot be more than 100'],
    },
    colorType: {
      type: String,
      enum: ['green', 'blue', 'white', 'purple'],
      default: 'green',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const analyticsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: 'Projected Score',
    },
    projectedScore: {
      type: Number,
      required: [true, 'Please provide projected score'],
      min: [0, 'Projected score cannot be negative'],
    },
    targetScore: {
      type: Number,
      required: [true, 'Please provide target score'],
      min: [0, 'Target score cannot be negative'],
    },
    monthlyPoints: {
      type: Number,
      required: [true, 'Please provide monthly points'],
      default: 0,
    },
    monthlyPointsLabel: {
      type: String,
      trim: true,
      default: 'points this Month',
    },
    daysLeft: {
      type: Number,
      required: [true, 'Please provide days left'],
      min: [0, 'Days left cannot be negative'],
      default: 0,
    },
    daysLeftLabel: {
      type: String,
      trim: true,
      default: 'd Left',
    },
    progressSegments: {
      type: [progressSegmentSchema],
      default: [],
      validate: {
        validator: function (segments) {
          return segments.length <= 10;
        },
        message: 'Progress segments cannot exceed 10 items',
      },
    },
    examType: {
      type: String,
      trim: true,
      default: 'SAT',
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Analytics', analyticsSchema);