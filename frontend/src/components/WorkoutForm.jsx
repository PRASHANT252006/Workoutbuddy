import { useContext, useState } from 'react';
import axios from 'axios';
import { WorkoutContext } from '../context/WorkoutContext';

const WorkoutForm = () => {
  const { dispatch, API_URL } = useContext(WorkoutContext);
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!title.trim() || load === '' || reps === '') {
      setError('Please fill in all fields.');
      return;
    }
    if (!Number.isFinite(Number(load)) || Number(load) < 0 || !Number.isInteger(Number(reps)) || Number(reps) < 1) {
      setError('Enter a valid load and a positive whole number of reps.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(API_URL, { title: title.trim(), load: Number(load), reps: Number(reps) });
      dispatch({ type: 'ADD_WORKOUT', payload: response.data });
      setTitle('');
      setLoad('');
      setReps('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <h2>Add a New Workout</h2>
      <label htmlFor="title">Exercise Title:</label>
      <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Chest" />
      <label htmlFor="load">Load (in Kg's):</label>
      <input id="load" type="number" min="0" step="any" value={load} onChange={e => setLoad(e.target.value)} placeholder="e.g. 15" />
      <label htmlFor="reps">Reps:</label>
      <input id="reps" type="number" min="1" step="1" value={reps} onChange={e => setReps(e.target.value)} placeholder="e.g. 30" />
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="submit-button" type="submit" disabled={isLoading}>{isLoading ? 'Adding...' : 'Add Workout!'}</button>
    </form>
  );
};

export default WorkoutForm;
