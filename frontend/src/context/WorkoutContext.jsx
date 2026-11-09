import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

export const WorkoutContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/workouts';

const workoutReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { workouts: action.payload };
    case 'ADD_WORKOUT':
      return { workouts: [action.payload, ...state.workouts] };
    case 'REMOVE_WORKOUT':
      return { workouts: state.workouts.filter(workout => workout._id !== action.payload) };
    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, { workouts: [] });

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get(API_URL);
        dispatch({ type: 'SET_WORKOUTS', payload: response.data });
      } catch (error) {
        console.error('Could not fetch workouts:', error.response?.data?.error || error.message);
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch, API_URL }}>
      {children}
    </WorkoutContext.Provider>
  );
};
