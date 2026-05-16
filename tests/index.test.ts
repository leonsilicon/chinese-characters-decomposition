import { expect, test } from "vite-plus/test";
import ccd from "../index.js";

test("dataset is non-empty", () => {
  expect(ccd.length).toBeGreaterThan(20000);
});

test("entries have the expected shape", () => {
  const entry = ccd[0];
  expect(entry).toBeDefined();
  if (entry === undefined) return;
  expect(typeof entry.component).toBe("string");
  expect(typeof entry.strokes).toBe("number");
  expect(typeof entry.compositionType).toBe("string");
});

test("atomic characters have null left/right components", () => {
  const atomic = ccd.find((e) => e.component === "一");
  expect(atomic).toBeDefined();
  if (atomic === undefined) return;
  expect(atomic.strokes).toBe(1);
});
