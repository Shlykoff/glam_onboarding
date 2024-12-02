import request from "supertest";
import { Express } from "express-serve-static-core";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { server } from "../index";

describe("Express Server", () => {
  afterAll(function (done) {
    server.close(done);
  });
  it("GET / - should return the state", async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      started: 0,
      finished: 0,
      step: [0, 0, 0],
    });
  });

  it("POST / - should update state when isStarted is true", async () => {
    const response = await request(server).post("/").send({ isStarted: true });
    expect(response.status).toBe(200);

    const stateResponse = await request(server).get("/");
    expect(stateResponse.body.started).toBe(1);
  });

  it("POST / - should update state when isFinished is true", async () => {
    const response = await request(server).post("/").send({ isFinished: true });
    expect(response.status).toBe(200);

    const stateResponse = await request(server).get("/");
    expect(stateResponse.body.finished).toBe(1);
  });

  it("POST / - should update the correct step", async () => {
    const response = await request(server).post("/").send({ step: 2 });
    expect(response.status).toBe(200);

    const stateResponse = await request(server).get("/");
    expect(stateResponse.body.step).toEqual([0, 1, 0]);
  });

  it("POST / - should handle multiple updates", async () => {
    await request(server).post("/").send({ isStarted: true });
    await request(server).post("/").send({ isFinished: true });
    await request(server).post("/").send({ step: 3 });

    const stateResponse = await request(server).get("/");
    expect(stateResponse.body).toEqual({
      started: 2,
      finished: 2,
      step: [0, 1, 1],
    });
  });

  it("POST / - should not change state with no data", async () => {
    const response = await request(server).post("/").send({});
    expect(response.status).toBe(200);

    const stateResponse = await request(server).get("/");
    expect(stateResponse.body).toEqual({
      started: 2,
      finished: 2,
      step: [0, 1, 1],
    });
  });
});
