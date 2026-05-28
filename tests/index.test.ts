import { expect, test } from "vite-plus/test";
import ccd from "../index.js";

test("dataset is non-empty", () => {
  expect(ccd.rows.length).toBeGreaterThan(20000);
});

test("headers match the row arity", () => {
  expect(ccd.headers[0]).toBe("component");
  const row = ccd.rows[0];
  expect(row).toBeDefined();
  if (row === undefined) return;
  expect(row.length).toBe(ccd.headers.length);
});

test("rows have the expected shape", () => {
  const row = ccd.rows[0];
  expect(row).toBeDefined();
  if (row === undefined) return;
  expect(typeof row[0]).toBe("string");
  expect(typeof row[1]).toBe("number");
  expect(typeof row[2]).toBe("string");
});

test("atomic characters are present", () => {
  const atomic = ccd.rows.find((r) => r[0] === "一");
  expect(atomic).toBeDefined();
  if (atomic === undefined) return;
  expect(atomic[1]).toBe(1);
});
