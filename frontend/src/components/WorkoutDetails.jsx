import { useContext, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import { WorkoutContext } from '../context/WorkoutContext';

const WorkoutDetails = ({ workout }) => {
  const { dispatch, API_URL } = useContext(WorkoutContext);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setDeleting(true);
    setError('');
    try {
      await axios.delete(`${API_URL}/${workout._id}`);
      dispatch({ type: 'REMOVE_WORKOUT', payload: workout._id });
    } catch (err) {
      setError(err.response?.data?.error || 'Could not delete this workout.');
      setDeleting(false);
    }
  };

  return (
    <article className="workout-card">
      <div className="workout-info">
        <h3>{workout.title}</h3>
        <p><strong>Load (in Kgs):</strong> {workout.load}</p>
        <p><strong>Reps:</strong> {workout.reps}</p>
        <span>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</span>
        {error && <p className="inline-error">{error}</p>}
      </div>
      <button className="delete-button" onClick={handleDelete} disabled={deleting} aria-label={`Delete ${workout.title}`}>
        <Trash2 size={17} />
      </button>
    </article>
  );
};

export default WorkoutDetails;
