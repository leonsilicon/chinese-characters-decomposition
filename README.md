# chinese-characters-decomposition

Typed JSON dataset of Chinese character decompositions (CCD), with a parser
for the source TSV.

The data comes from the [Wikimedia Commons CCD table][ccd] (21,169 entries),
which lists each character together with its stroke count, structural
composition type, sub-components, Cangjie signature, and Kangxi radical.

[ccd]: https://commons.wikimedia.org/wiki/Commons:Chinese_characters_decomposition

## Install

```sh
npm install chinese-characters-decomposition
```

The package ships an ESM entry point (`index.js`) with TypeScript
declarations (`index.d.ts`), so it works in any modern Node.js, TypeScript,
or bundled environment. If you only need the raw data, import
`chinese-characters-decomposition/ccd.json` to skip the JS wrapper.

## Usage

The dataset is a `{ headers, rows }` object: `headers` is the ordered list of
column names, and `rows` is an array of tuples aligned with those columns.

```ts
import ccd, { type CcdRow } from "chinese-characters-decomposition";

const row: CcdRow | undefined = ccd.rows.find((r) => r[0] === "好");
// ["好", 6, "吅", "女", 3, "子", 3, "VND", "/", "女"]
//   │    │   │    │    │   │    │    │     │    └─ section
//   │    │   │    │    │   │    │    │     └────── notes
//   │    │   │    │    │   │    │    └──────────── signature
//   │    │   │    │    │   │    └───────────────── rightStrokes
//   │    │   │    │    │   └────────────────────── rightComponent
//   │    │   │    │    └────────────────────────── leftStrokes
//   │    │   │    └─────────────────────────────── leftComponent
//   │    │   └──────────────────────────────────── compositionType
//   │    └──────────────────────────────────────── strokes
//   └───────────────────────────────────────────── component

ccd.headers;
// ["component", "strokes", "compositionType", "leftComponent", "leftStrokes",
//  "rightComponent", "rightStrokes", "signature", "notes", "section"]
```

Or import the raw JSON directly:

```ts
import dataset from "chinese-characters-decomposition/ccd.json";
```

## Row shape

Each row is a tuple whose positions line up with `headers`:

| Index | Header            | Type             | Description                                                    |
| ----- | ----------------- | ---------------- | -------------------------------------------------------------- |
| 0     | `component`       | `string`         | The character being decomposed.                                |
| 1     | `strokes`         | `number`         | Total stroke count.                                            |
| 2     | `compositionType` | `string`         | Structure indicator (`一`, `吕`, `回`, `吅`, `咒`, …, or `*`). |
| 3     | `leftComponent`   | `string \| null` | First sub-component (`null` when atomic).                      |
| 4     | `leftStrokes`     | `number`         | Stroke count of the first sub-component.                       |
| 5     | `rightComponent`  | `string \| null` | Second sub-component (`null` when atomic).                     |
| 6     | `rightStrokes`    | `number`         | Stroke count of the second sub-component.                      |
| 7     | `signature`       | `string`         | Cangjie-style code (may be empty).                             |
| 8     | `notes`           | `string`         | Free-form source notes (`/`, `*/`, `?/`, …).                   |
| 9     | `section`         | `string \| null` | Kangxi radical the character is filed under.                   |

In the source TSV, missing/atomic sub-components and sections are encoded as
`*`; this parser converts them to `null`.

## Regenerating `ccd.json`

`_build.ts` rebuilds `ccd.json` from `data/ccd.tsv`. It runs
automatically on `npm publish` via `prepublishOnly`.

```sh
bun run build   # regenerate ccd.json from data/ccd.tsv
```

## License

MIT. The underlying CCD table is distributed under the terms of the
[Wikimedia Commons][ccd] project.
