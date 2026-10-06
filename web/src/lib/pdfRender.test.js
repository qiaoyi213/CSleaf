import test from 'node:test';
import assert from 'node:assert/strict';
import { renderMultiplier } from './pdfRender.js';

test('caps large PDF canvases while keeping small pages crisp', () => {
  assert.equal(renderMultiplier(600, 800, 1), 2);
  assert.equal(renderMultiplier(2000, 2000, 2), Math.sqrt(2));
});
