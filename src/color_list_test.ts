import * as assert from 'assert';
import { nil, cons } from './list';
import { findNameSet, getColorCss } from './color_list';


describe('color_list', function() {

  // TODO: create an instance of ColorList with makeSimpleColorList to use below for 1e

  it('findNameSet', function() {
    assert.deepEqual(findNameSet("doesnotexist"), nil);
    assert.deepEqual(findNameSet("notacolor"), nil);
    assert.deepEqual(findNameSet("indigo"), cons("indigo", nil));
    assert.deepEqual(findNameSet("azure"), cons("azure", nil));
    assert.deepEqual(findNameSet("lavender"),
        cons("lavender", cons("lavenderblush", nil)));
    assert.deepEqual(findNameSet("pink"),
        cons("deeppink", cons("hotpink", cons("lightpink", cons("pink", nil)))));
  });

  it('getColorCss', function() {
    assert.deepEqual(getColorCss("lavender"), ['#E6E6FA', '#101010']);
    assert.deepEqual(getColorCss("indigo"), ['#4B0082', '#F0F0F0']);
  });
});