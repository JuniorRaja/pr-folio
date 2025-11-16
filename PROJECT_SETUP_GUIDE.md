# Project Revamp Setup Guide

## Overview
The project display has been completely revamped with:
- New card layout (image left, content right)
- Type and language filters
- Dynamic project detail pages
- Organized data structure

## Files Created/Modified

### New Files
1. **`src/data/projectsData.ts`** - Centralized project data with all required fields
2. **`src/pages/ProjectDetail.tsx`** - Dynamic project detail page
3. **`src/App.tsx`** - Updated with new routes

### Modified Files
1. **`src/components/Projects.tsx`** - New card layout with filters

---

## TODO: Fill in Project Information

### For Each Project in `src/data/projectsData.ts`:

#### 1. **Project Image**
Replace `/placeholder.svg` with actual project image URL
```typescript
image: "/path/to/actual/project/image.png"
```

#### 2. **Project Summary**
Replace `[TODO: Add project summary]` with a brief overview
```typescript
summary: "A comprehensive description of what the project does and its purpose..."
```

#### 3. **Approach**
Replace `[TODO: Describe your approach...]` with how you built it
```typescript
approach: "Started with X, then implemented Y, finally optimized with Z..."
```

#### 4. **Skills Demonstrated**
Replace the TODO items with actual skills
```typescript
skillsDemonstrated: [
  "React component architecture",
  "State management with Redux",
  "Responsive design implementation"
]
```

#### 5. **Topics Covered**
Replace the TODO items with key concepts
```typescript
topicsCovered: [
  "Component composition",
  "API integration",
  "Performance optimization"
]
```

#### 6. **Project Snapshots**
Replace `/placeholder.svg` with actual screenshot URLs
```typescript
snapshots: [
  "/path/to/screenshot1.png",
  "/path/to/screenshot2.png",
  "/path/to/screenshot3.png"
]
```

---

## Project Data Structure

Each project has:
- `id` - Unique identifier (used in URL: `/project/{id}`)
- `title` - Project name
- `type` - One of: "Frontend", "Backend", "Full-stack", "Web App", "AI Chat", "Website", "Mobile"
- `image` - Main project image
- `languages` - Array of programming languages used
- `tags` - Array of technologies/frameworks
- `liveUrl` - Link to live project
- `githubUrl` - Link to GitHub repository
- `summary` - Brief project overview
- `approach` - How you built it
- `skillsDemonstrated` - Array of skills showcased
- `toolsUsed` - Array of tools/libraries
- `topicsCovered` - Array of key concepts
- `snapshots` - Array of screenshot URLs

---

## Features Implemented

### 1. **Project Cards**
- Image on left (responsive: stacks on mobile)
- Content on right with title, type, languages
- Two action buttons: "Live Site" and "Details"
- Hover effects with image zoom

### 2. **Filters**
- **Type Filter**: Dropdown-style badges to filter by project type
- **Language Filter**: Text input with autocomplete suggestions
  - Only shows available languages from your projects
  - Click suggestion to apply filter
  - Clear button to reset

### 3. **Project Detail Page**
Route: `/project/{project-id}`

Displays:
- Project title and type
- Quick links (Live Site, Repository)
- Main project image
- Technical Information section:
  - Languages used
  - Tools used
  - Topics covered
  - Links to live site and repo
- Project Summary
- Approach
- Skills Demonstrated (bulleted list)
- Project Snapshots (grid layout)

### 4. **Responsive Design**
- Mobile: Cards stack vertically
- Tablet/Desktop: Image left, content right
- All elements adapt to light/dark mode

---

## How to Update Project Data

1. Open `src/data/projectsData.ts`
2. Find the project you want to update
3. Replace all `[TODO: ...]` placeholders with actual information
4. Update image URLs and snapshot URLs
5. Save the file

The changes will automatically reflect on:
- Projects list page (`/works` or `/projects`)
- Individual project detail pages (`/project/{id}`)

---

## Color Theme

The design automatically matches your current color theme:
- Uses CSS variables from your Tailwind config
- Supports both light and dark modes
- Glass-morphism cards with `glass-card` class
- Primary color accents throughout

---

## Navigation

- **Projects List**: `/works` or `/projects`
- **Project Detail**: `/project/{project-id}`
  - Example: `/project/pr-verse`
  - Example: `/project/brainwave-ai`

---

## Notes

- All project IDs are lowercase with hyphens (e.g., `pr-verse`, `brainwave-ai`)
- Filters work together (type AND language)
- "All" in type filter shows all projects
- Language filter is optional
- Project snapshots display in a 2-column grid on desktop
