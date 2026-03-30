import { Tag } from "../models/Tag.js";
import { Task } from "../models/Task.js";

const BASE_URL = "http://localhost:3000";

// GET /tags
export async function getTags(): Promise<Tag[]> {
  try {
    const res = await fetch(`${BASE_URL}/tags`);
    if (!res.ok) throw new Error("Error fetching tags");
    const data: Tag[] = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// GET /tags/:id/tasks
export async function getTasksOfTag(id: number): Promise<Task[]> {
  try {
    const res = await fetch(`${BASE_URL}/tags/${id}/tasks`);
    if (!res.ok) throw new Error("Error fetching tag's tasks");
    const data: Task[] = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// POST /tags
export async function createTag(tag: Omit<Tag, "id">): Promise<Tag> {
  try {
    const res = await fetch(`${BASE_URL}/tags`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tag),
    });
    if (!res.ok) throw new Error("Error creating tag");
    const data: Tag = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// DELETE /tags/:id
export async function deleteTag(id: number): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/tags/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error deleting tag");
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// POST /tasks/:id/tags
export async function addTagToTask(taskId: number, tagId: number): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${taskId}/tags`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tagId }),
    });
    if (!res.ok) throw new Error("Error associating tag to task");
  } catch (err) {
    console.error(err);
    throw err;
  }
}