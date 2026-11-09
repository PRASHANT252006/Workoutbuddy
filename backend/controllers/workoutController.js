const mongoose = require('mongoose');
const Workout = require('../models/workoutModel');

const getWorkouts = async (req, res, next) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) { next(error); }
};

const createWorkout = async (req, res, next) => {
  try {
    const { title, load, reps } = req.body;
    if (!title || String(title).trim() === '' || load === undefined || reps === undefined || load === '' || reps === '') {
      return res.status(400).json({ error: 'Please fill in all fields.' });
    }
    const numericLoad = Number(load);
    const numericReps = Number(reps);
    if (!Number.isFinite(numericLoad) || numericLoad < 0 || !Number.isInteger(numericReps) || numericReps < 1) {
      return res.status(400).json({ error: 'Load must be a non-negative number and reps must be a positive whole number.' });
    }
    const workout = await Workout.create({ title: String(title).trim(), load: numericLoad, reps: numericReps });
    res.status(201).json(workout);
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ error: Object.values(error.errors).map(e => e.message).join(', ') });
    next(error);
  }
};

const deleteWorkout = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid workout ID.' });
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ error: 'Workout not found.' });
    res.status(200).json({ message: 'Workout deleted successfully.', _id: req.params.id });
  } catch (error) { next(error); }
};

module.exports = { getWorkouts, createWorkout, deleteWorkout };
