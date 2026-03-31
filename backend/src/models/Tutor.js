import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide tutor name'],
      trim: true,
    },
    headline: {
      type: String,
      trim: true,
      maxlength: [150, 'Headline cannot exceed 150 characters'],
    },
    bio: {
      type: String,
      required: [true, 'Please provide tutor bio'],
      trim: true,
    },
    profileImage: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    expertise: {
      type: [String],
      default: [],
    },
    subjects: {
      type: [String],
      default: [],
    },
    experienceYears: {
      type: Number,
      default: 0,
      min: [0, 'Experience cannot be negative'],
    },
    qualification: {
      type: String,
      trim: true,
    },
    nationality: {
      type: String,
      trim: true,
    },
    languages: {
      type: [String],
      default: ['English'],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5'],
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: [0, 'Total reviews cannot be negative'],
    },
    totalStudents: {
      type: Number,
      default: 0,
      min: [0, 'Total students cannot be negative'],
    },
    totalCourses: {
      type: Number,
      default: 0,
      min: [0, 'Total courses cannot be negative'],
    },
    socialLinks: {
      website: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      twitter: { type: String, trim: true },
      instagram: { type: String, trim: true },
      youtube: { type: String, trim: true },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
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
  {
    timestamps: true,
  }
);

export default mongoose.model('Tutor', tutorSchema);