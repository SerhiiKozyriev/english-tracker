# English Tracker 🇬🇧

A modern, streamlined web application for tracking English learning progress. This tool helps learners maintain consistency by logging study sessions, categorizing activities, and visualizing progress through streaks and statistics.

## 🚀 Features

- **Session Management**: Log your study sessions with duration, detailed notes, and specific topics.
- **Categorized Tracking**: Organize your learning into key areas: Grammar, Listening, VocabularyComponent, Reading, Speaking, and Writing.
- **Progress Visualization**:
  - **Streaks**: Stay motivated with an interactive streak counter.
  - **Total Stats**: View cumulative learning time and session counts.
  - **Category Analysis**: Breakdown of your study focus across different English skills.
- **Search & Filter**: Easily find past sessions using the integrated search functionality.
- **Responsive Design**: Clean and interactive UI built with modern CSS techniques.

## 🛠 Tech Stack

- **Frontend**: [Angular](https://angular.dev/) (v22+)
- **State Management**: Signals-based reactivity for efficient updates.
- **Testing**: [Vitest](https://vitest.dev/) for high-performance unit testing.
- **Styling**: Vanilla CSS with custom properties (variables) for a lightweight and maintainable design system.
- **Code Quality**:
  - **ESLint**: Industry-standard linting.
  - **Prettier**: Consistent code formatting.
  - **Husky & Lint-staged**: Automated checks on every commit.
- **Backend Communication**: RESTful API integration via Angular's `HttpClient`.

## 📂 Project Structure

The project follows a modular, feature-based architecture for scalability and maintainability:

```text
src/app/
├── core/           # Singleton services, global providers, and layout components (Header)
├── features/       # Feature-specific modules (Sessions, Stats, etc.)
│   └── sessions/   # Main feature: components, services, models, and routes
├── shared/         # Reusable UI components (Modals, Tags, etc.)
└── styles/         # Global styles, variables, and component-level utilities
```

## 🚥 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/english-tracker.git
   cd english-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm start
```
The app will be available at `http://localhost:4200/`.

### Building

To create a production-ready build:
```bash
npm run build
```
The output will be in the `dist/` directory.

### Testing & Linting

- **Run unit tests**: `npm test`
- **Lint code**: `npm run lint`
- **Format code**: Prettier runs automatically via ESLint or can be triggered in your IDE.

## ⚙️ Configuration

The application connects to a backend API. Configuration can be found in `src/environment/environment.ts`:

```typescript
export const Environment = {
  apiHost: 'http://localhost:3000/api', // Update this to your local or production API
};
```
