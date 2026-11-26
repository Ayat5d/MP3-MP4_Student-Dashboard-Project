// storage.js - Local Storage helpers (bookmarks persist after refresh)

const BOOKMARK_KEY = "studentDashboard.bookmarks";

// Read the saved list of bookmarked student ids (empty array if none/invalid)
function loadBookmarks() {
  try {
    const saved = JSON.parse(localStorage.getItem(BOOKMARK_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (err) {
    return [];
  }
}

// Write the current bookmarks to localStorage
function saveBookmarks() {
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(state.bookmarks));
}

function isBookmarked(id) {
  return state.bookmarks.includes(id);
}

// Add the id if missing, remove it if present, then save
function toggleBookmark(id) {
  if (isBookmarked(id)) {
    state.bookmarks = state.bookmarks.filter((b) => b !== id);
  } else {
    state.bookmarks.push(id);
  }
  saveBookmarks();
}
