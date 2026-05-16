/**
 * A single entry in the Chinese Characters Decomposition (CCD) dataset.
 *
 * Source columns (in order): Component, Strokes, CompositionType,
 * LeftComponent, LeftStrokes, RightComponent, RightStrokes, Signature,
 * Notes, Section.
 */
export interface CcdEntry {
  /** The character being decomposed. */
  component: string;
  /** Total stroke count of the character. */
  strokes: number;
  /**
   * Composition type indicator. A single character describing the
   * structural relationship between the two components, or `"*"` when
   * the character is atomic (i.e. has no further decomposition).
   *
   * Common values include `一` (single), `吕` (top/bottom), `回`
   * (enclosure), `吅` (left/right), `咒` (over two), etc.
   */
  compositionType: string;
  /** First (left/top/outer) sub-component, or `null` when atomic. */
  leftComponent: string | null;
  /** Stroke count of the first sub-component. */
  leftStrokes: number;
  /** Second (right/bottom/inner) sub-component, or `null` when atomic. */
  rightComponent: string | null;
  /** Stroke count of the second sub-component. */
  rightStrokes: number;
  /** Cangjie-style signature/code for the character. May be empty. */
  signature: string;
  /**
   * Free-form notes from the source table — short uncertainty/quality
   * marker pairs separated by `/` (for example `/`, `?/`, `/?`,
   * `?/?`) plus the special sentinel `/#REF!`.
   */
  notes: string;
  /** Radical/section the character is filed under, or `null` if unknown. */
  section: string | null;
}

/** The full CCD dataset as an array of {@link CcdEntry} records. */
export type CcdDataset = CcdEntry[];

/**
 * The full Chinese Characters Decomposition (CCD) dataset, parsed from
 * `data/ccd.tsv` into a typed JSON array.
 */
export declare const ccd: CcdDataset;

export default ccd;
