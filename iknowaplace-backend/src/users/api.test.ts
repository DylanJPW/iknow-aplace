import { describe, it, expect, beforeEach, vi } from "vitest";
import express from "express";
import type { Express } from "express";
import request from "supertest";

let app: Express;

beforeEach(async () => {
  vi.resetModules();
  const { usersRouter } = await import("./api.js");

  app = express();
  app.use(express.json());
  app.use("/api/users", usersRouter);
});

describe("GET /api/users", () => {
  it("returns the seeded users", async () => {
    const res = await request(app).get("/api/users");

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].username).toBe("test");
  });
});

describe("GET /api/users/:id", () => {
  it("returns the user when it exists", async () => {
    const res = await request(app).get("/api/users/0");

    expect(res.status).toBe(200);
    expect(res.body.email).toBe("test@test.com");
  });

  it("returns 404 when the user does not exist", async () => {
    const res = await request(app).get("/api/users/999");

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("User not found");
  });
});

describe("POST /api/users", () => {
  it("creates a user and trims whitespace", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ username: "  dylan  ", email: " d@example.com ", password: "pw" });

    expect(res.status).toBe(201);
    expect(res.body.id).toBe(1);
    expect(res.body.username).toBe("dylan");
    expect(res.body.email).toBe("d@example.com");

    // and it's really stored
    const list = await request(app).get("/api/users");
    expect(list.body).toHaveLength(2);
  });

  it("returns 400 when required fields are missing", async () => {
    const res = await request(app).post("/api/users").send({});

    expect(res.status).toBe(400);
  });
});

describe("PATCH /api/users/:id", () => {
  it("updates only the fields sent", async () => {
    const res = await request(app)
      .patch("/api/users/0")
      .send({ username: "  renamed  " });

    expect(res.status).toBe(200);
    expect(res.body.username).toBe("renamed");
    expect(res.body.email).toBe("test@test.com"); // unchanged
  });

  it("returns 404 when the user does not exist", async () => {
    const res = await request(app).patch("/api/users/999").send({ username: "x" });

    expect(res.status).toBe(404);
  });
});

describe("DELETE /api/users/:id", () => {
  it("deletes the user", async () => {
    const res = await request(app).delete("/api/users/0");
    expect(res.status).toBe(204);

    const after = await request(app).get("/api/users/0");
    expect(after.status).toBe(404);
  });

  it("returns 404 when the user does not exist", async () => {
    const res = await request(app).delete("/api/users/999");

    expect(res.status).toBe(404);
  });
});
