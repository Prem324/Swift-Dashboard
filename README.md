# SWIFT Dashboard

A responsive React dashboard for the SWIFT Front-End Internship Assignment.  
This project demonstrates custom pagination, sorting, searching, and persistent filters using Material-UI and React, styled to match the provided wireframes.

---

## Features

- **Profile Screen:**

  - Displays the first user from the dummy users API.
  - Shows User ID, Name, Email, Address, and Phone in a non-editable, responsive card.

- **Comments Dashboard:**
  - Fetches and displays all 500 comments from the dummy API.
  - Custom pagination (no library pagination):
    - Page size options: 10, 50, 100.
    - Custom page navigation with icons.
  - Custom sorting (Post ID, Name, Email):
    - Cycles through ascending, descending, and no sort.
    - Only one column sorted at a time.
  - Partial search on name, email, and comment.
  - All filters, sort, and pagination state persist via localStorage.
  - Responsive and mobile-friendly.
  - Styled with Material-UI and `react-icons` for a modern look.

---

## Getting Started

### 1. **Clone the repository**

```bash
git clone <your-repo-url>
cd swift-dashboard
```

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Start the development server**

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Tech Stack

- **React** (plain JavaScript)
- **Material-UI** (MUI) for UI components and layout
- **react-icons** for icons
- **React Router** for routing

---

## API Endpoints Used

- **Users:** https://jsonplaceholder.typicode.com/users
- **Comments:** https://jsonplaceholder.typicode.com/comments

---

## Assignment Requirements Coverage

- [x] Custom pagination, sorting, and search (no library logic)
- [x] Responsive and mobile-friendly
- [x] Persistent filters, sort, and pagination (localStorage)
- [x] Profile and dashboard screens with navigation
- [x] UI matches provided wireframes
- [x] Cross-browser compatible (Edge, Firefox, Chrome)
