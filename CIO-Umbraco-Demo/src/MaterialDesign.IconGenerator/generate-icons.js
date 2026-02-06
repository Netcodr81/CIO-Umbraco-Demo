// import all the svgs from the node_modules > @fontawesome/fontawesome-free > svgs folder
import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';

//foreach svg file generate a js file that exports the svg as a string
async function generateIcons() {
    // Update to pull SVGs from material-design-icons package
    // Common SVG path: node_modules/material-design-icons/*/svg/production/*.svg
    const svgFiles = await fg('node_modules/material-design-icons/*/svg/production/*.svg');
    const outputDir = path.join('..', 'CIO-Umbraco', 'wwwroot', 'App_Plugins', 'MaterialDesign', 'Icons');
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
        let svgContent = fs.readFileSync(file, 'utf8');
        // Remove all fill attributes from the SVG
        svgContent = svgContent.replace(/fill\s*=\s*['\"][^'\"]*['\"]/gi, "");
        // Ensure the root <svg> tag has fill="currentColor"
        svgContent = svgContent.replace(
            /<svg([^>]*)>/i,
            (match, attrs) => `<svg${attrs} fill=\"currentColor\">`
        );
        // Material icons use format: ic_<icon>_48px.svg, so extract the icon name
        const base = path.basename(file, '.svg');
        const match = base.match(/^ic_(.+)_48px$/);
        const iconName = match ? match[1] : base;
        const jsFileName = `md-${iconName}.js`;
        const jsContent = `export default \`${svgContent}\`;`;
        fs.writeFileSync(path.join(outputDir, jsFileName), jsContent, 'utf8');
        iconNames.push(`md-${iconName}`);
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
