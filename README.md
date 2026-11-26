# Student Information Dashboard

**Course:** Software Development I (CSE-2340) | **Assessment:** Mini Project 3-4 (MP3-MP4)
**Stack:** HTML, CSS, JavaScript (no frameworks) | **API:** [DummyJSON Users](https://dummyjson.com/users)

An interactive, API-driven dashboard that loads student records from an external API, displays them dynamically, supports searching, filtering and sorting, and remembers bookmarked students using Local Storage.

## Features
- Loads 100 student records with `fetch()` and `async/await`
- Live search by name, email or university
- Department filter and sorting (name / age)
- Summary statistics: total, shown, average age, bookmarked
- Click a card to open a details dialog
- Bookmark students with the star button; bookmarks survive a page refresh
- "Bookmarked only" view
- Loading, error (with retry) and empty states
- Responsive layout

## Project structure
```
student-project/
├── index.html        Page structure
├── css/
│   └── style.css     All styling
├── js/
│   ├── storage.js    Local Storage helpers (bookmarks)
│   ├── state.js      App state + search/filter/sort logic
│   ├── api.js        fetch() + async/await API call
│   ├── ui.js         DOM rendering, status messages, dialog
│   └── app.js        Entry point, event listeners
└── README.md
```

## Requirement mapping
| Requirement | Marks | Where |
|---|---|---|
| DOM manipulation and dynamic rendering | 4 (MP3) | `ui.js`: `render()`, `createCard()`, `openDetails()`, `updateStats()` |
| Event handling and JavaScript logic | 3 (MP3) | `app.js` (`addEventListener`), `state.js` (`filter`, `sort`, `map`, `find`), `ui.js` (`forEach`, `reduce`) |
| API integration and asynchronous operations | 4 (MP4) | `api.js`: `fetchStudentsFromApi()`; `app.js`: `loadStudents()`; `ui.js`: `showLoading()`, `showError()`, `showEmpty()` |
| Local Storage | 3 (MP4) | `storage.js`: `loadBookmarks()`, `saveBookmarks()`, `toggleBookmark()` |

## How to run
1. Extract the ZIP and keep the folder structure unchanged.
2. Open the `student-dashboard-project` folder in VS Code and install/enable the **Live Server** extension if needed.
3. Click **Go Live** in the VS Code status bar. The workspace setting serves the `student-project` folder, where `index.html` is located.
4. An internet connection is required to load data from the API.

Alternatively, start a local server from the `student-project` folder:
   ```bash
   npx http-server -p 5501
   ```
Then open `http://localhost:5501/index.html` in a modern browser (Chrome, Edge, Firefox).

## How to test
- **Search/filter:** type in the search box, pick a department, change the sort order.
- **Local Storage:** bookmark a few students, refresh the page, and they remain bookmarked.
- **Error state:** disconnect from the internet and refresh; an error message with a retry button appears.
- **Empty state:** search for a nonsense word to see the "No students match" message.
