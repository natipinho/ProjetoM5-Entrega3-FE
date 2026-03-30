import { getTasks, getTaskStats, createTask, updateTask, patchTask, deleteTask, searchTasks, getTasksSorted, } from "./api/apiTaskService.js";
import { getUsers, getUserStats, createUser, patchUser, deleteUser, searchUsers, getUsersSorted, } from "./api/apiUserService.js";
import { getTags, createTag, deleteTag } from "./api/apiTagService.js";
// ============================================================
// ESTADO LOCAL
// ============================================================
let tasks = [];
let users = [];
// ============================================================
// LOAD FUNCTIONS
// ============================================================
async function loadTasks() {
    try {
        tasks = await getTasks();
        renderTasks();
        renderTaskStats();
    }
    catch (err) {
        console.error("Error loading tasks:", err);
    }
}
async function loadUsers() {
    try {
        users = await getUsers();
        renderUsers();
        renderUserStats();
    }
    catch (err) {
        console.error("Error loading users:", err);
    }
}
async function loadTags() {
    try {
        await renderTags();
    }
    catch (err) {
        console.error("Error loading tags:", err);
    }
}
// ============================================================
// RENDER TASKS
// ============================================================
function renderTasks() {
    const list = document.getElementById("task-list");
    list.innerHTML = tasks
        .map((t) => `
    <li class="task-item">
      <input type="checkbox" class="task-checkbox" ${t.done ? "checked" : ""} data-id="${t.id}">
      <span class="task-title ${t.done ? "completed" : ""}">${t.title}</span>
      <span class="category-tag">${t.category ?? ""}</span>
      <div class="task-controls">
        <button class="btn-edit" data-id="${t.id}" data-title="${t.title}" data-category="${t.category ?? ""}" data-done="${t.done}">✏️</button>
        <button class="removeBtn" data-id="${t.id}">🗑️</button>
      </div>
    </li>
  `)
        .join("");
}
function renderTaskStats() {
    getTaskStats()
        .then((stats) => {
        const container = document.getElementById("task-stats");
        container.innerHTML = `
      <div class="stat-card">
        <i class="fa-solid fa-list-check"></i>
        <span class="stat-value">${stats.total}</span>
        <span class="stat-label">Total</span>
      </div>
      <div class="stat-card stat-success">
        <i class="fa-solid fa-check"></i>
        <span class="stat-value">${stats.done}</span>
        <span class="stat-label">Done</span>
      </div>
      <div class="stat-card stat-warning">
        <i class="fa-solid fa-clock"></i>
        <span class="stat-value">${stats.pending}</span>
        <span class="stat-label">Pending</span>
      </div>
    `;
    })
        .catch((err) => console.error("Error rendering task stats:", err));
}
// ============================================================
// RENDER USERS
// ============================================================
function renderUsers() {
    const container = document.getElementById("user-container");
    container.innerHTML = users
        .map((u) => `
    <div class="user-card">
      <div class="user-card-header">
        <h3>${u.name}</h3>
        <span class="status-badge ${u.active ? "active" : "inactive"}">${u.active ? "Active" : "Inactive"}</span>
      </div>
      <div class="user-card-body">
        <p class="user-email">📧 ${u.email}</p>
      </div>
      <div class="user-card-actions">
        <button class="btn-edit" data-id="${u.id}" data-name="${u.name}" data-email="${u.email}" data-active="${u.active}">✏️ Edit</button>
        <button class="removeBtn" data-id="${u.id}">🗑️ Delete</button>
      </div>
    </div>
  `)
        .join("");
}
function renderUserStats() {
    getUserStats()
        .then((stats) => {
        const container = document.getElementById("user-stats");
        container.innerHTML = `
      <div class="stat-card">
        <i class="fa-solid fa-users"></i>
        <span class="stat-value">${stats.total}</span>
        <span class="stat-label">Total</span>
      </div>
      <div class="stat-card stat-success">
        <i class="fa-solid fa-user-check"></i>
        <span class="stat-value">${stats.active}</span>
        <span class="stat-label">Active</span>
      </div>
      <div class="stat-card stat-danger">
        <i class="fa-solid fa-user-xmark"></i>
        <span class="stat-value">${stats.inactive}</span>
        <span class="stat-label">Inactive</span>
      </div>
      <div class="stat-card stat-info">
        <i class="fa-solid fa-percent"></i>
        <span class="stat-value">${stats.active_percent}%</span>
        <span class="stat-label">Active %</span>
      </div>
    `;
    })
        .catch((err) => console.error("Error rendering user stats:", err));
}
// ============================================================
// RENDER TAGS
// ============================================================
async function renderTags() {
    const tags = await getTags();
    const list = document.getElementById("tag-list");
    list.innerHTML = tags
        .map((tag) => `
    <li class="task-item">
      <span class="task-title">🏷️ ${tag.name}</span>
      <button class="removeBtn" data-id="${tag.id}">🗑️</button>
    </li>
  `)
        .join("");
}
// ============================================================
// HANDLERS — TASKS
// ============================================================
async function handleAddTask() {
    const titleInput = document.getElementById("task-title-input");
    const categoryInput = document.getElementById("task-category-input");
    const title = titleInput.value.trim();
    const category = categoryInput.value.trim();
    if (!title || title.length < 5) {
        alert("Title must be longer than 5 characters.");
        return;
    }
    try {
        await createTask({
            title,
            category,
            done: false,
            user_id: null,
            conclusion_date: null,
        });
        titleInput.value = "";
        categoryInput.value = "";
        await loadTasks();
    }
    catch (err) {
        console.error("Error adding task:", err);
        alert("Error adding task. Please try again.");
    }
}
async function handleDeleteTask(id) {
    try {
        await deleteTask(id);
        await loadTasks();
    }
    catch (err) {
        console.error("Error deleting task:", err);
        alert("Error deleting task. Please try again.");
    }
}
async function handleSaveEditTask() {
    const id = parseInt(document.getElementById("edit-task-id").value);
    const title = document.getElementById("edit-task-title").value.trim();
    const category = document.getElementById("edit-task-category").value.trim();
    const done = document.getElementById("edit-task-done")
        .checked;
    try {
        await updateTask(id, { title, category, done });
        closeModal("modal-edit-task");
        await loadTasks();
    }
    catch (err) {
        console.error("Error updating task:", err);
        alert("Error updating task. Please try again.");
    }
}
// ============================================================
// HANDLERS — USERS
// ============================================================
async function handleAddUser() {
    const nameInput = document.getElementById("user-name-input");
    const emailInput = document.getElementById("user-email-input");
    const warning = document.getElementById("user-warning");
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if (!name || !email) {
        warning.innerHTML = `<div class="warning">Name and email are required.</div>`;
        return;
    }
    if (!email.includes("@")) {
        warning.innerHTML = `<div class="warning">Invalid email.</div>`;
        return;
    }
    try {
        warning.innerHTML = "";
        await createUser({ name, email, active: true });
        nameInput.value = "";
        emailInput.value = "";
        await loadUsers();
    }
    catch (err) {
        console.error("Error adding user:", err);
        alert("Error adding user. Please try again.");
    }
}
async function handleDeleteUser(id) {
    try {
        await deleteUser(id);
        await loadUsers();
    }
    catch (err) {
        console.error("Error deleting user:", err);
        alert("Error deleting user. Please try again.");
    }
}
async function handleSaveEditUser() {
    const id = parseInt(document.getElementById("edit-user-id").value);
    const name = document.getElementById("edit-user-name").value.trim();
    const email = document.getElementById("edit-user-email").value.trim();
    const active = document.getElementById("edit-user-active").checked;
    try {
        await patchUser(id, { name, email, active });
        closeModal("modal-edit-user");
        await loadUsers();
    }
    catch (err) {
        console.error("Error updating user:", err);
        alert("Error updating user. Please try again.");
    }
}
// ============================================================
// HANDLERS — TAGS
// ============================================================
async function handleAddTag() {
    const input = document.getElementById("tag-name-input");
    const name = input.value.trim();
    if (!name || name.length < 3) {
        alert("Tag name must be longer than 3 characters.");
        return;
    }
    try {
        await createTag({ name });
        input.value = "";
        await loadTags();
    }
    catch (err) {
        console.error("Error adding tag:", err);
        alert("Error adding tag. Please try again.");
    }
}
async function handleDeleteTag(id) {
    try {
        await deleteTag(id);
        await loadTags();
    }
    catch (err) {
        console.error("Error deleting tag:", err);
        alert("Error deleting tag. Please try again.");
    }
}
// ============================================================
// MODAIS
// ============================================================
function openEditTask(id, title, category, done) {
    document.getElementById("edit-task-id").value =
        String(id);
    document.getElementById("edit-task-title").value =
        title;
    document.getElementById("edit-task-category").value =
        category;
    document.getElementById("edit-task-done").checked =
        done;
    openModal("modal-edit-task");
}
function openEditUser(id, name, email, active) {
    document.getElementById("edit-user-id").value =
        String(id);
    document.getElementById("edit-user-name").value = name;
    document.getElementById("edit-user-email").value =
        email;
    document.getElementById("edit-user-active").checked =
        active;
    openModal("modal-edit-user");
}
function openModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = "flex";
}
function closeModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = "none";
}
// ============================================================
// SEARCH & SORT
// ============================================================
async function handleSearchTasks() {
    try {
        const search = document.getElementById("task-search-input").value.trim();
        tasks = search ? await searchTasks(search) : await getTasks();
        renderTasks();
    }
    catch (err) {
        console.error("Error searching tasks:", err);
    }
}
async function handleSearchUsers() {
    try {
        const search = document.getElementById("user-search-input").value.trim();
        users = search ? await searchUsers(search) : await getUsers();
        renderUsers();
    }
    catch (err) {
        console.error("Error searching users:", err);
    }
}
// ============================================================
// EVENT LISTENERS
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    // Tasks
    document
        .getElementById("add-task-btn")
        .addEventListener("click", handleAddTask);
    document
        .getElementById("save-edit-task-btn")
        .addEventListener("click", handleSaveEditTask);
    document
        .getElementById("close-edit-task-modal")
        .addEventListener("click", () => closeModal("modal-edit-task"));
    document
        .getElementById("task-search-input")
        .addEventListener("input", handleSearchTasks);
    document
        .getElementById("sort-task-asc-btn")
        .addEventListener("click", async () => {
        try {
            tasks = await getTasksSorted("asc");
            renderTasks();
        }
        catch (err) {
            console.error("Error sorting tasks:", err);
        }
    });
    document
        .getElementById("sort-task-desc-btn")
        .addEventListener("click", async () => {
        try {
            tasks = await getTasksSorted("desc");
            renderTasks();
        }
        catch (err) {
            console.error("Error sorting tasks:", err);
        }
    });
    // Events — task list
    document.getElementById("task-list").addEventListener("click", async (e) => {
        const target = e.target;
        const id = parseInt(target.dataset.id ?? "0");
        if (target.classList.contains("removeBtn")) {
            await handleDeleteTask(id);
        }
        if (target.classList.contains("btn-edit")) {
            const title = target.dataset.title ?? "";
            const category = target.dataset.category ?? "";
            const done = target.dataset.done === "true";
            openEditTask(id, title, category, done);
        }
        if (target.classList.contains("task-checkbox")) {
            console.log("checkbox clicada!", target.dataset.id, target.checked);
            const done = target.checked;
            try {
                await patchTask(id, { done });
                await loadTasks();
            }
            catch (err) {
                console.error("Error updating task status:", err);
            }
        }
    });
    // Users
    document
        .getElementById("add-user-btn")
        .addEventListener("click", handleAddUser);
    document
        .getElementById("save-edit-user-btn")
        .addEventListener("click", handleSaveEditUser);
    document
        .getElementById("close-edit-user-modal")
        .addEventListener("click", () => closeModal("modal-edit-user"));
    document
        .getElementById("user-search-input")
        .addEventListener("input", handleSearchUsers);
    document
        .getElementById("sort-user-asc-btn")
        .addEventListener("click", async () => {
        try {
            users = await getUsersSorted("asc");
            renderUsers();
        }
        catch (err) {
            console.error("Error sorting users:", err);
        }
    });
    document
        .getElementById("sort-user-desc-btn")
        .addEventListener("click", async () => {
        try {
            users = await getUsersSorted("desc");
            renderUsers();
        }
        catch (err) {
            console.error("Error sorting users:", err);
        }
    });
    // Events — user container
    document
        .getElementById("user-container")
        .addEventListener("click", async (e) => {
        const target = e.target;
        const id = parseInt(target.dataset.id ?? "0");
        if (target.classList.contains("removeBtn")) {
            await handleDeleteUser(id);
        }
        if (target.classList.contains("btn-edit")) {
            const name = target.dataset.name ?? "";
            const email = target.dataset.email ?? "";
            const active = target.dataset.active === "true";
            openEditUser(id, name, email, active);
        }
    });
    // Tags
    document
        .getElementById("add-tag-btn")
        .addEventListener("click", handleAddTag);
    // Delegação de eventos — tag list
    document.getElementById("tag-list").addEventListener("click", async (e) => {
        const target = e.target;
        const id = parseInt(target.dataset.id ?? "0");
        if (target.classList.contains("removeBtn")) {
            await handleDeleteTag(id);
        }
    });
    // Initial Data
    loadTasks();
    loadUsers();
    loadTags();
});
