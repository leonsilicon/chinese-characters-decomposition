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

The package ships a compiled ESM bundle (`index.js`) with TypeScript
declarations (`index.d.ts`), so it works in any modern Node.js, TypeScript,
or bundled environment. If you only need the raw data, import
`chinese-characters-decomposition/ccd.json` to skip the JS wrapper.

## Usage

```ts
import { ccd, type CcdEntry } from "chinese-characters-decomposition";

const entry: CcdEntry | undefined = ccd.find((e) => e.component === "好");
// {
//   component: "好",
//   strokes: 6,
//   compositionType: "吅",
//   leftComponent: "女",
//   leftStrokes: 3,
//   rightComponent: "子",
//   rightStrokes: 3,
//   signature: "VND",
//   notes: "/",
//   section: "女",
// }
```

Or import the raw JSON directly:

```ts
import dataset from "chinese-characters-decomposition/ccd.json";
```

## Entry shape

| Field             | Type             | Description                                                    |
| ----------------- | ---------------- | -------------------------------------------------------------- |
| `component`       | `string`         | The character being decomposed.                                |
| `strokes`         | `number`         | Total stroke count.                                            |
| `compositionType` | `string`         | Structure indicator (`一`, `吕`, `回`, `吅`, `咒`, …, or `*`). |
| `leftComponent`   | `string \| null` | First sub-component (`null` when atomic).                      |
| `leftStrokes`     | `number`         | Stroke count of the first sub-component.                       |
| `rightComponent`  | `string \| null` | Second sub-component (`null` when atomic).                     |
| `rightStrokes`    | `number`         | Stroke count of the second sub-component.                      |
| `signature`       | `string`         | Cangjie-style code (may be empty).                             |
| `notes`           | `string`         | Free-form source notes (`/`, `*/`, `?/`, …).                   |
| `section`         | `string \| null` | Kangxi radical the character is filed under.                   |

In the source TSV, missing/atomic sub-components and sections are encoded as
`*`; this parser converts them to `null`.

## Regenerating `ccd.json` and the bundle

`scripts/parse.ts` rebuilds `ccd.json` from `data/ccd.tsv`, and `vp pack`
bundles `src/index.ts` into `index.js` + `index.d.ts`. Both run
automatically on `npm publish` via `prepublishOnly`.

```sh
bun run parse   # regenerate ccd.json only
bun run build   # regenerate ccd.json and rebuild index.js + index.d.ts
```

## License

MIT. The underlying CCD table is distributed under the terms of the
[Wikimedia Commons][ccd] project.
