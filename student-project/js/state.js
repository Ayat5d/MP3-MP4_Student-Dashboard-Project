// state.js - application state and data logic (search, filter, sort)

const state = {
  students: [],
  bookmarks: loadBookmarks(), // array of student ids
  query: "",
  department: "all",
  sort: "name-asc",
  bookmarkedOnly: false,
};

// Returns the students that match the current search, filter and sort settings
function getVisibleStudents() {
  const query = state.query.trim().toLowerCase();

  const list = state.students.filter((s) => {
    const matchesQuery =
      s.name.toLowerCase().includes(query) ||
      s.email.toLowerCase().includes(query) ||
      s.university.toLowerCase().includes(query);
    const matchesDept = state.department === "all" || s.department === state.department;
    const matchesBookmark = !state.bookmarkedOnly || isBookmarked(s.id);
    return matchesQuery && matchesDept && matchesBookmark;
  });

  switch (state.sort) {
    case "name-asc": list.sort((a, b) => a.name.localeCompare(b.name)); break;
    case "name-desc": list.sort((a, b) => b.name.localeCompare(a.name)); break;
    case "age-asc": list.sort((a, b) => a.age - b.age); break;
    case "age-desc": list.sort((a, b) => b.age - a.age); break;
  }
  return list;
}

// Unique, sorted department names (used for the filter dropdown)
function getDepartments() {
  return [...new Set(state.students.map((s) => s.department))].sort();
}
