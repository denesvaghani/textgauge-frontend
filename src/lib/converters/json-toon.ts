/**
 * TOON (Token-Oriented Object Notation) Converter
 * 
 * TOON is a token-efficient data format designed for AI/LLM applications.
 * It reduces token usage by 30-60% compared to JSON while maintaining readability.
 * 
 * Key features:
 * - Indentation-based structure (like YAML)
 * - Tabular format for arrays of uniform objects
 * - Dot-notation for nested objects
 * - Minimal quoting requirements
 */

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/**
 * Check if a value needs to be quoted in TOON format
 */
function needsQuotes(value: string): boolean {
    if (value === '') return true;
    if (value.includes(',') || value.includes('\n') || value.includes(':')) return true;
    if (value.startsWith('"') || value.startsWith("'")) return true;
    if (value.includes('"')) return true;
    return false;
}

/**
 * Escape and quote a string value if needed
 */
function formatValue(value: JsonValue): string {
    if (value === null) return 'null';
    if (typeof value === 'boolean') return value.toString();
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'string') {
        if (needsQuotes(value)) {
            return `"${value.replace(/"/g, '\\"')}"`;
        }
        return value;
    }
    if (Array.isArray(value)) {
        // Format array as inline list
        return `[${value.map(v => formatValue(v)).join(', ')}]`;
    }
    if (typeof value === 'object') {
        // Format nested object inline
        return `{${Object.entries(value).map(([k, v]) => `${k}: ${formatValue(v)}`).join(', ')}}`;
    }
    return String(value);
}

/**
 * Flatten an object to dot-notation keys
 */
function flattenObject(obj: Record<string, JsonValue>, prefix = ''): Record<string, JsonValue> {
    const result: Record<string, JsonValue> = {};
    
    for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        
        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
            Object.assign(result, flattenObject(value as Record<string, JsonValue>, newKey));
        } else {
            result[newKey] = value;
        }
    }
    
    return result;
}

/**
 * Unflatten dot-notation keys back to nested object
 */
function unflattenObject(obj: Record<string, JsonValue>): Record<string, JsonValue> {
    const result: Record<string, JsonValue> = {};
    
    for (const [key, value] of Object.entries(obj)) {
        const parts = key.split('.');
        let current: Record<string, JsonValue> = result;
        
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            if (!(part in current)) {
                current[part] = {};
            }
            current = current[part] as Record<string, JsonValue>;
        }
        
        current[parts[parts.length - 1]] = value;
    }
    
    return result;
}

/**
 * Check if an array of objects has uniform keys (same keys in all objects)
 */
function hasUniformKeys(arr: Record<string, JsonValue>[]): boolean {
    if (arr.length === 0) return true;
    
    const firstKeys = Object.keys(flattenObject(arr[0])).sort().join(',');
    
    return arr.every(item => {
        const keys = Object.keys(flattenObject(item)).sort().join(',');
        return keys === firstKeys;
    });
}

/**
 * Get all unique keys from an array of objects
 */
function getAllKeys(arr: Record<string, JsonValue>[]): string[] {
    const keysSet = new Set<string>();
    
    for (const item of arr) {
        const flattened = flattenObject(item);
        Object.keys(flattened).forEach(k => keysSet.add(k));
    }
    
    return Array.from(keysSet);
}

/**
 * Convert JSON string to TOON format
 * 
 * @param jsonStr - Valid JSON string
 * @returns TOON formatted string
 * @throws Error if JSON is invalid
 */
export function jsonToToon(jsonStr: string): string {
    try {
        const data = JSON.parse(jsonStr);
        return convertValueToToon(data);
    } catch (e: any) {
        throw new Error(`JSON Parse Error: ${e.message}`);
    }
}

/**
 * Convert a JavaScript value to TOON format
 */
function convertValueToToon(value: JsonValue, indent = 0): string {
    const indentStr = '  '.repeat(indent);
    
    // Handle primitives
    if (value === null || typeof value !== 'object') {
        return formatValue(value);
    }
    
    // Handle arrays
    if (Array.isArray(value)) {
        if (value.length === 0) {
            return '[0]';
        }
        
        // Check if array of objects (for tabular format)
        const allObjects = value.every(item => 
            item !== null && typeof item === 'object' && !Array.isArray(item)
        );
        
        if (allObjects && value.length > 0) {
            const objArray = value as Record<string, JsonValue>[];
            const keys = getAllKeys(objArray);
            
            // Use tabular format for uniform arrays of objects
            const lines: string[] = [];
            lines.push(`[${value.length}]`);
            lines.push(keys.join(', '));
            
            for (const item of objArray) {
                const flattened = flattenObject(item);
                const rowValues = keys.map(k => {
                    const val = flattened[k];
                    return val === undefined ? '' : formatValue(val);
                });
                lines.push(rowValues.join(', '));
            }
            
            return lines.join('\n');
        }
        
        // For arrays of primitives or mixed types, use inline format
        return `[${value.map(v => formatValue(v)).join(', ')}]`;
    }
    
    // Handle objects
    const obj = value as Record<string, JsonValue>;
    const flattened = flattenObject(obj);
    const lines: string[] = [];
    
    for (const [key, val] of Object.entries(flattened)) {
        lines.push(`${key}: ${formatValue(val)}`);
    }
    
    return lines.join('\n');
}

