
// Escape HTML special characters
export function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// Highlight JSON syntax with colors
export function highlightJson(code: string): string {
    if (!code || !code.trim()) return '';
    
    // Regex to match JSON tokens
    const tokenRegex = /("(?:[^"\\]|\\.)*")(?=\s*:)|("(?:[^"\\]|\\.)*")|(-?\d+\.?\d*(?:[eE][+-]?\d+)?)|(\btrue\b|\bfalse\b|\bnull\b)|([\[\]{}])|([:,])|(\s+)/g;
    
    let result = '';
    let lastIndex = 0;
    let match;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let expectingColon = false;
    
    while ((match = tokenRegex.exec(code)) !== null) {
        // Add any unmatched text before this match
        if (match.index > lastIndex) {
            result += escapeHtml(code.substring(lastIndex, match.index));
        }
        
        const [fullMatch, key, string, number, bool, bracket, punctuation, whitespace] = match;
        
        if (key) {
            // Key (property name) - bold blue color
            result += `<span class="text-blue-700 dark:text-blue-300 font-semibold">${escapeHtml(key)}</span>`;
            expectingColon = true;
        } else if (string) {
            // String value - rich green
            result += `<span class="text-green-700 dark:text-green-300">${escapeHtml(string)}</span>`;
        } else if (number) {
            // Number - vivid orange
            result += `<span class="text-orange-600 dark:text-orange-400 font-medium">${escapeHtml(number)}</span>`;
        } else if (bool) {
            // Boolean or null - bold magenta/pink
            result += `<span class="text-fuchsia-600 dark:text-fuchsia-400 font-semibold">${escapeHtml(bool)}</span>`;
        } else if (bracket) {
            // Brackets - darker gray for visibility
            result += `<span class="text-slate-700 dark:text-slate-300 font-medium">${escapeHtml(bracket)}</span>`;
        } else if (punctuation) {
            // Colon and comma - visible dark color
            result += `<span class="text-slate-600 dark:text-slate-400">${escapeHtml(punctuation)}</span>`;
            expectingColon = false;
        } else if (whitespace) {
            // Preserve whitespace
            result += whitespace;
        } else {
            result += escapeHtml(fullMatch);
        }
        
        lastIndex = match.index + fullMatch.length;
    }
    
    // Add remaining text
    if (lastIndex < code.length) {
        result += escapeHtml(code.substring(lastIndex));
    }
    
    return result;
}


