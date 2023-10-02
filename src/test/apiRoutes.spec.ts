import { describe, it, beforeAll, afterAll, expect } from "vitest";
import next from "next";
import supertest from "supertest";
import http, { Server } from "http";
import fs from "fs";
import path from "path";
import Transaction from "@/server/entities/Transaction";

let server: Server | undefined;
const app = next({ dev: true });
const handler = app.getRequestHandler();
const filePath = path.join(
  'src',
  'test',
  'utils',
  'sales.txt',
);

describe("API routes", () => {
  beforeAll(async () => {
    await app.prepare();
    server = http.createServer((req, res) => {
      handler(req, res);
    });
    server.listen(3000);
  });

  afterAll(() => {
    if (server) server.close();
  });

  it("should be able to upload a correct transaction file and list correctly its content", async () => {
    if (!server) throw new Error('Server is not defined');

    const fileBuffer = fs.readFileSync(filePath);
    const base64File = fileBuffer.toString('base64');

    const fileLinesCount = fileBuffer.toString().split('\n').length - 1;

    const response = await supertest(server)
      .post("/api/upload")
      .send({
        file: base64File,
      })
      .expect(201);

    const { transactions } = response.body;
    expect(transactions).toHaveLength(fileLinesCount);
    transactions.forEach((transaction: Transaction) => {
      expect(transaction).toHaveProperty('type');
      expect(transaction).toHaveProperty('date');
      expect(transaction).toHaveProperty('productDescription');
      expect(transaction).toHaveProperty('value');
      expect(transaction).toHaveProperty('transactionOwnerName');
      expect(typeof transaction.type).toBe('number');
      expect(typeof transaction.date).toBe('string');
      expect(typeof transaction.productDescription).toBe('string');
      expect(typeof transaction.value).toBe('number');
      expect(typeof transaction.transactionOwnerName).toBe('string');
    });
  })
});
