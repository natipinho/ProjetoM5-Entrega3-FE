const BASE_URL = "http://localhost:3000";
// GET /tags
export async function getTags() {
    try {
        const res = await fetch(`${BASE_URL}/tags`);
        if (!res.ok)
            throw new Error("Error fetching tags");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// GET /tags/:id/tasks
export async function getTasksOfTag(id) {
    try {
        const res = await fetch(`${BASE_URL}/tags/${id}/tasks`);
        if (!res.ok)
            throw new Error("Error fetching tag's tasks");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// POST /tags
export async function createTag(tag) {
    try {
        const res = await fetch(`${BASE_URL}/tags`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tag),
        });
        if (!res.ok)
            throw new Error("Error creating tag");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// DELETE /tags/:id
export async function deleteTag(id) {
    try {
        const res = await fetch(`${BASE_URL}/tags/${id}`, {
            method: "DELETE",
        });
        if (!res.ok)
            throw new Error("Error deleting tag");
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// POST /tasks/:id/tags
export async function addTagToTask(taskId, tagId) {
    try {
        const res = await fetch(`${BASE_URL}/tasks/${taskId}/tags`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tagId }),
        });
        if (!res.ok)
            throw new Error("Error associating tag to task");
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
