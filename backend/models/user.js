const mongoose = require('mongoose');

const CaregiverSchema = new mongoose.Schema({
  name: { type: String, required: true },     // caregiver name
  phone: { type: String },                    // caregiver phone
  email: { type: String },                    // caregiver email
  relationship: {
    type: String,
    enum: ['family', 'doctor', 'other'],
    default: 'family',
  },
});

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
    language: { type: String, enum: ['en', 'hi'], default: 'en' },
    caregivers: [CaregiverSchema],              // <--- caregivers array
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
