# M5 - Project 3: Frontend & Backend Integration

This project focuses on integrating a Frontend with a REST API using the `fetch` API.

---

## Student Info

| Field | Details |
|---|---|
| **Name** | Natália Carvalho de Pinho Joaquim |
| **Student Number** | 219 |
| **Repository** | [natipinho/Projeto-M5-Entrega-3](https://github.com/natipinho/ProjetoM5-Entrega3-FE) |

---


## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML / TypeScript |
| **Communication** | Fetch API (Native) |
| **Backend** | Node.js + Express (Local API) |

---

## Project Structure

The architecture separates network concerns into a dedicated `api/` folder:

```
src/
├── api/
│   ├── apiTaskService.ts   # Task-related HTTP calls
│   ├── apiUserService.ts   # User-related HTTP calls
│   └── apiTagService.ts    # Tag-related HTTP calls
└── models/
    ├── task.ts             # Type/Interface definitions
    ├── user.ts
    └── tag.ts
```

---

## Implemented Endpoints

### 👤 Users — `apiUserService.ts`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/users` | List, sort, and search |
| `POST` | `/users` | Create a user |
| `PUT` / `PATCH` | `/users/:id` | Update a user |
| `DELETE` | `/users/:id` | Delete a user |
| `GET` | `/users/stats` | User statistics |

### 📋 Tasks — `apiTaskService.ts`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/tasks` | List, sort, and search |
| `POST` | `/tasks` | Create a task |
| `PUT` | `/tasks/:id` | Update a task |
| `DELETE` | `/tasks/:id` | Delete a task |
| `GET` | `/tasks/stats` | Task statistics |
| `GET` | `/users/:id/tasks` | Tasks by user |

### 🏷️ Tags — `apiTagService.ts`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/tags` | List all tags |
| `POST` | `/tags` | Create a tag |
| `DELETE` | `/tags/:id` | Delete a tag |
| `GET` | `/tags/:id/tasks` | Tasks by tag |
| `POST` | `/tasks/:id/tags` | Associate tag to task |

---

## Prerequisites

- Node.js 18+
- The Backend API running on `http://localhost:3000`


