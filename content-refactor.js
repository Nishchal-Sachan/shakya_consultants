const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (['node_modules', '.next', '.git'].includes(file)) continue;
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;
      
      // Brand Name
      content = content.replace(/GDF Internationals/g, 'Shakya Consultants');
      content = content.replace(/GDF/g, 'Shakya');
      
      // CTA "Book a call"
      content = content.replace(/Book a call/g, 'Schedule Consultation');
      content = content.replace(/Book a Call/g, 'Schedule Consultation');
      content = content.replace(/BOOK A CALL/g, 'SCHEDULE CONSULTATION');
      
      // CTA "Apply Now"
      content = content.replace(/Apply Now/g, 'Join Our Team');
      content = content.replace(/APPLY NOW/g, 'JOIN OUR TEAM');
      
      // Logo Replacement
      content = content.replace(/<img[^>]*src="\/assets\/logo\.png"[^>]*\/>/g, '<div className="text-xl font-bold tracking-tighter shrink-0 text-white"><span className="text-accent-primary">Shakya</span> Consultants</div>');
      content = content.replace(/<img[^>]*src="\\\/assets\\\/logo\.png"[^>]*\/>/g, '<div className="text-xl font-bold tracking-tighter shrink-0 text-white"><span className="text-accent-primary">Shakya</span> Consultants</div>');
      
      if (original !== content) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

replaceInDir(process.cwd());
