import fs from 'fs';
import path from 'path';

const baseAppDir = 'c:/Users/madso/OneDrive/Área de Trabalho/AIOS-(INFIDELITY)/infid_v2/app';

function processDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      fixEncodingAndButtons(fullPath);
    }
  }
}

function fixEncodingAndButtons(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    let content = buffer.toString('utf8');
    
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }

    const originalContent = content;

    // 1. Swap <a> with <button> for Fortpay specific buttons
    content = content.replace(/<a\s+href="javascript:void\(0\)"\s+data-fortpay="([^"]+)"/g, '<button type="button" data-fortpay="$1"');
    content = content.replace(/VIEW FULL REPORT\s*<\/a>/g, 'VIEW FULL REPORT</button>');
    
    // Also handle possible leftover href="#" or javascript: URLs
    content = content.replace(/<a\s+href=["']#["']\s+data-fortpay="([^"]+)"/g, '<button type="button" data-fortpay="$1" style={{ cursor: "pointer" }}');

    if (originalContent !== content) {
      console.log(`[FIXED]: ${filePath}`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

console.log("🚀 Restoring V2 UTF-8 Integrity & Upgrading Fortpay Buttons...");
processDir(baseAppDir);
console.log("\n✅ Done. Files are now clean UTF-8 and React-Safe.");
