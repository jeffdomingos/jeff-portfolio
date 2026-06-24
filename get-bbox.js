const { svgPathBbox } = require('svg-path-bbox');
const fs = require('fs');
const content = fs.readFileSync('public/images/mesa-note.svg', 'utf8');
const match = content.match(/<path id="Cabeça"[^>]*d="([^"]+)"/);
if (match) {
    const bbox = svgPathBbox(match[1]);
    console.log("BBOX:", bbox);
} else {
    console.log("Not found");
}
