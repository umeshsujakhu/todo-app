import request from "supertest";
import express, { Express } from "express";
import { initApp } from "../app";
import { MongoMemoryServer } from "mongodb-memory-server";
import { clearDatabase, closeDatabase } from "../config/db";
import { Types } from "mongoose";

import Todo from "../model/Todo";

const app: Express = express();
let mongod: any = undefined;
let uri: string = "";

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  uri = mongod.getUri();
  await initApp(app, {
    MONGO_URI: uri,
  });
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
  await clearDatabase();
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  await closeDatabase();
});

describe("POST /todo", () => {
  it("should show required validation error for missing fields", async () => {
    const res = await request(app).post("/api/v1/todo").send({});

    expect(res.status).toEqual(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toEqual([
      { path: "title", message: "Title is required" },
      { path: "completed", message: "Completed field is required" },
    ]);
  });

  it("should show validation error if completed field is not boolean", async () => {
    const res = await request(app).post("/api/v1/todo").send({
      title: "Test Todo",
      completed: "12345",
    });

    expect(res.status).toEqual(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([expect.objectContaining({ path: "completed" })])
    );
  });

  it("should create a new todo", async () => {
    const res = await request(app).post("/api/v1/todo").send({
      title: "Test Todo",
      completed: false,
    });

    expect(res.status).toEqual(200);
    expect(res.body.data.title).toEqual("Test Todo");
  });
});

describe("PUT /todo/:id", () => {
  it("should show required validation error for missing fields", async () => {
    const todoId = new Types.ObjectId();

    const res = await request(app).put(`/api/v1/todo/${todoId}`).send({});

    expect(res.status).toEqual(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toEqual([
      { path: "title", message: "Title is required" },
      { path: "completed", message: "Completed field is required" },
    ]);
  });

  it("should update an existing todo", async () => {
    const createTodoRes = await request(app)
      .post("/api/v1/todo")
      .send({ title: "Test Todo", completed: false });

    const createdTodoId = createTodoRes.body.data._id;

    const updateTodoRes = await request(app)
      .put(`/api/v1/todo/${createdTodoId}`)
      .send({ title: "Updated Test Todo", completed: true });

    expect(updateTodoRes.status).toEqual(200);
    expect(updateTodoRes.body.data.title).toEqual("Updated Test Todo");
    expect(updateTodoRes.body.data.completed).toEqual(true);
  });

  it("should return 404 when updating a non-existing todo", async () => {
    const nonExistingTodoId = new Types.ObjectId();

    const updateTodoRes = await request(app)
      .put(`/api/v1/todo/${nonExistingTodoId}`)
      .send({ title: "Test Todo", completed: true });

    expect(updateTodoRes.status).toEqual(404);
  });
});

describe("GET /todo", () => {
  it("should list all todos", async () => {
    await request(app).post("/api/v1/todo").send({
      title: "Test Todo 1",
      completed: false,
    });

    await request(app).post("/api/v1/todo").send({
      title: "Test Todo 2",
      completed: true,
    });

    const res = await request(app).get("/api/v1/todo");

    expect(res.status).toEqual(200);
    expect(res.body.data.length).toEqual(2);
  });

  it("should return empty data when no data in database", async () => {
    const res = await request(app).get("/api/v1/todo");

    expect(res.status).toEqual(200);
    expect(res.body.data.length).toEqual(0);
  });
});

describe("DELETE /todo/:id", () => {
  it("should delete an existing todo", async () => {
    const createTodoRes = await request(app)
      .post("/api/v1/todo")
      .send({ title: "Test Todo", completed: false });

    const createdTodoId = createTodoRes.body.data._id;

    const deleteTodoRes = await request(app).delete(
      `/api/v1/todo/${createdTodoId}`
    );

    expect(deleteTodoRes.status).toEqual(200);

    const findDeletedTodoRes = await Todo.findById(createdTodoId);
    expect(findDeletedTodoRes).toBeNull();
  });

  it("should return 404 when deleting a non-existing todo", async () => {
    const nonExistingTodoId = new Types.ObjectId();

    const deleteTodoRes = await request(app).delete(
      `/api/v1/todo/${nonExistingTodoId}`
    );

    expect(deleteTodoRes.status).toEqual(404);
  });
});

describe("PATCH /todo/:id/status", () => {
  it("should return 404 when updating a non-existing todo status", async () => {
    const nonExistingTodoId = new Types.ObjectId();

    const updateTodoRes = await request(app)
      .put(`/api/v1/todo/${nonExistingTodoId}/status`)
      .send({ completed: true });

    expect(updateTodoRes.status).toEqual(404);
  });

  it("should show validation error if completed field is not boolean", async () => {
    const todoId = new Types.ObjectId();

    const res = await request(app)
      .patch(`/api/v1/todo/${todoId}/status`)
      .send({ completed: "random string" });

    expect(res.status).toEqual(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "completed",
          message: "Expected boolean, received string",
        }),
      ])
    );
  });

  it("should show required validation error when completed field is missing", async () => {
    const todoId = new Types.ObjectId();

    const res = await request(app)
      .patch(`/api/v1/todo/${todoId}/status`)
      .send({});

    expect(res.status).toEqual(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([expect.objectContaining({ path: "completed" })])
    );
  });

  it("should update the status of an existing todo", async () => {
    const createTodoRes = await request(app)
      .post("/api/v1/todo")
      .send({ title: "Test Todo", completed: false });

    const createdTodoId = createTodoRes.body.data._id;

    const updateStatusRes = await request(app)
      .patch(`/api/v1/todo/${createdTodoId}/status`)
      .send({ completed: true });

    expect(updateStatusRes.status).toEqual(200);
    expect(updateStatusRes.body.data.completed).toEqual(true);
  });
});
