import type { Task, Note, ScheduleEvent } from '../types';

interface DashboardProps {
  tasks: Task[];
  notes: Note[];
  events: ScheduleEvent[];
}

export default function Dashboard({ tasks, notes, events }: DashboardProps) {
  const incompleteTasks = tasks.filter(t => !t.completed);
  const todayEvents = events.filter(e => {
    const today = new Date();
    const eventDate = new Date(e.date);
    return eventDate.toDateString() === today.toDateString();
  });

  return (
    <div className="dashboard">
      <h1>📚 Welcome to re-plan</h1>
      <p className="subtitle">Your student planning platform</p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>📝 Quick Stats</h2>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{notes.length}</span>
              <span className="stat-label">Notes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{incompleteTasks.length}</span>
              <span className="stat-label">Active Tasks</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{todayEvents.length}</span>
              <span className="stat-label">Today's Events</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>✅ Upcoming Tasks</h2>
          {incompleteTasks.length === 0 ? (
            <p className="empty-state">No active tasks. You're all caught up! 🎉</p>
          ) : (
            <ul className="task-preview-list">
              {incompleteTasks.slice(0, 5).map(task => (
                <li key={task.id} className={`priority-${task.priority}`}>
                  <span>{task.title}</span>
                  <span className="task-priority">{task.priority}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="dashboard-card">
          <h2>📅 Today's Schedule</h2>
          {todayEvents.length === 0 ? (
            <p className="empty-state">No events scheduled for today</p>
          ) : (
            <ul className="event-preview-list">
              {todayEvents.map(event => (
                <li key={event.id}>
                  <span className="event-time">{event.startTime}</span>
                  <span className="event-title">{event.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="dashboard-card">
          <h2>📖 Recent Notes</h2>
          {notes.length === 0 ? (
            <p className="empty-state">No notes yet</p>
          ) : (
            <ul className="note-preview-list">
              {notes.slice(0, 5).map(note => (
                <li key={note.id}>
                  <span className="note-title">{note.title}</span>
                  <span className="note-date">
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
