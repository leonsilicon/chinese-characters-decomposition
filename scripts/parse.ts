import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { CcdDataset, CcdEntry } from "../index.d.ts";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const inputPath = join(rootDir, "data", "ccd.tsv");
const outputPath = join(rootDir, "ccd.json");

const EXPECTED_COLUMNS = 10;
const PLACEHOLDER = "*";

function parseTsv(raw: string): CcdDataset {
  const entries: CcdEntry[] = [];

  for (const [index, rawLine] of raw.split("\n").entries()) {
    const line = rawLine.replace(/\r$/, "");
    if (line === "" || line.startsWith("<pre>") || line.startsWith("</pre>")) {
      continue;
    }

    const fields = line.split("\t");

    // The first non-pre line is the header row.
    if (fields[0] === "Component") {
      continue;
    }

    // Skip the wiki preamble (single-column lines before the first <pre>).
    if (fields.length < EXPECTED_COLUMNS) {
      continue;
    }

    if (fields.length !== EXPECTED_COLUMNS) {
      throw new Error(
        `Line ${index + 1}: expected ${EXPECTED_COLUMNS} columns, got ${fields.length}`,
      );
    }

    const [
      component,
      strokes,
      compositionType,
      leftComponent,
      leftStrokes,
      rightComponent,
      rightStrokes,
      signature,
      notes,
      section,
    ] = fields as [string, string, string, string, string, string, string, string, string, string];

    entries.push({
      component,
      strokes: Number(strokes),
      compositionType,
      leftComponent: leftComponent === PLACEHOLDER ? null : leftComponent,
      leftStrokes: Number(leftStrokes),
      rightComponent: rightComponent === PLACEHOLDER ? null : rightComponent,
      rightStrokes: Number(rightStrokes),
      signature,
      notes,
      section: section === PLACEHOLDER ? null : section,
    });
  }

  return entries;
}

const raw = readFileSync(inputPath, "utf8");
const dataset = parseTsv(raw);

for (const entry of dataset) {
  if (!Number.isFinite(entry.strokes)) {
    throw new Error(`Invalid strokes for ${entry.component}`);
  }
  if (!Number.isFinite(entry.leftStrokes)) {
    throw new Error(`Invalid leftStrokes for ${entry.component}`);
  }
  if (!Number.isFinite(entry.rightStrokes)) {
    throw new Error(`Invalid rightStrokes for ${entry.component}`);
  }
}

writeFileSync(outputPath, `${JSON.stringify(dataset, null, 2)}\n`, "utf8");
console.log(`Wrote ${dataset.length} entries to ${outputPath}`);