// Highlight YAML syntax with colors
export function highlightYaml(code: string): string {
    if (!code || !code.trim()) return '';
    
    const lines = code.split('\n');
    const highlightedLines = lines.map(line => {
        if (!line.trim()) return escapeHtml(line);
        
        // Comment line
        if (line.trim().startsWith('#')) {
            return `<span class="text-gray-500 dark:text-gray-400 italic">${escapeHtml(line)}</span>`;
        }
        
        // Check if it's a key-value line
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const beforeColon = line.substring(0, colonIndex);
            const afterColon = line.substring(colonIndex + 1);
            
            // Check for leading dash (array item with key)
            const dashMatch = beforeColon.match(/^(\s*-\s*)/);
            let keyPart = beforeColon;
            let dashPart = '';
            
            if (dashMatch) {
                dashPart = `<span class="text-teal-600 dark:text-teal-400 font-medium">${escapeHtml(dashMatch[1])}</span>`;
                keyPart = beforeColon.substring(dashMatch[1].length);
            }
            
            // Highlight key - bold blue
            const highlightedKey = `<span class="text-blue-700 dark:text-blue-300 font-semibold">${escapeHtml(keyPart)}</span>`;
            const colonSpan = `<span class="text-slate-600 dark:text-slate-400">:</span>`;
            
            // Highlight value
            let highlightedValue = '';
            const valueTrimmed = afterColon.trim();
            
            if (valueTrimmed === '') {
                highlightedValue = escapeHtml(afterColon); // Preserve whitespace
            } else if (valueTrimmed === 'true' || valueTrimmed === 'false' || valueTrimmed === 'null' || valueTrimmed === '~') {
                const leadingSpace = afterColon.match(/^(\s*)/)?.[1] || '';
                highlightedValue = `${leadingSpace}<span class="text-fuchsia-600 dark:text-fuchsia-400 font-semibold">${escapeHtml(valueTrimmed)}</span>`;
            } else if (/^-?\d+\.?\d*$/.test(valueTrimmed)) {
                const leadingSpace = afterColon.match(/^(\s*)/)?.[1] || '';
                highlightedValue = `${leadingSpace}<span class="text-orange-600 dark:text-orange-400 font-medium">${escapeHtml(valueTrimmed)}</span>`;
            } else if (valueTrimmed.startsWith('"') || valueTrimmed.startsWith("'")) {
                const leadingSpace = afterColon.match(/^(\s*)/)?.[1] || '';
                highlightedValue = `${leadingSpace}<span class="text-green-700 dark:text-green-300">${escapeHtml(valueTrimmed)}</span>`;
            } else if (valueTrimmed.startsWith('[') || valueTrimmed.startsWith('{')) {
                const leadingSpace = afterColon.match(/^(\s*)/)?.[1] || '';
                highlightedValue = `${leadingSpace}<span class="text-slate-700 dark:text-slate-300 font-medium">${escapeHtml(valueTrimmed)}</span>`;
            } else {
                // Plain string value (no quotes in YAML) - rich green
                const leadingSpace = afterColon.match(/^(\s*)/)?.[1] || '';
                highlightedValue = `${leadingSpace}<span class="text-green-700 dark:text-green-300">${escapeHtml(valueTrimmed)}</span>`;
            }
            
            return dashPart + highlightedKey + colonSpan + highlightedValue;
        }
        
        // Array item (just dash)
        const arrayMatch = line.match(/^(\s*)(-\s*)(.*)$/);
        if (arrayMatch) {
            const [, indent, dash, value] = arrayMatch;
            const dashSpan = `<span class="text-teal-600 dark:text-teal-400 font-medium">${escapeHtml(dash)}</span>`;
            
            let valueSpan = '';
            const valueTrimmed = value.trim();
            if (valueTrimmed === 'true' || valueTrimmed === 'false' || valueTrimmed === 'null') {
                valueSpan = `<span class="text-fuchsia-600 dark:text-fuchsia-400 font-semibold">${escapeHtml(value)}</span>`;
            } else if (/^-?\d+\.?\d*$/.test(valueTrimmed)) {
                valueSpan = `<span class="text-orange-600 dark:text-orange-400 font-medium">${escapeHtml(value)}</span>`;
            } else {
                valueSpan = `<span class="text-green-700 dark:text-green-300">${escapeHtml(value)}</span>`;
            }
            
            return indent + dashSpan + valueSpan;
        }
        
        // Default - return as plain text
        return escapeHtml(line);
    });
    
    return highlightedLines.join('\n');
}


