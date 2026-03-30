import { Task } from "../models/Task.js";
import { User } from "../models/User.js";

const BASE_URL = "http://localhost:3000";

// GET /users
export async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) throw new Error("Error fetching users");
    const data: User[] = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// GET /users?sort=asc|desc
export async function getUsersSorted(sort: "asc" | "desc"): Promise<User[]> {
  try {
    const res = await fetch(`${BASE_URL}/users?sort=${sort}`);
    if (!res.ok) throw new Error("Error sorting users");
    const data: User[] = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// GET /users?search=nome
export async function searchUsers(search: string): Promise<User[]> {
  try {
    const res = await fetch(`${BASE_URL}/users?search=${search}`);
    if (!res.ok) throw new Error("Error searching users");
    const data: User[] = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// GET /users/stats
export async function getUserStats(): Promise<{ total: number; active: number; inactive: number; active_percent: number }> {
  try {
    const res = await fetch(`${BASE_URL}/users/stats`);
    if (!res.ok) throw new Error("Error fetching user stats");
    const data: { total: number; active: number; inactive: number; active_percent: number } = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// GET /users/:id/tasks
export async function getUserTasks(id: number): Promise<Task[]> {
  try {
    const res = await fetch(`${BASE_URL}/users/${id}/tasks`);
    if (!res.ok) throw new Error("Error fetching user's tasks");
    const data: Task[] = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// POST /users
export async function createUser(user: Omit<User, "id">): Promise<User> {
  try {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error("Error creating user");
    const data: User = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// PUT /users/:id
export async function updateUser(id: number, user: User): Promise<User> {
  try {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error("Error updating user");
    const data: User = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// PATCH /users/:id
export async function patchUser(id: number, user: Partial<User>): Promise<User> {
  try {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error("Error patching user");
    const data: User = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// DELETE /users/:id
export async function deleteUser(id: number): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error deleting user");
  } catch (err) {
    console.error(err);
    throw err;
  }
}