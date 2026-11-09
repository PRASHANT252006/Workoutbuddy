const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Please enter a workout title'], trim: true },
  load: { type: Number, required: [true, 'Please enter the load'], min: [0, 'Load cannot be negative'] },
  reps: { type: Number, required: [true, 'Please enter the number of reps'], min: [1, 'Reps must be at least 1'], validate: { validator: Number.isInteger, message: 'Reps must be a whole number' } }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
