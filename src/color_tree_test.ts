import * as assert from 'assert';
import { explode_array, nil} from "./list";
import {buildBst} from "./color_tree";
import { node, empty } from "./color_node";

describe('color_tree', function() {

    // TODO: Uncomment given examples and add more test cases in 3


        it('build_bst', function() {

            // Base Case - 0 recursive calls:
            assert.deepStrictEqual(buildBst(nil), empty);

            // 0-1-Many Heuristic - 1 recursive calls:
            assert.deepStrictEqual(buildBst(explode_array([
                ['Blue', '#0000FF', true],
              ])), node(['Blue', '#0000FF', true], empty, empty));

            assert.deepStrictEqual(buildBst(explode_array([
                ['Orange', '#FFA500', true],
            ])), node(['Orange', '#FFA500', true], empty, empty));

            // 0-1-Many Heuristic - Many recursive calls:
            assert.deepStrictEqual(buildBst(explode_array([
                ['Brown', '#964B00', true], ['Purple', '#800080', true]
            ])), node(['Purple', '#800080', true], node(['Brown', '#964B00', true], empty, empty), empty));

            assert.deepStrictEqual(buildBst(explode_array([
                ['Lime', '#bfff00', false], ['White', '#FFFFFF', false], ['Yellow', '#FFFF00', false],])),
                node(['White', '#FFFFFF', false], node(['Lime', '#bfff00', false], empty, empty), node(['Yellow', '#FFFF00', false], empty, empty))
            );

        });

    it('search', function() {
        // assert.deepEqual(search('Yellow', 
        //     node(['Yellow', '#FFFF00', false], empty, empty)), 
        //     ['Yellow', '#FFFF00', false]);
    });

    // TODO: copy some tests over here in 3g
});