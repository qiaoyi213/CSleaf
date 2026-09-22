'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const files = require('./files');

test('moves and uploads files into an existing folder', t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'csleaf-files-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const project = { dir };
  fs.writeFileSync(path.join(dir, 'paper.tex'), 'hello');
  fs.mkdirSync(path.join(dir, 'chapters'));

  assert.equal(files.renameEntry(project, 'paper.tex', 'paper.tex', 'chapters'), 'chapters/paper.tex');
  assert.equal(fs.readFileSync(path.join(dir, 'chapters', 'paper.tex'), 'utf8'), 'hello');
  assert.equal(files.saveUploaded(project, 'chapters', { originalname: 'figure.png', buffer: Buffer.from('png') }), 'chapters/figure.png');
  assert.equal(fs.readFileSync(path.join(dir, 'chapters', 'figure.png'), 'utf8'), 'png');
  assert.throws(() => files.renameEntry(project, 'chapters', 'chapters', 'chapters'), /itself/);
});