// Highlight TOML syntax
export function highlightToml(code: string): string {
    if (!code || !code.trim()) return '';

    const lines = code.split('\n');
    return lines.map(line => {
        if (!line.trim()) return escapeHtml(line);

        // Comments
        const commentMatch = line.match(/^(.*)(#.*)$/);
        let content = line;
        let comment = '';

        if (line.trim().startsWith('#')) {
             return `<span class="text-gray-500 dark:text-gray-400 italic">${escapeHtml(line)}</span>`;
        }

        if (commentMatch) {
            content = commentMatch[1];
            comment = `<span class="text-gray-500 dark:text-gray-400 italic">${escapeHtml(commentMatch[2])}</span>`;
        }

        // Section [section]
        if (content.trim().startsWith('[')) {
             return `<span class="text-yellow-600 dark:text-yellow-400 font-bold">${escapeHtml(content)}</span>` + comment;
        }

        // Key = Value
        const equalIndex = content.indexOf('=');
        if (equalIndex > 0) {
            const key = content.substring(0, equalIndex);
            const value = content.substring(equalIndex + 1);

            const keySpan = `<span class="text-blue-700 dark:text-blue-300 font-semibold">${escapeHtml(key)}</span>`;
            const equalSpan = `<span class="text-slate-600 dark:text-slate-400">=</span>`;

            // Simple value highlighting
            let valueSpan = escapeHtml(value);
            const vTrim = value.trim();

             if (vTrim === 'true' || vTrim === 'false') {
                valueSpan = value.replace(vTrim, `<span class="text-fuchsia-600 dark:text-fuchsia-400 font-semibold">${vTrim}</span>`);
            } else if (/^-?\d/.test(vTrim)) { 
                 valueSpan = value.replace(vTrim, `<span class="text-orange-600 dark:text-orange-400 font-medium">${vTrim}</span>`);
            } else if (vTrim.startsWith('"') || vTrim.startsWith("'")) {
                valueSpan = `<span class="text-green-700 dark:text-green-300">${escapeHtml(value)}</span>`;
            }

            return keySpan + equalSpan + valueSpan + comment;
        }

        return escapeHtml(content) + comment;

    }).join('\n');
}

// Highlight CSV syntax
export function highlightCsv(code: string, options: { isFragment?: boolean } = {}): string {
    if (!code || !code.trim()) return '';
    
    // Simple CSV tokenizer
    // 1. Quoted string: "..." (double quotes escaped as "")
    // 2. Comma
    // 3. Newline
    // 4. Value (anything else)
    const tokenRegex = /(,)|("(?:[^"]|"")*")|(\r?\n)|([^\r\n,]+)/g;
    
    let result = '';
    let lastIndex = 0;
    let match;
    let isHeader = !options.isFragment; // Treat first line as header unless it's a fragment
    
    while ((match = tokenRegex.exec(code)) !== null) {
         if (match.index > lastIndex) {
            result += escapeHtml(code.substring(lastIndex, match.index));
        }
        
        const [fullMatch, comma, quotedString, newline, value] = match;
        
        if (comma) {
            if (isHeader) {
                result += `<span class="text-blue-400 dark:text-blue-500 font-bold">${escapeHtml(comma)}</span>`;
            } else {
                result += `<span class="text-slate-500 dark:text-slate-400 font-bold">${escapeHtml(comma)}</span>`;
            }
        } else if (quotedString) {
             if (isHeader) {
                 result += `<span class="text-blue-800 dark:text-blue-200 font-bold">${escapeHtml(quotedString)}</span>`;
             } else {
                 result += `<span class="text-green-700 dark:text-green-300">${escapeHtml(quotedString)}</span>`;
             }
        } else if (newline) {
            result += newline;
            isHeader = false; // After first newline, no longer header
        } else if (value) {
            if (isHeader) {
                result += `<span class="text-blue-800 dark:text-blue-200 font-bold">${escapeHtml(value)}</span>`;
            } else {
                // Check if number or bool
                const vTrim = value.trim();
                 if (vTrim === 'true' || vTrim === 'false' || vTrim === 'null') {
                    result += `<span class="text-fuchsia-600 dark:text-fuchsia-400 font-semibold">${escapeHtml(value)}</span>`;
                } else if (/^-?\d+\.?\d*$/.test(vTrim)) {
                    result += `<span class="text-orange-600 dark:text-orange-400 font-medium">${escapeHtml(value)}</span>`;
                } else {
                    result += escapeHtml(value);
                }
            }
        }
        
        lastIndex = match.index + fullMatch.length;
    }
     if (lastIndex < code.length) {
        result += escapeHtml(code.substring(lastIndex));
    }
    return result;
}
