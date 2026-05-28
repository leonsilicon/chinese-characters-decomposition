/**
 * The ordered column headers of the CCD dataset, matching the source TSV
 * columns: Component, Strokes, CompositionType, LeftComponent, LeftStrokes,
 * RightComponent, RightStrokes, Signature, Notes, Section.
 */
export type CcdHeaders = [
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
];

/**
 * A single row in the Chinese Characters Decomposition (CCD) dataset. The
 * tuple positions correspond to {@link CcdHeaders}:
 *
 * 0. `component` — the character being decomposed.
 * 1. `strokes` — total stroke count of the character.
 * 2. `compositionType` — composition type indicator. A single character
 *    describing the structural relationship between the two components, or
 *    `"*"` when the character is atomic. Common values include `一`
 *    (single), `吕` (top/bottom), `回` (enclosure), `吅` (left/right),
 *    `咒` (over two), etc.
 * 3. `leftComponent` — first (left/top/outer) sub-component, or `null` when
 *    atomic.
 * 4. `leftStrokes` — stroke count of the first sub-component.
 * 5. `rightComponent` — second (right/bottom/inner) sub-component, or `null`
 *    when atomic.
 * 6. `rightStrokes` — stroke count of the second sub-component.
 * 7. `signature` — Cangjie-style signature/code for the character. May be
 *    empty.
 * 8. `notes` — free-form notes from the source table — short
 *    uncertainty/quality marker pairs separated by `/` (for example `/`,
 *    `?/`, `/?`, `?/?`) plus the special sentinel `/#REF!`.
 * 9. `section` — radical/section the character is filed under, or `null` if
 *    unknown.
 */
export type CcdRow = [
  component: string,
  strokes: number,
  compositionType: string,
  leftComponent: string | null,
  leftStrokes: number,
  rightComponent: string | null,
  rightStrokes: number,
  signature: string,
  notes: string,
  section: string | null,
];

/** The full CCD dataset as column headers plus an array of {@link CcdRow} tuples. */
export interface CcdDataset {
  /** The ordered column names for each entry in {@link CcdDataset.rows}. */
  headers: CcdHeaders;
  /** The dataset rows, each a tuple aligned with {@link CcdDataset.headers}. */
  rows: CcdRow[];
}

declare const ccd: CcdDataset;
export default ccd;
