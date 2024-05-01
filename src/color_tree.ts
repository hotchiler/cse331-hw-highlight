import { List, len, split, nil } from './list';
import { ColorDetails, COLORS } from './colors';
import { ColorNode, empty, node } from './color_node';


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