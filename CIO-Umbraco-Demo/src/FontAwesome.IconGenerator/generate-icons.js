// import all the svgs from the node_modules > @fontawesome/fontawesome-free > svgs folder
import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';

//foreach svg file generate a js file that exports the svg as a string
async function generateIcons() {
    const svgFiles = await fg('node_modules/@fortawesome/fontawesome-free/svgs/**/*.svg');
    const outputDir = path.join('..', 'CIO-Umbraco', 'wwwroot', 'App_Plugins', 'FontAwesomeIcons', 'Icons');
    // Clean the Icons folder before generating new files
    if (fs.existsSync(outputDir)) {
        for (const file of fs.readdirSync(outputDir)) {
            fs.unlinkSync(path.join(outputDir, file));
        }
    } else {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    const iconNames = [];
    for (const file of svgFiles) {
        const svgContent = fs.readFileSync(file, 'utf8');
        const iconName = `fa-${path.basename(file, '.svg')}`;
        const jsContent = `export default \`${svgContent}\`;`;
        fs.writeFileSync(path.join(outputDir, `${iconName}.js`), jsContent, 'utf8');
        iconNames.push(iconName);
    }
    generateIndexFile(iconNames, path.join(outputDir, 'index.js'));
}

generateIcons().then(() => {
    console.log('Icons generated successfully.');
}).catch(err => {
    console.error('Error generating icons:', err);
});


function generateIndexFile(iconNames, outputPath) {
    const exportArray = iconNames.map(name => `    {\n        name: '${name}',\n        path: () => import('./${name}.js'),\n    }`);
    const fileContent = `export default [\n${exportArray.join(',\n')}\n];\n`;
    fs.writeFileSync(outputPath, fileContent, 'utf8');
}
// Example usage:
// generateIndexFile(['fa-anchor', 'fa-bell'], './index.js');

// This is done in the generateIcons function above

// Note: Make sure to run "npm install @fortawesome/fontawesome-free fast-glob" before running this script.

