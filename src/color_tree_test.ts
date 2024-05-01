import * as assert from "assert";
import { explode_array, nil, cons } from "./list";
import { buildBst, search, makeColorTree } from "./color_tree";
import { node, empty } from "./color_node";
import { ColorList } from "./color_list";

describe("color_tree", function () {
  // TODO: Uncomment given examples and add more test cases in 3

  it("build_bst", function () {
    // Base Case - 0 recursive calls:
    assert.deepStrictEqual(buildBst(nil), empty);

    // 0-1-Many Heuristic - 1 recursive calls:
    assert.deepStrictEqual(
      buildBst(explode_array([["Blue", "#0000FF", true]])),
      node(["Blue", "#0000FF", true], empty, empty)
    );

    assert.deepStrictEqual(
      buildBst(explode_array([["Orange", "#FFA500", true]])),
      node(["Orange", "#FFA500", true], empty, empty)
    );

    // 0-1-Many Heuristic - Many recursive calls:
    assert.deepStrictEqual(
      buildBst(
        explode_array([
          ["Brown", "#964B00", true],
          ["Purple", "#800080", true],
        ])
      ),
      node(
        ["Purple", "#800080", true],
        node(["Brown", "#964B00", true], empty, empty),
        empty
      )
    );

    assert.deepStrictEqual(
      buildBst(
        explode_array([
          ["Lime", "#bfff00", false],
          ["White", "#FFFFFF", false],
          ["Yellow", "#FFFF00", false],
        ])
      ),
      node(
        ["White", "#FFFFFF", false],
        node(["Lime", "#bfff00", false], empty, empty),
        node(["Yellow", "#FFFF00", false], empty, empty)
      )
    );
  });

  it("search", function () {
    // Base Cases
    assert.deepStrictEqual(search("purple", empty), undefined);

    // 1 recursive calls:
    assert.deepStrictEqual(
      search("cyan", node(["magenta", "#FF00FF", false], empty, empty)),
      undefined
    );

    assert.deepStrictEqual(
      search("cyan", node(["lime", "#00FF00", false], empty, empty)),
      undefined
    );

    // Height 1 tree
    assert.deepStrictEqual(
      search("lime", node(["indigo", "#4B0082", true], empty, empty)),
      undefined
    );

    // Height 1 tree
    assert.deepStrictEqual(
      search("red", node(["blueviolet", "##8A2BE2", true], empty, empty)),
      undefined
    );

    // Height 2 tree
    assert.deepStrictEqual(
      search(
        "orange",
        node(
          ["red", "#FF0000", true],
          node(["orange", "#FFA500", false], empty, empty),
          empty
        )
      ),
      ["orange", "#FFA500", false]
    );

    //Many recursive calls:

    // Height 3 tree
    assert.deepStrictEqual(
      search(
        "blue",
        node(
          ["red", "#FFFF00", true],
          node(
            ["pink", "#FFC0CB", false],
            node(["blue", "#0000FF", true], empty, empty),
            empty
          ),
          empty
        )
      ),
      ["blue", "#0000FF", true]
    );
  });

  // TODO: copy some tests over here in 3g
  const colorTree: ColorList = makeColorTree();

  it("findNameSet", function () {
    assert.deepStrictEqual(colorTree.findNameSet("doesnotexist"), nil);
    assert.deepStrictEqual(
      colorTree.findNameSet("indigo"),
      cons("indigo", nil)
    );
    assert.deepStrictEqual(colorTree.findNameSet("azure"), cons("azure", nil));
    assert.deepStrictEqual(
      colorTree.findNameSet("lavender"),
      cons("lavender", cons("lavenderblush", nil))
    );
    assert.deepStrictEqual(
      colorTree.findNameSet("pink"),
      cons("deeppink", cons("hotpink", cons("lightpink", cons("pink", nil))))
    );
  });

  it("getColorCss", function () {
    assert.deepStrictEqual(colorTree.getColorCss("lavender"), [
      "#E6E6FA",
      "#101010",
    ]);
    assert.deepStrictEqual(colorTree.getColorCss("indigo"), [
      "#4B0082",
      "#F0F0F0",
    ]);
  });
});
