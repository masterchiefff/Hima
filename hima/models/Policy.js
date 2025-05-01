const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  policyNo: { type: String, required: true, unique: true },
  dueDate: { type: Date, required: true },
  type: { 
    type: String, 
    enum: ['rider', 'motorcycle'], 
    required: true 
  },
  premiumType: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
  premiumAmount: { type: Number, required: true },
  benefits: [{
    name: String,
    description: String,
    coverageLimit: Number,
  }],
  status: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Policy', policySchema);