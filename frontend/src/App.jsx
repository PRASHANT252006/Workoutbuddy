import { useContext } from 'react';
import WorkoutDetails from './components/WorkoutDetails';
import WorkoutForm from './components/WorkoutForm';
import { WorkoutContext } from './context/WorkoutContext';

const App = () => {
  const { workouts } = useContext(WorkoutContext);

  return (
    <main className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <span className="brand-mark">WB</span>
          <h1>Workout Budyyy</h1>
        </div>
      </header>
      <section className="workspace">
        <div className="workout-list">
          {workouts.length > 0 ? workouts.map(workout => (
            <WorkoutDetails key={workout._id} workout={workout} />
          )) : (
            <div className="empty-state">
              <div className="empty-icon">✦</div>
              <h2>No workouts yet</h2>
              <p>Add your first workout using the form.</p>
            </div>
          )}
        </div>
        <aside className="form-panel">
          <WorkoutForm />
        </aside>
      </section>
      <footer>Build consistency. Get stronger.</footer>
    </main>
  );
};

export default App;
