import { List, len, split, nil } from './list';
import { ColorDetails, COLORS } from './colors';
import { ColorNode, empty, node} from './color_node';
import { findNameSetIn, getColorCssIn, ColorList} from './color_list';


/**
 * Builds a binary search tree (BST) from a given list of color details.
 *
 * @param {List<ColorDetails>} L - The list of color details.
 * @returns {ColorNode} The root node of the BST.
 */
export const buildBst = (L: List<ColorDetails>): ColorNode => {
    if (L === nil) {
        return empty;
    }
    const m = Math.floor(Number(len(L)) / 2);
    const [P, S] = split(BigInt(m), L);
    if (S !== nil && S.kind === 'cons') {
        const [b, R] = [S.hd, S.tl];
        return node(b, buildBst(P), buildBst(R));
    }
    return buildBst(P);
}

/**
 * Searches for a color in a color tree.
 * 
 * @param {string} y - The color to search for.
 * @param {ColorNode} root - The root node of the color tree.
 * @returns {ColorDetails | undefined} - The color details if found, otherwise undefined.
 */
export const search = (y: string, root: ColorNode): ColorDetails | undefined => {
    if (root === empty) {
        return undefined;
    }

    if (root.kind === "node") {
        const [color] = root.details;
        if (y === color) {
            return root.details;
        } else if (y < color) {
            return search(y, root.before);
        } else {
            return search(y, root.after);
        }
    }

    return undefined;
};

// TODO: add other classes or functions here as needed
/**
 * ColorTree storing color information in a binary search tree (BST).
 * Implements the ColorList interface.
 */
class ColorTree implements ColorList {
    /**
     * Representation Invariant: this.colorTree = makeBST(ColorDetailsList).
     * Abstraction Function: obj = this.ColorDetailsList.
     */
      readonly ColorDetailsList: List<ColorDetails>;
      readonly colorTree: ColorNode;
  
      /**
       * Creates an instance of a ColorTree.
       * @param ColorDetailsList A list of ColorDetails.
       */
       constructor(ColorDetailsList: List<ColorDetails>) {
          this.ColorDetailsList = ColorDetailsList;
          this.colorTree = buildBst(ColorDetailsList);
        }
  
      /**
       * Returns a list of all color names that have the given text.
       * @param text Searches for the names of the colors (case insensitive).
       * @returns List of all color names that have the given text.
       */
      findNameSet = (text: string): List<string> => {
        return findNameSetIn(text, this.ColorDetailsList);
      }
  
      /**
       * Returns the background and foreground to highlight with CSS colors.
       * @param name Name of the color.
       * @throws Error if color not found. 
       * @returns Tuple storing background (CSS color) and foreground (foreground).
       */
      getColorCss = (name: string): readonly [string, string] => {
        const ColorDetails = search(name, this.colorTree);
        if (ColorDetails) {
          return getColorCssIn(name, this.ColorDetailsList);
        } else {
          throw new Error(`Color not found: "${name}"`);
        }
      }
  }
  
  /**
   * Constructs a new ColorTree by taking in COLORS.
   */
  export const makeColorTree = (): ColorTree => {
      return new ColorTree(COLORS);
  };