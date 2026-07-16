import { client } from "../db.js";

beforeAll(async () => {
  await client.sync({ force: true });
});

afterAll(async () => {
  await client.close();
});