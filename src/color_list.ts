import { ColorDetails, COLORS } from './colors';
import { List, cons, nil } from './list';

// TODO: add interfaces and classes here in part 1

// ColorList interface
export interface ColorList{
  /**
    * Returns a list of all color names that include the given text
    * @param text Text to look for in the names of the colors (case insensitive)
    * @returns list of all color names that include the given text
   */
  findNameSet:(text: string) => List<string>;
  /**
   * Returns the back and foreground css colors
   * @param name Name of the color
   * @throws throws if there is no such color
   * @returns back and foreground background is css background and foreground is css foreground.
   */
  getColorCss:(name: string) => readonly [string, string];
}


/**
 * Returns a list of all color names that include the given text
 * @param text Text to look for in the names of the colors (case insensitive)
 * @returns list of all color names that include the given text
 */
export const findNameSet = (text: string): List<string> => {
  return findNameSetIn(text, COLORS);
};

// Returns a new list containing just the names of those colors that include the
// given text.
// @param text The text in question
// @param colors The full list of colors
// @returns The sublist of colors containing those colors whose names contain
//    the given text.
const findNameSetIn =
    (text: string, colors: List<ColorDetails>): List<string> => {
  if (colors.kind === "nil") {
    return nil;
  } else {
    // Note: the _ keeps the typechecker from complaining about our not using
    // these variables (but we must define them to avoid tuple indexing)
    const [color, _css, _foreground] = colors.hd;
    if (color.includes(text)) {
      return cons(color, findNameSetIn(text, colors.tl));
    } else {
      return findNameSetIn(text, colors.tl);
    }
  }
};


/**
 * Returns the background and foreground CSS colors to highlight with this color.
 * @param name Name of the color to look for
 * @throws Error if there is no such color
 * @returns (bg, fg) where bg is the CSS background color and fg is foreground
 */
export const getColorCss = (name: string): readonly [string, string] => {
  return getColorCssIn(name, COLORS);
};

// Returns the colors from the (first) list entry with this color name. Throws
// an Error none is found (i.e., we hit the end of the list).
// @param name The name in question.
// @param colors The full list of colors.
// @throws Error if no item in colors has the given name.
// @return The first item in colors whose name matches the given name.
const getColorCssIn =
    (name: string, colors: List<ColorDetails>): readonly [string, string] => {
  if (colors.kind === "nil") {
    throw new Error(`no color called "${name}"`);
  } else {
    const [color, css, foreground] = colors.hd;
    if (color === name) {
      return [css, foreground ? '#F0F0F0' : '#101010'];
    } else {
      return getColorCssIn(name, colors.tl);
    }
  }
};


class SimpleColorList implements ColorList {
  readonly colors: List<ColorDetails>;

  /**
   * Constructs a SimpleColorList with a list of ColorDetails.
   * @param colors A list of ColorDetails.
   */
  constructor(colors: List<ColorDetails>) {
    this.colors = colors;
  }

  /**
   * Returns a list of color names that include the given text.
   * @param text The text to search for in the color names (case insensitive).
   * @returns A list of color names that include the given text.
   */
  findNameSet = (text: string): List<string> => {
    return this.findNameSetIn(text, this.colors);
  }

  /**
   * Returns the background and foreground colors to highlight with.
   * @param name The name of the color.
   * @throws Error If there is no color with the given name.
   * @returns A tuple where the first element is the CSS background color and the second element is the CSS foreground color.
   */
  getColorCss = (name: string): readonly [string, string] => {
    return this.getColorCssIn(name, this.colors);
  }

  /**
   * Helper function to find a list of color names that include the given text.
   * @param text The text to search for in the color names.
   * @param colors The list of colors to search in.
   * @returns A list of color names that include the given text.
   */
  private findNameSetIn = (text: string, colors: List<ColorDetails>): List<string> => {
    if (colors.kind === "nil") {
      return nil;
    } else {
      const [color, _css, _foreground] = colors.hd;
      if (color.includes(text)) {
        return cons(color, this.findNameSetIn(text, colors.tl));
      } else {
        return this.findNameSetIn(text, colors.tl);
      }
    }
  }

  /**
   * Helper function to get the background and foreground colors of a specific color.
   * @param name The name of the color.
   * @param colors The list of colors to search in.
   * @throws Error If there is no color with the given name.
   * @returns A tuple where the first element is the CSS background color and the second element is the CSS foreground color.
   */
  private getColorCssIn = (name: string, colors: List<ColorDetails>): readonly [string, string] => {
    if (colors.kind === "nil") {
      throw new Error(`No color called "${name}"`);
    } else {
      const [color, css, foreground] = colors.hd;
      if (color === name) {
        return [css, foreground ? '#F0F0F0' : '#101010'];
      } else {
        return this.getColorCssIn(name, colors.tl);
      }
    }
  }
}

/**
 * Creates and returns an instance of SimpleColorList that uses colors from COLORS.
 * @returns An instance of SimpleColorList.
 */
export const makeSimpleColorList = (): ColorList => {
  return new SimpleColorList(COLORS);
};