/**
 * Parse a TOON string value back to JavaScript value
 */
function parseToonValue(str: string): JsonValue {
    const trimmed = str.trim();
    
    // Handle null
    if (trimmed === 'null') return null;
    
    // Handle booleans
    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;
    
    // Handle quoted strings
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
        return trimmed.slice(1, -1).replace(/\\"/g, '"');
    }
    
    // Handle numbers
    const num = Number(trimmed);
    if (!isNaN(num) && trimmed !== '') {
        return num;
    }
    
    // Handle inline arrays
    if (trimmed.startsWith('[') && trimmed.endsWith(']') && !trimmed.match(/^\[\d+\]$/)) {
        const inner = trimmed.slice(1, -1);
        if (inner === '') return [];
        // Simple split by comma (doesn't handle nested structures)
        return inner.split(',').map(v => parseToonValue(v.trim()));
    }
    
    // Return as string
    return trimmed;
}

/**
 * Convert TOON format back to JSON string
 * 
 * @param toonStr - TOON formatted string
 * @returns Formatted JSON string
 * @throws Error if TOON format is invalid
 */
export function toonToJson(toonStr: string): string {
    try {
        const lines = toonStr.split('\n').map(l => l.trimEnd());
        
        if (lines.length === 0 || (lines.length === 1 && lines[0] === '')) {
            return '{}';
        }
        
        // Check for tabular format (starts with [n])
        const arrayLengthMatch = lines[0].match(/^\[(\d+)\]$/);
        
        if (arrayLengthMatch) {
            return parseTabularToon(lines);
        }
        
        // Check for array length at 0
        if (lines[0] === '[0]') {
            return '[]';
        }
        
        // Key-value format (object)
        return parseKeyValueToon(lines);
    } catch (e: any) {
        throw new Error(`TOON Parse Error: ${e.message}`);
    }
}

/**
 * Parse tabular TOON format (array of objects)
 */
function parseTabularToon(lines: string[]): string {
    const arrayLengthMatch = lines[0].match(/^\[(\d+)\]$/);
    if (!arrayLengthMatch) {
        throw new Error('Invalid tabular format: missing array length');
    }
    
    const expectedLength = parseInt(arrayLengthMatch[1]);
    
    if (expectedLength === 0) {
        return '[]';
    }
    
    if (lines.length < 2) {
        throw new Error('Invalid tabular format: missing headers');
    }
    
    // Parse headers
    const headers = lines[1].split(',').map(h => h.trim());
    
    // Parse data rows
    const result: Record<string, JsonValue>[] = [];
    
    for (let i = 2; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;
        
        const values = parseCSVLine(lines[i]);
        const row: Record<string, JsonValue> = {};
        
        for (let j = 0; j < headers.length; j++) {
            const value = j < values.length ? values[j] : '';
            row[headers[j]] = parseToonValue(value);
        }
        
        result.push(unflattenObject(row));
    }
    
    return JSON.stringify(result, null, 2);
}

/**
 * Parse a CSV-like line respecting quoted values
 */
function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"' && !inQuotes) {
            inQuotes = true;
            current += char;
        } else if (char === '"' && inQuotes) {
            inQuotes = false;
            current += char;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim());
    return result;
}

/**
 * Parse key-value TOON format (single object)
 */
function parseKeyValueToon(lines: string[]): string {
    const flatObj: Record<string, JsonValue> = {};
    
    for (const line of lines) {
        if (line.trim() === '') continue;
        
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) {
            throw new Error(`Invalid line (missing colon): ${line}`);
        }
        
        const key = line.slice(0, colonIndex).trim();
        const valueStr = line.slice(colonIndex + 1).trim();
        
        flatObj[key] = parseToonValue(valueStr);
    }
    
    const result = unflattenObject(flatObj);
    return JSON.stringify(result, null, 2);
}
