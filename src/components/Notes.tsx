import { useState } from 'react';
import type { Note } from '../types';

interface NotesProps {
  notes: Note[];
  onSave: (notes: Note[]) => void;
}

export default function Notes({ notes, onSave }: NotesProps) {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleNewNote = () => {
    setIsCreating(true);
    setSelectedNote(null);
    setTitle('');
    setContent('');
  };

  const handleSelectNote = (note: Note) => {
    setIsCreating(false);
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleSave = () => {
    if (!title.trim()) return;

    if (isCreating) {
      const newNote: Note = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      onSave([...notes, newNote]);
    } else if (selectedNote) {
      const updatedNotes = notes.map(note =>
        note.id === selectedNote.id
          ? { ...note, title: title.trim(), content: content.trim(), updatedAt: new Date() }
          : note
      );
      onSave(updatedNotes);
    }

    setIsCreating(false);
    setSelectedNote(null);
    setTitle('');
    setContent('');
  };

  const handleDelete = (noteId: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      onSave(notes.filter(note => note.id !== noteId));
      if (selectedNote?.id === noteId) {
        setSelectedNote(null);
        setTitle('');
        setContent('');
      }
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setSelectedNote(null);
    setTitle('');
    setContent('');
  };

  return (
    <div className="notes-container">
      <div className="notes-sidebar">
        <div className="notes-header">
          <h2>📝 Notes</h2>
          <button className="btn-primary" onClick={handleNewNote}>
            + New Note
          </button>
        </div>
        <div className="notes-list">
          {notes.length === 0 ? (
            <p className="empty-state">No notes yet. Create your first note!</p>
          ) : (
            notes.map(note => (
              <div
                key={note.id}
                className={`note-item ${selectedNote?.id === note.id ? 'active' : ''}`}
                onClick={() => handleSelectNote(note)}
              >
                <h3>{note.title}</h3>
                <p className="note-preview">{note.content.substring(0, 100)}...</p>
                <div className="note-meta">
                  <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                  <button
                    className="btn-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(note.id);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="notes-editor">
        {(isCreating || selectedNote) ? (
          <>
            <input
              type="text"
              className="note-title-input"
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="note-content-input"
              placeholder="Start writing your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="note-actions">
              <button className="btn-primary" onClick={handleSave} disabled={!title.trim()}>
                Save
              </button>
              <button className="btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="empty-editor">
            <p>Select a note to view or edit, or create a new one</p>
          </div>
        )}
      </div>
    </div>
  );
}
