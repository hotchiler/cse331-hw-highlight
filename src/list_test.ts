import * as assert from 'assert';
import { nil, cons, len, split, compact_list, explode_array } from './list';
import { explode } from './char_list';
import { split_at } from './list';


describe('list', function() {

  it('len', function() {
    // 0-1-many: base case, 0 recursive calls (only 1 possible input)
    assert.deepEqual(len(nil), 0n);

    // 0-1-many: 1 recursive call
    assert.deepEqual(len(cons(1n, nil)), 1n);
    assert.deepEqual(len(cons(2n, nil)), 1n);

    // 0-1-many: 2+ recursive calls
    assert.deepEqual(len(cons(1n, cons(2n, nil))), 2n);
    assert.deepEqual(len(cons(3n, cons(2n, cons(1n, cons(0n, nil))))), 4n);
  });

  it('split', function() {
    // 0-1-many: base case
    assert.deepEqual(split(0n, explode("")), [nil, nil]);
    assert.deepEqual(split(0n, explode("a")), [nil, explode("a")]);

    // 0-1-many: 1 recursive call
    assert.deepEqual(split(1n, explode("a")), [explode("a"), nil]);
    assert.deepEqual(split(1n, explode("ab")), [explode("a"), explode("b")]);
    assert.deepEqual(split(1n, explode("destiny")), [explode("d"), explode("estiny")]);

    // 0-1-many: 2+ recursive calls
    assert.deepEqual(split(2n, explode("ab")), [explode("ab"), nil]);
    assert.deepEqual(split(2n, explode("golgoroth")), [explode("go"), explode("lgoroth")]);
    assert.deepEqual(split(3n, explode("caretaker")), [explode("car"), explode("etaker")]);
    assert.deepEqual(split(4n, explode("planets")), [explode("plan"), explode("ets")]);
    assert.deepEqual(split(5n, explode("atraks")), [explode("atrak"), explode("s")]);
  });
  
  it('split_at', function() {
    //0-1-many: base case
    assert.deepEqual(split_at(nil, "a"), [nil, nil]);
    assert.deepEqual(split_at(nil, "b"), [nil, nil]);

    //0-1-many: second base case
    assert.deepEqual(split_at(explode("c"), "c".charCodeAt(0)), [nil, explode("c")]);
    assert.deepEqual(split_at(explode("d"), "d".charCodeAt(0)), [nil, explode("d")]);

    //0-1-many: 1 recursive call
    assert.deepEqual(split_at(explode("ab"), "b".charCodeAt(0)), [explode("a"), explode("b")])
    assert.deepEqual(split_at(explode("bc"), "c".charCodeAt(0)), [explode("b"), explode("c")])
    assert.deepEqual(split_at(explode("x"), "y".charCodeAt(0)), [explode("x"), nil])
    assert.deepEqual(split_at(explode("a"), "b".charCodeAt(0)), [explode("a"), nil])

    //0-1-many: 2+ recursive calls
    assert.deepEqual(split_at(explode("nut"), "t".charCodeAt(0)), [explode("nu"), explode("t")])
    assert.deepEqual(split_at(explode("peanuts"), "n".charCodeAt(0)), [explode("pea"), explode("nuts")])
    assert.deepEqual(split_at(explode("po"), "x".charCodeAt(0)), [explode("po"), nil])
    assert.deepEqual(split_at(explode("peanuts"), "b".charCodeAt(0)), [explode("peanuts"), nil])
  });

  it('compact_list', function() {
    // 0-1-many: base case (only 1 possible)
    assert.deepEqual(compact_list(nil), []);

    // 0-1-many: 1 recursive call
    assert.deepEqual(compact_list(cons(1n, nil)), [1n]);
    assert.deepEqual(compact_list(cons(8n, nil)), [8n]);

    // 0-1-many: 2+ recursive calls
    assert.deepEqual(compact_list(cons(1n, cons(2n, nil))), [1n, 2n]);
    assert.deepEqual(compact_list(cons(3n, cons(2n, cons(1n, nil)))), [3n, 2n, 1n]);
  });

  it('explode_array', function() {
    // 0-1-many: base case (only 1 possible)
    assert.deepEqual(explode_array([]), nil);

    // 0-1-many: 1 recursive call
    assert.deepEqual(explode_array([1n]), cons(1n, nil));
    assert.deepEqual(explode_array([8n]), cons(8n, nil));

    // 0-1-many: 2+ recursive calls
    assert.deepEqual(explode_array([1n, 2n]), cons(1n, cons(2n, nil)));
    assert.deepEqual(explode_array([1n, 2n, 3n]), cons(1n, cons(2n, cons(3n, nil))));
  });
});