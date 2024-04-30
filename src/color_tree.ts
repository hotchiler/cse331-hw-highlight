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
// export const search = (y: string, root: ColorNode): ColorDetails | undefined => {
//     
// };

// TODO: add other classes or functions here as needed