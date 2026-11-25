// ui.js - everything that touches the DOM (rendering, status messages, dialog)

// ----- DOM references -----
const grid = document.querySelector("#student-grid");
const statusBox = document.querySelector("#status");
const departmentSelect = document.querySelector("#department-select");
const dialog = document.querySelector("#details-dialog");
const dialogContent = document.querySelector("#details-content");
const statTotal = document.querySelector("#stat-total");
const statShown = document.querySelector("#stat-shown");
const statAge = document.querySelector("#stat-age");
const statBookmarks = document.querySelector("#stat-bookmarks");

// ----- Loading / error / empty states -----
function showLoading() {
  grid.innerHTML = "";
  statusBox.className = "status";
  statusBox.innerHTML = '<div class="spinner"></div><p>Loading students...</p>';
}

function showError(message, onRetry) {
  grid.innerHTML = "";
  statusBox.className = "status error";
  statusBox.innerHTML = `<p>⚠️ ${message}</p><button type="button" id="retry-btn">Try again</button>`;
  document.querySelector("#retry-btn").addEventListener("click", onRetry);
}

function showEmpty(message) {
  statusBox.className = "status";
  statusBox.innerHTML = `<p>${message}</p>`;
}

function clearStatus() {
  statusBox.className = "status";
  statusBox.innerHTML = "";
}

// ----- Rendering -----
function populateDepartments() {
  departmentSelect.innerHTML =
    '<option value="all">All departments</option>';

  getDepartments().forEach((dept) => {
    const option = document.createElement("option");
    option.value = dept;
    option.textContent = dept;
    departmentSelect.appendChild(option);
  });
}

function createCard(student) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = student.id;

  card.innerHTML = `
    <button class="bookmark-btn ${isBookmarked(student.id) ? "active" : ""}" type="button"
      aria-label="Toggle bookmark" data-action="bookmark">${isBookmarked(student.id) ? "★" : "☆"}</button>
    <img src="${student.image}" alt="${student.name}" loading="lazy" />
    <h3>${student.name}</h3>
    <div class="dept">${student.department}</div>
    <div class="uni">${student.university}</div>
    <div class="meta">Age ${student.age} · ${student.city}</div>
  `;
  return card;
}

function updateStats(visible) {
  statTotal.textContent = state.students.length;
  statShown.textContent = visible.length;
  statBookmarks.textContent = state.bookmarks.length;

  if (visible.length === 0) {
    statAge.textContent = "–";
  } else {
    const totalAge = visible.reduce((sum, s) => sum + s.age, 0);
    statAge.textContent = (totalAge / visible.length).toFixed(1);
  }
}

function render() {
  const list = getVisibleStudents();
  grid.innerHTML = "";
  updateStats(list);

  if (list.length === 0) {
    showEmpty(
      state.bookmarkedOnly && state.bookmarks.length === 0
        ? "You haven't bookmarked any students yet."
        : "No students match your search."
    );
    return;
  }

  clearStatus();
  const fragment = document.createDocumentFragment();
  list.forEach((student) => fragment.appendChild(createCard(student)));
  grid.appendChild(fragment);
}

// ----- Details dialog -----
function openDetails(id) {
  const s = state.students.find((student) => student.id === id);
  if (!s) return;

  dialogContent.innerHTML = `
    <div class="detail-head">
      <img src="${s.image}" alt="${s.name}" />
      <h2>${s.name}</h2>
      <p class="dept">${s.department}</p>
    </div>
    <dl>
      <dt>Student ID</dt><dd>${s.id}</dd>
      <dt>Age</dt><dd>${s.age}</dd>
      <dt>Gender</dt><dd>${s.gender}</dd>
      <dt>University</dt><dd>${s.university}</dd>
      <dt>Email</dt><dd>${s.email}</dd>
      <dt>Phone</dt><dd>${s.phone}</dd>
      <dt>Location</dt><dd>${s.city}, ${s.country}</dd>
    </dl>
  `;
  dialog.showModal();
}
