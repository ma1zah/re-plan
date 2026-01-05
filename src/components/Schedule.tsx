import { useState } from 'react';
import type { ScheduleEvent } from '../types';

interface ScheduleProps {
  events: ScheduleEvent[];
  onSave: (events: ScheduleEvent[]) => void;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];

export default function Schedule({ events, onSave }: ScheduleProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddEvent = () => {
    if (!title.trim() || !date || !startTime || !endTime) return;

    const newEvent: ScheduleEvent = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      date: new Date(date),
      startTime,
      endTime,
      color,
    };

    onSave([...events, newEvent]);
    setTitle('');
    setDescription('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setColor(COLORS[0]);
    setShowForm(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      onSave(events.filter(event => event.id !== eventId));
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const days = getDaysInMonth(selectedDate);
  const monthName = selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const changeMonth = (offset: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setSelectedDate(newDate);
  };

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h2>📅 Schedule</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Event'}
        </button>
      </div>

      {showForm && (
        <div className="event-form">
          <input
            type="text"
            className="event-input"
            placeholder="Event title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="event-description"
            placeholder="Description (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="event-form-row">
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Start Time:</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>End Time:</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Color:</label>
            <div className="color-picker">
              {COLORS.map(c => (
                <button
                  key={c}
                  className={`color-option ${color === c ? 'selected' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>
          <button
            className="btn-primary"
            onClick={handleAddEvent}
            disabled={!title.trim() || !date || !startTime || !endTime}
          >
            Add Event
          </button>
        </div>
      )}

      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => changeMonth(-1)}>←</button>
          <h3>{monthName}</h3>
          <button onClick={() => changeMonth(1)}>→</button>
        </div>

        <div className="calendar-weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>

        <div className="calendar-days">
          {days.map((day, index) => {
            const dayEvents = day ? getEventsForDate(day) : [];
            const isToday = day && day.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`calendar-day ${!day ? 'empty' : ''} ${isToday ? 'today' : ''}`}
              >
                {day && (
                  <>
                    <div className="day-number">{day.getDate()}</div>
                    <div className="day-events">
                      {dayEvents.map(event => (
                        <div
                          key={event.id}
                          className="event-dot"
                          style={{ backgroundColor: event.color }}
                          title={`${event.title} (${event.startTime} - ${event.endTime})`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="events-list">
        <h3>Upcoming Events</h3>
        {events.length === 0 ? (
          <p className="empty-state">No events scheduled</p>
        ) : (
          events
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map(event => (
              <div key={event.id} className="event-item" style={{ borderLeftColor: event.color }}>
                <div className="event-content">
                  <h4>{event.title}</h4>
                  {event.description && <p>{event.description}</p>}
                  <div className="event-time">
                    📅 {new Date(event.date).toLocaleDateString()} | 
                    🕐 {event.startTime} - {event.endTime}
                  </div>
                </div>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  🗑️
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
