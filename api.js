// api.js - Task 1: API Client with GET
const API_URL = "https://jsonplaceholder.typicode.com/posts";

const loadBtn = document.getElementById("load-btn");
const statusEl = document.getElementById("status");
const notesList = document.getElementById("notes-list");

/**
 * Reusable async function to handle fetch requests, validate status, and parse JSON.
 */
async function request(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

/**
 * Loads up to 10 notes from the server using GET.
 */
async function loadNotes() {
  loadBtn.disabled = true;
  statusEl.textContent = "Loading notes...";
  notesList.innerHTML = "";

  try {
    const notes = await request(`${API_URL}?_limit=10`);

    if (notes.length === 0) {
      statusEl.textContent = "No notes available.";
      const li = document.createElement("li");
      li.textContent = "There are no notes to display.";
      notesList.appendChild(li);
      return;
    }

    statusEl.textContent = `Loaded ${notes.length} notes from the server.`;

    notes.forEach(note => {
      const li = document.createElement("li");
      li.className = "note-item";

      const titleHeading = document.createElement("h3");
      titleHeading.textContent = note.title;

      const bodyP = document.createElement("p");
      bodyP.textContent = note.body;

      li.appendChild(titleHeading);
      li.appendChild(bodyP);
      notesList.appendChild(li);
    });

  } catch (error) {
    statusEl.textContent = `Error: Could not load notes. (${error.message})`;
  } finally {
    loadBtn.disabled = false;
  }
}

// Event Listener
loadBtn.addEventListener("click", loadNotes);