# re-plan

A comprehensive student planning platform built with React, TypeScript, and Vite. Plan your studies, take notes, manage tasks, schedule events, and stay focused with the Pomodoro timer.

## ✨ Features

### 📚 Dashboard
- Quick overview of your notes, tasks, and events
- Real-time statistics display
- Today's schedule at a glance
- Upcoming tasks overview

### 📝 Notes
- Create, edit, and delete notes
- Rich text editor interface
- Search and filter capabilities
- Auto-save functionality with localStorage
- Organized sidebar view

### ✅ Tasks
- Add tasks with title, description, and due dates
- Set priority levels (Low, Medium, High)
- Mark tasks as complete/incomplete
- Filter tasks by status (All, Active, Completed)
- Task sorting by priority and completion status
- Visual priority indicators

### 📅 Schedule
- Interactive monthly calendar view
- Add events with date, time, and color coding
- Visual event indicators on calendar
- Navigate between months
- Upcoming events list
- Event management (create, view, delete)

### ⏰ Study Timer (Pomodoro)
- Customizable focus and break durations
- Visual timer with circular progress indicator
- Session counter to track productivity
- Audio notification when timer completes
- Automatic switching between focus and break periods
- Study tips and best practices

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ma1zah/re-plan.git
cd re-plan
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Build

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🧪 Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## 🛠️ Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features
- **localStorage** - Client-side data persistence

## 📱 Features Overview

### Data Persistence
All your data (notes, tasks, and events) is automatically saved to your browser's localStorage, so your information persists between sessions.

### Responsive Design
The application is fully responsive and works on desktop, tablet, and mobile devices.

### User-Friendly Interface
- Intuitive navigation sidebar
- Beautiful gradient design
- Smooth transitions and animations
- Color-coded elements for better organization

## 🎯 Usage Tips

### Notes
1. Click "Notes" in the sidebar
2. Click "+ New Note" to create a note
3. Enter a title and content
4. Click "Save" to store your note

### Tasks
1. Navigate to "Tasks"
2. Click "+ New Task"
3. Fill in task details (title, description, priority, due date)
4. Click "Add Task"
5. Check off tasks as you complete them

### Schedule
1. Go to "Schedule"
2. Click "+ New Event"
3. Add event details (title, date, time, color)
4. View events on the calendar or in the list below

### Study Timer
1. Open "Study"
2. Adjust focus and break durations if desired
3. Click "Start" to begin a Pomodoro session
4. The timer will automatically switch to break time after focus period
5. Track your completed sessions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

### Project Structure
```
re-plan/
├── src/
│   ├── components/      # React components
│   │   ├── Dashboard.tsx
│   │   ├── Notes.tsx
│   │   ├── Tasks.tsx
│   │   ├── Schedule.tsx
│   │   ├── Study.tsx
│   │   └── Navigation.tsx
│   ├── types/          # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/          # Utility functions
│   │   └── storage.ts  # localStorage helpers
│   ├── App.tsx         # Main app component
│   ├── App.css         # Main styles
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html          # HTML template
└── package.json        # Dependencies
```

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Future Enhancements

- User authentication and cloud sync
- Export notes and tasks to PDF/CSV
- Dark mode support
- Collaboration features
- Mobile app version
- Integration with calendar services (Google Calendar, Outlook)
- Advanced filtering and search
- Tags and categories for better organization

---

Made with ❤️ for students everywhere
