### JS Podcast App — DJS05

## Overview

This project is a dynamic podcast web application built with React and Tailwind CSS. It fetches live data from an external API and displays it in a responsive grid layout.

The app demonstrates React component architecture, data management with hooks, and maintainable functional code. It applies functional programming principles by separating data manipulating logic from data rendering, improving clarity, scalability, and pure data practices.

## Technologies Used

React (Vite / JSX) — Component-based UI with hooks for state and lifecycle management.

Tailwind CSS — Utility-first styling framework for rapid, responsive design.

JavaScript (ES6+) — Functional data mapping and transformation logic.

External API — Fetches real-time podcast data (https://podcast-api.netlify.app/).

## Core Features
# Landing Page

- Displays all podcasts in a responsive grid.

# Each podcast card includes:

- Cover image

- Title

- Number of seasons

- Associated genre names

- “Last updated” in a human-readable format

## Data Fetching & State Management

- Fetches live data using an async API function (fetchData).

- Maps and merges genre data with podcast data via apiDataMapping.

- Implements loading and error states for user feedback.

## Styling & Responsiveness

Built with Tailwind CSS, ensuring:

Clean, consistent typography and spacing.

Adaptive layouts across mobile, tablet, and desktop.

Utility classes for hover states, shadows, borders, and flex/grid layouts.

## Code Architecture

- RenderComponent.jsx — Parent component handles fetching, error/loading states, data mapping, and passes data as props.

- RenderDetailedPage.jsx — Child component responsible displaying shows data.

- RenderSeasons.jsx — Child component responsible displaying seasons data.

- Helper Modules — Contain logic for date formatting, API mapping, and utility functions.

## Design & Workflow

- React Hooks for Lifecycle Management (useState, useEffect)

- Functional Data Transformation separates logic from UI rendering

- Centralized Error & Loading Handling in the parent App component

- Reusable Component Design ensures each podcast card is dynamic and easily maintainable

- Navigation & Routing uses react-router-dom with dynamic routes (/podcast/:podcastId)

- State Persistence through useState and navigate state object

## All non-UI logic (data formatting, genre lookups, timestamps) is handled in utility modules.

- Error & Loading Handling in Parent. Centralized in the parent App component to simplify control flow.

- Ensures the child render component receives clean, ready-to-render data only.

## Reusable Component Design

- Each card uses props to render dynamic podcast data.

## How to Run the Project

Clone the repository

git clone <repository-url>
cd <repository-folder>


Install dependencies

npm install

Run the development server

npm run dev


Open in browser
Visit the local development URL (usually http://localhost:5173).

## Future Improvements

- Add genre-based filtering and sorting.

- Implement detailed podcast modal view.

- Improve accessibility (ARIA roles, keyboard navigation).

- Optimize large dataset handling.

- Add user preferences (theme toggle, sorting options).

- Auto-refreshes (polling) every 2 minutes using setInterval within useEffect.

- Make use of third party state management

- Lazy loading and mem caching to optimize searches and renders

- Optimize for the least amount of re-renders needed

