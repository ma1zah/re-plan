import type { Note, Task, ScheduleEvent } from '../types';

const STORAGE_KEYS = {
  NOTES: 'rePlan_notes',
  TASKS: 'rePlan_tasks',
  SCHEDULE: 'rePlan_schedule',
};

// Notes
export const getNotes = (): Note[] => {
  const notes = localStorage.getItem(STORAGE_KEYS.NOTES);
  if (!notes) return [];
  return JSON.parse(notes).map((note: Note) => ({
    ...note,
    createdAt: new Date(note.createdAt),
    updatedAt: new Date(note.updatedAt),
  }));
};

export const saveNotes = (notes: Note[]): void => {
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
};

// Tasks
export const getTasks = (): Task[] => {
  const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
  if (!tasks) return [];
  return JSON.parse(tasks).map((task: Task) => ({
    ...task,
    createdAt: new Date(task.createdAt),
    dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
  }));
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
};

// Schedule
export const getScheduleEvents = (): ScheduleEvent[] => {
  const events = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
  if (!events) return [];
  return JSON.parse(events).map((event: ScheduleEvent) => ({
    ...event,
    date: new Date(event.date),
  }));
};

export const saveScheduleEvents = (events: ScheduleEvent[]): void => {
  localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(events));
};
