import * as XLSX from 'xlsx';

/**
 * File parser utility for List Comparator
 * Supports: TXT, CSV, JSON, Excel, Markdown
 */

/**
 * Parse plain text files (TXT, CSV)
 */
function parseTextFile(content: string): string {
  return content;
}

/**
 * Parse JSON files
 * Extracts string values from arrays or flattens object values
 */
function parseJSONFile(content: string): string {
  try {
    const data = JSON.parse(content);
    
    // If it's an array, extract all values
    if (Array.isArray(data)) {
      return data
        .map(item => {
          if (typeof item === 'string') return item;
          if (typeof item === 'object') return JSON.stringify(item);
          return String(item);
        })
        .join('\n');
    }
    
    // If it's an object, flatten the values
    if (typeof data === 'object' && data !== null) {
      const values: string[] = [];
      
      const extractValues = (obj: any) => {
        for (const key in obj) {
          const value = obj[key];
          if (Array.isArray(value)) {
            value.forEach(item => {
              if (typeof item === 'string') values.push(item);
              else if (typeof item === 'object') extractValues(item);
              else values.push(String(item));
            });
          } else if (typeof value === 'string') {
            values.push(value);
          } else if (typeof value === 'object' && value !== null) {
            extractValues(value);
          } else {
            values.push(String(value));
          }
        }
      };
      
      extractValues(data);
      return values.join('\n');
    }
    
    // Fallback to stringified version
    return JSON.stringify(data);
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
}

/**
 * Parse Excel files (.xlsx, .xls)
 * Reads first sheet and extracts all non-empty cells
 */
function parseExcelFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to array of arrays
        const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Flatten and extract all non-empty values
        const values: string[] = [];
        jsonData.forEach(row => {
          row.forEach(cell => {
            if (cell !== null && cell !== undefined && cell !== '') {
              values.push(String(cell));
            }
          });
        });
        
        resolve(values.join('\n'));
      } catch (error) {
        reject(new Error('Failed to parse Excel file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read Excel file'));
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Parse Markdown files
 * Extracts list items (bullets and numbered) and plain text
 */
function parseMarkdownFile(content: string): string {
  const lines = content.split('\n');
  const extracted: string[] = [];
  
  lines.forEach(line => {
    const trimmed = line.trim();
    
    // Extract bullet list items (-, *, +)
    const bulletMatch = trimmed.match(/^[-*+]\s+(.+)$/);
    if (bulletMatch) {
      extracted.push(bulletMatch[1].trim());
      return;
    }
    
    // Extract numbered list items (1., 2., etc)
    const numberedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (numberedMatch) {
      extracted.push(numberedMatch[1].trim());
      return;
    }
    
    // Skip headers, code blocks, and empty lines
    if (trimmed && 
        !trimmed.startsWith('#') && 
        !trimmed.startsWith('```') &&
        !trimmed.startsWith('---') &&
        trimmed !== '```') {
      extracted.push(trimmed);
    }
  });
  
  return extracted.join('\n');
}

/**
 * Main file parser - detects file type and routes to appropriate parser
 */
export async function parseFile(file: File): Promise<string> {
  const ext = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  
  // Handle Excel files (require ArrayBuffer reading)
  if (ext === '.xlsx' || ext === '.xls') {
    return parseExcelFile(file);
  }
  
  // Handle text-based files
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        
        switch (ext) {
          case '.json':
            resolve(parseJSONFile(content));
            break;
          case '.md':
            resolve(parseMarkdownFile(content));
            break;
          case '.txt':
          case '.csv':
          case '.text':
            resolve(parseTextFile(content));
            break;
          default:
            // Fallback to plain text
            resolve(content);
        }
      } catch (error: any) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

/**
 * Get supported file extensions
 */
export const SUPPORTED_EXTENSIONS = [
  '.txt',
  '.csv',
  '.text',
  '.json',
  '.xlsx',
  '.xls',
  '.md'
] as const;

/**
 * Get file accept attribute for input
 */
export const FILE_ACCEPT_ATTR = SUPPORTED_EXTENSIONS.join(',');
