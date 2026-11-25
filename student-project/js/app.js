// app.js - entry point: loads data and wires up all event listeners

const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const bookmarkToggle = document.querySelector("#bookmark-toggle");
const closeDialogBtn = document.querySelector("#close-dialog");

// Load students from the API, handling loading and error states
async function loadStudents() {
  showLoading();
  try {
    state.students = await fetchStudentsFromApi();
    populateDepartments();
    clearStatus();
    render();
  } catch (err) {
    showError(`Could not load students. ${err.message}`, loadStudents);
  }
}

// ----- Event listeners -----
searchInput.addEventListener("input", (e) => {
  state.query = e.target.value;
  render();
});

departmentSelect.addEventListener("change", (e) => {
  state.department = e.target.value;
  render();
});

sortSelect.addEventListener("change", (e) => {
  state.sort = e.target.value;
  render();
});

bookmarkToggle.addEventListener("click", () => {
  state.bookmarkedOnly = !state.bookmarkedOnly;
  bookmarkToggle.setAttribute("aria-pressed", state.bookmarkedOnly);
  render();
});

// Event delegation: one listener handles clicks on every card
grid.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const id = Number(card.dataset.id);

  if (e.target.closest("[data-action='bookmark']")) {
    toggleBookmark(id);
    render();
  } else {
    openDetails(id);
  }
});

closeDialogBtn.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close(); // click on the backdrop closes it
});

// ----- Start the app -----
loadStudents();
