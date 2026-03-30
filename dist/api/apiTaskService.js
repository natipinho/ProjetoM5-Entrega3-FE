const BASE_URL = "http://localhost:3000";
// GET /tasks
export async function getTasks() {
    try {
        const res = await fetch(`${BASE_URL}/tasks`);
        if (!res.ok)
            throw new Error("Error fetching tasks");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// GET /tasks?sort=asc|desc
export async function getTasksSorted(sort) {
    try {
        const res = await fetch(`${BASE_URL}/tasks?sort=${sort}`);
        if (!res.ok)
            throw new Error("Error sorting tasks");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// GET /tasks?search=titulo
export async function searchTasks(search) {
    try {
        const res = await fetch(`${BASE_URL}/tasks?search=${search}`);
        if (!res.ok)
            throw new Error("Error searching tasks");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// GET /tasks/stats
export async function getTaskStats() {
    try {
        const res = await fetch(`${BASE_URL}/tasks/stats`);
        if (!res.ok)
            throw new Error("Error fetching task stats");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// POST /tasks
export async function createTask(task) {
    try {
        const res = await fetch(`${BASE_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        if (!res.ok)
            throw new Error("Error creating task");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// PUT /tasks/:id
export async function updateTask(id, task) {
    try {
        const res = await fetch(`${BASE_URL}/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        if (!res.ok)
            throw new Error("Error updating task");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// PATCH /tasks/:id
export async function patchTask(id, data) {
    try {
        const res = await fetch(`${BASE_URL}/tasks/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok)
            throw new Error("Error patching task");
        const result = await res.json();
        return result;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// DELETE /tasks/:id
export async function deleteTask(id) {
    try {
        const res = await fetch(`${BASE_URL}/tasks/${id}`, {
            method: "DELETE",
        });
        if (!res.ok)
            throw new Error("Error deleting task");
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// GET /tasks/:id/comments
export async function getComments(taskId) {
    try {
        const res = await fetch(`${BASE_URL}/tasks/${taskId}/comments`);
        if (!res.ok)
            throw new Error("Error fetching comments");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// GET /tasks/:id/comments?sort=newest|oldest
export async function getCommentsSorted(taskId, sort) {
    try {
        const res = await fetch(`${BASE_URL}/tasks/${taskId}/comments?sort=${sort}`);
        if (!res.ok)
            throw new Error("Error sorting comments");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// POST /tasks/:id/comments
export async function createComment(taskId, userId, content) {
    try {
        const res = await fetch(`${BASE_URL}/tasks/${taskId}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, content }),
        });
        if (!res.ok)
            throw new Error("Error creating comment");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// PUT /tasks/:id/comments/:commentId
export async function updateComment(taskId, commentId, data) {
    try {
        const res = await fetch(`${BASE_URL}/tasks/${taskId}/comments/${commentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok)
            throw new Error("Error updating comment");
        const result = await res.json();
        return result;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// DELETE /tasks/:id/comments/:commentId
export async function deleteComment(taskId, commentId) {
    try {
        const res = await fetch(`${BASE_URL}/tasks/${taskId}/comments/${commentId}`, {
            method: "DELETE",
        });
        if (!res.ok)
            throw new Error("Error deleting comment");
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
