import type { View } from '../types';

interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Navigation({ currentView, onViewChange }: NavigationProps) {
  const navItems: { view: View; icon: string; label: string }[] = [
    { view: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { view: 'notes', icon: '📝', label: 'Notes' },
    { view: 'tasks', icon: '✅', label: 'Tasks' },
    { view: 'schedule', icon: '📅', label: 'Schedule' },
    { view: 'study', icon: '⏰', label: 'Study' },
  ];

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h1>📚 re-plan</h1>
        <p>Student Planning Platform</p>
      </div>
      <div className="nav-items">
        {navItems.map(item => (
          <button
            key={item.view}
            className={`nav-item ${currentView === item.view ? 'active' : ''}`}
            onClick={() => onViewChange(item.view)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
