const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(process.cwd(), 'components', 'sections');

if (fs.existsSync(sectionsDir)) {
  const files = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.tsx'));
  
  for (const file of files) {
    const filePath = path.join(sectionsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Remove the exact inline style block that contains the radial-gradient for the section background.
    // Specifically looking for:
    // style={{
    //   background:
    //     "radial-gradient(circle,rgba...)"
    // }}
    // or similar variants
    const styleRegex = /\s*style=\{\{\s*background:\s*["'][^"']*radial-gradient[^"']*["'],?\s*\}\}/g;
    content = content.replace(styleRegex, '');
    
    // Also catch inline background in Hero.tsx
    const heroStyleRegex = /\s*style=\{\{\s*background:\s*["']radial-gradient[^"']*["']\s*\}\}/g;
    content = content.replace(heroStyleRegex, '');

    // Another variant just in case
    const genericStyleRegex = /\s*style=\{\{\s*background:\s*["']radial-gradient[^"']*["']\s*,?\s*\}\}/g;
    content = content.replace(genericStyleRegex, '');


    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Removed inline background style from ${file}`);
    }
  }
}
