import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../app.js";
import { Task } from "../models/Task.model.js";

describe("Tasks API", () => {
  beforeEach(async () => {
    await Task.destroy({ where: {}, truncate: true, cascade: true });
  });

  it("creates a new task", async () => {
    const res = await request(app)
      .post("/tasks/createTask")
      .send({ title: "Buy milk", priority: 5 });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Buy milk");
    expect(res.body.priority).toBe(5);
    expect(res.body.isDone).toBe(false);
  });

  it("rejects creating a task without a title", async () => {
    const res = await request(app).post("/tasks/createTask").send({ priority: 3 });
    expect(res.status).toBe(401);
  });

  it("returns all tasks", async () => {
    await Task.bulkCreate([
      { title: "Task A", priority: 2 },
      { title: "Task B", priority: 8 },
    ]);

    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it("filters tasks by status", async () => {
    await Task.bulkCreate([
      { title: "Done task", priority: 1, isDone: true },
      { title: "Undone task", priority: 1, isDone: false },
    ]);

    const res = await request(app).get("/tasks?status=done");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe("Done task");
  });

  it("searches tasks by title", async () => {
    await Task.bulkCreate([
      { title: "Buy milk", priority: 1 },
      { title: "Walk the dog", priority: 1 },
    ]);

    const res = await request(app).get("/tasks?search=milk");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe("Buy milk");
  });

  it("sorts tasks by priority ascending and descending", async () => {
    await Task.bulkCreate([
      { title: "Low", priority: 2 },
      { title: "High", priority: 9 },
    ]);

    const asc = await request(app).get("/tasks?sortOrder=asc");
    expect(asc.body[0].priority).toBe(2);

    const desc = await request(app).get("/tasks?sortOrder=desc");
    expect(desc.body[0].priority).toBe(9);
  });

  it("toggles a single task's done status", async () => {
    const task = await Task.create({ title: "Toggle me", priority: 4 });

    const res = await request(app).put(`/tasks/${task.id}/toggle`);
    expect(res.status).toBe(200);
    expect(res.body.isDone).toBe(true);
  });

  it("updates a task's title and priority", async () => {
    const task = await Task.create({ title: "Old title", priority: 3 });

    const res = await request(app)
      .put(`/tasks/${task.id}`)
      .send({ title: "New title", priority: 7 });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("New title");
    expect(res.body.priority).toBe(7);
  });

  it("toggles all tasks to done, then back to undone", async () => {
    await Task.bulkCreate([
      { title: "A", priority: 1, isDone: false },
      { title: "B", priority: 1, isDone: false },
    ]);

    await request(app).put("/tasks/toggleAll");
    let tasks = await Task.findAll();
    expect(tasks.every((t) => t.isDone)).toBe(true);

    await request(app).put("/tasks/toggleAll");
    tasks = await Task.findAll();
    expect(tasks.every((t) => !t.isDone)).toBe(true);
  });

  it("deletes a single task", async () => {
    const task = await Task.create({ title: "Delete me", priority: 1 });

    const res = await request(app).delete(`/tasks/${task.id}`);
    expect(res.status).toBe(204);

    const found = await Task.findByPk(task.id);
    expect(found).toBeNull();
  });

  it("deletes only completed tasks", async () => {
    await Task.bulkCreate([
      { title: "Done", priority: 1, isDone: true },
      { title: "Not done", priority: 1, isDone: false },
    ]);

    const res = await request(app).delete("/tasks/completed");
    expect(res.status).toBe(204);

    const remaining = await Task.findAll();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].title).toBe("Not done");
  });
});