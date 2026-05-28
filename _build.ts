import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { CcdDataset, CcdRow } from "./index.d.ts";

const rootDir = dirname(fileURLToPath(import.meta.url));
const inputPath = join(rootDir, "data", "ccd.tsv");
const outputPath = join(rootDir, "ccd.json");

const EXPECTED_COLUMNS = 10;
const PLACEHOLDER = "*";

const HEADERS = [
  "component",
  "strokes",
  "compositionType",
  "leftComponent",
  "leftStrokes",
  "rightComponent",
  "rightStrokes",
  "signature",
  "notes",
  "section",
] as const;

function parseTsv(raw: string): CcdDataset {
  const rows: CcdRow[] = [];

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

    rows.push([
      component,
      Number(strokes),
      compositionType,
      leftComponent === PLACEHOLDER ? null : leftComponent,
      Number(leftStrokes),
      rightComponent === PLACEHOLDER ? null : rightComponent,
      Number(rightStrokes),
      signature,
      notes,
      section === PLACEHOLDER ? null : section,
    ]);
  }

  return { headers: [...HEADERS], rows };
}

const raw = readFileSync(inputPath, "utf8");
const dataset = parseTsv(raw);

for (const row of dataset.rows) {
  const [component, strokes, , , leftStrokes, , rightStrokes] = row;
  if (!Number.isFinite(strokes)) {
    throw new Error(`Invalid strokes for ${component}`);
  }
  if (!Number.isFinite(leftStrokes)) {
    throw new Error(`Invalid leftStrokes for ${component}`);
  }
  if (!Number.isFinite(rightStrokes)) {
    throw new Error(`Invalid rightStrokes for ${component}`);
  }
}

writeFileSync(outputPath, `${JSON.stringify(dataset)}\n`, "utf8");
console.log(`Wrote ${dataset.rows.length} rows to ${outputPath}`);
