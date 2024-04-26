import { List, nil, cons, explode_array, split_at } from './list';
import { compact } from './char_list';


/** Text and the name of the highlight (background) color to show it in. */
export type Highlight = {
  readonly color: string,
  readonly text: string
};


// Turns a list of lines into a list of Highlights. Each line should start with
// a color name, followed by a space, followed by the text with that color.
const getHighlights = (lines: List<string>): List<Highlight> => {
  if (lines.kind === "nil") {
    return nil;
  } else {
    const index = lines.hd.indexOf(' ');
    if (index < 0) {
      throw new Error(`line does not start with a color: "${lines.hd}"`);
    }
    const color = lines.hd.substring(0, index).toLowerCase();
    const text = lines.hd.substring(index+1).trim();
    return cons({color: color, text: text}, getHighlights(lines.tl));
  }
};


/**
 * Parses a list of highlights, written one highlight per line.
 * @param text Text to parse into highlights
 * @returns List of highlights described by the text, where each line is an
 *     individual highlight with the color being the first word of the line.
 */
export const parseLines = (text: string): List<Highlight> => {
  if (text.trim() === "") {
    return nil;
  } else {
    return getHighlights(explode_array(text.split('\n')));
  }
};


const OPEN: number = "[".charCodeAt(0);
const MIDDLE: number = "|".charCodeAt(0);
const CLOSE: number = "]".charCodeAt(0);

/**
 * Describe the first highlight found in some text. This is a triple consisting
 * of the text before the highlight (which contains no [..|..]s), the next
 * highlight, and the text after the highlight (which could contain [..|..]s).
 */
export type NextHighlight = readonly [string, Highlight, List<number>];

/**
 * Returns the next highlighted text (i.e., something of the form [..|..]) in
 * the given list of characters or undefined if there is none.
 * @param chars The list of characters in equestion
 * @returns The next highlight in the format described above (see NextHighlight)
 *     or undefined if no highlight was found.
 */
export const parseNextHighlight = (chars: List<number>): NextHighlight|undefined => {
  if (chars.kind === "nil")
    return undefined;

  const [A, B] = split_at(chars, OPEN);
  if (B.kind === "nil")
    return undefined;

  const [C, D] = split_at(B.tl, MIDDLE);
  if (D.kind === "nil")
    return undefined;

  const [E, F] = split_at(D.tl, CLOSE);
  if (F.kind === "nil")
    return undefined;

  const h = {color: compact(C).toLowerCase(), text: compact(E)}  // lowercase optional
  return [compact(A), h, F.tl];
};


// TODO: Uncomment and complete:

// /** Returns the highlights in the text as described in parseText. */
// export const parseHighlights = (chars: List<number>): List<Highlight> => {
//   // TODO: implement this
// };

// /**
//  * Parses text containing highlights of the form [color|text] into a list of
//  * highlights, where all unhighlighted parts are white.
//  * @param text Text to parse into highlights
//  * @returns List of highlights described by the text, where all letters are
//  *     contained in a single back highlight until a part of the form [c|t],
//  *     which becomes the highlight with color c and text t, followed by the
//  *     result of parsing the rest after that.
//  */
// export const parseText = (text: string): List<Highlight> => {
//   return parseHighlights(explode(text));
// };
