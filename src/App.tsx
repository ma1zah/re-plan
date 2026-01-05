import { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Notes from './components/Notes';
import Tasks from './components/Tasks';
import Schedule from './components/Schedule';
import Study from './components/Study';
import type { View, Note, Task, ScheduleEvent } from './types';
import { getNotes, saveNotes, getTasks, saveTasks, getScheduleEvents, saveScheduleEvents } from './utils/storage';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [notes, setNotes] = useState<Note[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);

  useEffect(() => {
    setNotes(getNotes());
    setTasks(getTasks());
    setEvents(getScheduleEvents());
  }, []);

  const handleNotesUpdate = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const handleTasksUpdate = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleEventsUpdate = (updatedEvents: ScheduleEvent[]) => {
    setEvents(updatedEvents);
    saveScheduleEvents(updatedEvents);
  };

  return (
    <div className="app">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main className="main-content">
        {currentView === 'dashboard' && (
          <Dashboard tasks={tasks} notes={notes} events={events} />
        )}
        {currentView === 'notes' && (
          <Notes notes={notes} onSave={handleNotesUpdate} />
        )}
        {currentView === 'tasks' && (
          <Tasks tasks={tasks} onSave={handleTasksUpdate} />
        )}
        {currentView === 'schedule' && (
          <Schedule events={events} onSave={handleEventsUpdate} />
        )}
        {currentView === 'study' && <Study />}
      </main>
    </div>
  );
}

export default App;
