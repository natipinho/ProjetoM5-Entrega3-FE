const BASE_URL = "http://localhost:3000";
// GET /users
export async function getUsers() {
    try {
        const res = await fetch(`${BASE_URL}/users`);
        if (!res.ok)
            throw new Error("Error fetching users");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// GET /users?sort=asc|desc
export async function getUsersSorted(sort) {
    try {
        const res = await fetch(`${BASE_URL}/users?sort=${sort}`);
        if (!res.ok)
            throw new Error("Error sorting users");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// GET /users?search=nome
export async function searchUsers(search) {
    try {
        const res = await fetch(`${BASE_URL}/users?search=${search}`);
        if (!res.ok)
            throw new Error("Error searching users");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// GET /users/stats
export async function getUserStats() {
    try {
        const res = await fetch(`${BASE_URL}/users/stats`);
        if (!res.ok)
            throw new Error("Error fetching user stats");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// GET /users/:id/tasks
export async function getUserTasks(id) {
    try {
        const res = await fetch(`${BASE_URL}/users/${id}/tasks`);
        if (!res.ok)
            throw new Error("Error fetching user's tasks");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// POST /users
export async function createUser(user) {
    try {
        const res = await fetch(`${BASE_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        if (!res.ok)
            throw new Error("Error creating user");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// PUT /users/:id
export async function updateUser(id, user) {
    try {
        const res = await fetch(`${BASE_URL}/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        if (!res.ok)
            throw new Error("Error updating user");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// PATCH /users/:id
export async function patchUser(id, user) {
    try {
        const res = await fetch(`${BASE_URL}/users/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        if (!res.ok)
            throw new Error("Error patching user");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
// DELETE /users/:id
export async function deleteUser(id) {
    try {
        const res = await fetch(`${BASE_URL}/users/${id}`, {
            method: "DELETE",
        });
        if (!res.ok)
            throw new Error("Error deleting user");
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
