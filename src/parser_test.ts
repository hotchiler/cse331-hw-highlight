import * as assert from 'assert';
import { explode } from './char_list';
import { explode_array, cons, nil } from './list';
import { parseNextHighlight, parseLines, parseHighlights, parseText } from './parser';


describe('parser', function() {

  it('parseLines', function() {
    assert.deepEqual(parseLines(""), explode_array([]));
    assert.deepEqual(
      parseLines("Red hi there"),
      explode_array([
        {color: 'red', text: 'hi there'},
      ]));
    assert.deepEqual(
      parseLines("Red hi there\nGreen more text"),
      explode_array([
        {color: 'red', text: 'hi there'},
        {color: 'green', text: 'more text'},
      ]));
    assert.deepEqual(
      parseLines("Red hi there\nGreen more text\nBlue really? more?"),
      explode_array([
        {color: 'red', text: 'hi there'},
        {color: 'green', text: 'more text'},
        {color: 'blue', text: 'really? more?'},
      ]));
  });

  it('parseNextHighlight', function() {
    // first branch
    assert.strictEqual(parseNextHighlight(explode("")), undefined);

    // second branch
    assert.strictEqual(parseNextHighlight(explode("ab")), undefined);
    assert.strictEqual(parseNextHighlight(explode("abc")), undefined);

    // third branch
    assert.strictEqual(parseNextHighlight(explode("ab[red")), undefined);
    assert.strictEqual(parseNextHighlight(explode("[red")), undefined);

    // fourth branch
    assert.strictEqual(parseNextHighlight(explode("abc[red|")), undefined);
    assert.strictEqual(parseNextHighlight(explode("abc[red|def")), undefined);

    // fifth branch
    assert.deepStrictEqual(parseNextHighlight(explode("my [red|ball] is great")),
        ["my ", {color: "red", text: "ball"}, explode(" is great")]);
    assert.deepStrictEqual(parseNextHighlight(explode("grass is [green|itchy]")),
        ["grass is ", {color: "green", text: "itchy"}, explode("")]);
  });

  it('parseHighlights', function() {
  // base case
  assert.deepStrictEqual(parseHighlights(explode("")), nil);
  // second branch
  assert.deepStrictEqual(parseHighlights(explode("mn")), cons({ color: "white", text: "mn" }, nil));
  // third branch
  assert.deepStrictEqual(parseHighlights(explode("[orange|fruit]")), cons({color: "orange", text: "fruit"}, nil));
  assert.deepStrictEqual(parseHighlights(explode("[cyan|cool] water")), cons({color: "cyan", text: "cool"},
  cons({color: "white", text: " water"}, nil)));
  // fourth branch
  assert.deepStrictEqual(parseHighlights(explode("[violet|flower][yellow|sunshine]")), cons({color: "violet", text: "flower"},
  cons({color: "yellow", text: "sunshine"}, nil)));
  assert.deepStrictEqual(parseHighlights(explode("[silver|coin][gold|ring] shine")), cons({color: "silver", text: "coin"},
  cons({color: "gold", text: "ring"}, cons({color: "white", text: " shine"}, nil))));

  });

  // TODO: Uncomment to test
  it('parseText', function() {
    assert.deepEqual(parseText(""), explode_array([]));
    assert.deepEqual(
      parseText("my [red|favorite] book"),
      explode_array([
        {color: 'white', text: 'my '},
        {color: 'red', text: 'favorite'},
        {color: 'white', text: ' book'},
      ]));
  });

});
