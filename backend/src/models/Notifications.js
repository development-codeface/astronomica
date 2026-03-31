import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide notification title'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    body: {
      type: String,
      required: [true, 'Please provide notification body'],
      trim: true,
      maxlength: [1000, 'Body cannot exceed 1000 characters'],
    },
    image: {
      type: String,
      trim: true,
      default: '',
    },
    type: {
      type: String,
      enum: ['general', 'course', 'tutor', 'system', 'promo'],
      default: 'general',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Notification', notificationSchema);