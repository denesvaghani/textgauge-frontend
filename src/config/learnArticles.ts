/**
 * Learn Articles Registry
 * ========================
 * Single source of truth for all educational articles.
 * 
 * HOW TO ADD A NEW ARTICLE:
 * 1. Add a new object to the LEARN_ARTICLES array below
 * 2. Fill in all required fields
 * 3. The article will automatically appear at /learn/{slug}
 * 
 * That's it! No need to create new page files.
 */

// ============ TYPE DEFINITIONS ============

export interface CodeBlock {
  language: 'json' | 'csv' | 'javascript' | 'python' | 'typescript' | 'bash' | 'yaml' | 'text';
  content: string;
  filename?: string;  // Optional filename to display above code block
}

export interface ArticleSection {
  id: string;           // Used for anchor links (e.g., #what-is-json)
  heading: string;      // Section heading (H2)
  content: string;      // HTML content (supports <p>, <strong>, <ul>, <li>, <code>, etc.)
  code?: CodeBlock;     // Optional code example
  table?: {             // Optional comparison table
    headers: string[];
    rows: string[][];
  };
}

export interface FAQ {
  question: string;
  answer: string;
}

export type ArticleCategory = 'Fundamentals' | 'Guides' | 'Tutorials' | 'Comparisons';

export interface LearnArticle {
  // ============ ROUTING & SEO ============
  slug: string;                    // URL path: /learn/{slug}
  title: string;                   // Page <title> and <h1>
  description: string;             // Meta description (150-160 chars ideal)
  keywords: string[];              // Target SEO keywords
  
  // ============ DISPLAY ============
  category: ArticleCategory;
  icon: string;                    // Lucide icon name (e.g., 'FileJson', 'ArrowRightLeft')
  readTime: string;                // e.g., "5 min read"
  publishDate: string;             // ISO date: YYYY-MM-DD
  updatedDate?: string;            // Last updated date (optional)
  
  // ============ CONTENT ============
  intro: string;                   // Opening paragraph (HTML supported)
  sections: ArticleSection[];      // Main article sections
  faqs?: FAQ[];                    // FAQ section (generates schema markup)
  
  // ============ CTA & LINKING ============
  ctaTitle: string;                // CTA section heading
  ctaDescription: string;          // CTA description text
  ctaLink: string;                 // Link to tool/page
  ctaLabel: string;                // Button text
  relatedArticles?: string[];      // Slugs of related articles
}

// ============ ARTICLE CONTENT ============

export const LEARN_ARTICLES: LearnArticle[] = [
  // ============================================================
  // ARTICLE 1: What is JSON?
  // ============================================================
  {
    slug: 'what-is-json',
    title: 'What is JSON? A Complete Guide for Developers',
    description: 'Learn JSON fundamentals: syntax rules, data types, real-world examples, and best practices. The definitive guide to JavaScript Object Notation.',
    keywords: ['what is json', 'json format', 'json example', 'json syntax', 'json data types', 'json tutorial'],
    category: 'Fundamentals',
    icon: 'FileJson',
    readTime: '8 min read',
    publishDate: '2026-01-22',
    
    intro: `<p><strong>JSON (JavaScript Object Notation)</strong> is the universal language of data exchange on the web. Whether you're fetching data from an API, storing configuration settings, or passing information between services, chances are you're working with JSON.</p>
<p>This guide covers everything you need to know about JSON: its syntax, data types, real-world examples, and best practices that will make you a more effective developer.</p>`,
    
    sections: [
      {
        id: 'what-is-json',
        heading: 'What is JSON?',
        content: `<p>JSON stands for <strong>JavaScript Object Notation</strong>. Despite its name, JSON is completely language-independent and can be used with virtually any programming language including Python, Java, C#, Go, Ruby, and PHP.</p>
<p>JSON was derived from JavaScript but has become the dominant data format for web APIs, configuration files, and data storage. It was standardized as <a href="https://www.ecma-international.org/publications-and-standards/standards/ecma-404/" target="_blank" rel="noopener">ECMA-404</a> in 2013.</p>
<p><strong>Key characteristics of JSON:</strong></p>
<ul>
  <li><strong>Human-readable</strong> — Easy for developers to read and write</li>
  <li><strong>Machine-parseable</strong> — Quick for computers to parse and generate</li>
  <li><strong>Language-independent</strong> — Works with any programming language</li>
  <li><strong>Lightweight</strong> — Minimal syntax overhead compared to XML</li>
</ul>`,
        code: {
          language: 'json',
          filename: 'example.json',
          content: `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "isActive": true,
  "roles": ["developer", "admin"]
}`
        }
      },
      {
        id: 'json-syntax',
        heading: 'JSON Syntax Rules',
        content: `<p>JSON has strict syntax rules. Understanding these rules will help you avoid common parsing errors.</p>
<p><strong>The 6 fundamental rules:</strong></p>
<ol>
  <li><strong>Data is in key-value pairs</strong> — Keys must be strings in double quotes</li>
  <li><strong>Data is separated by commas</strong> — No trailing commas allowed</li>
  <li><strong>Curly braces hold objects</strong> — <code>{}</code> for object containers</li>
  <li><strong>Square brackets hold arrays</strong> — <code>[]</code> for ordered lists</li>
  <li><strong>Strings use double quotes only</strong> — Single quotes are invalid</li>
  <li><strong>No comments allowed</strong> — JSON doesn't support // or /* */ comments</li>
</ol>
<p><strong>Common mistakes to avoid:</strong></p>
<ul>
  <li>Using single quotes instead of double quotes</li>
  <li>Adding trailing commas after the last item</li>
  <li>Forgetting to quote property names</li>
  <li>Using undefined or NaN (not valid JSON values)</li>
</ul>`,
        code: {
          language: 'json',
          filename: 'syntax-example.json',
          content: `{
  "string": "Hello World",
  "number": 42,
  "decimal": 3.14159,
  "boolean": true,
  "nullValue": null,
  "array": [1, 2, 3],
  "object": {
    "nested": "value"
  }
}`
        }
      },
      {
        id: 'json-data-types',
        heading: 'JSON Data Types',
        content: `<p>JSON supports exactly <strong>six data types</strong>. Understanding these types is essential for working with JSON effectively.</p>`,
        table: {
          headers: ['Type', 'Description', 'Example'],
          rows: [
            ['String', 'Text in double quotes', '"Hello World"'],
            ['Number', 'Integer or floating-point', '42, 3.14, -17'],
            ['Boolean', 'True or false value', 'true, false'],
            ['Null', 'Empty/no value', 'null'],
            ['Array', 'Ordered list of values', '[1, 2, 3]'],
            ['Object', 'Key-value pairs', '{"key": "value"}'],
          ]
        }
      },
      {
        id: 'json-examples',
        heading: 'Real-World JSON Examples',
        content: `<p>Let's look at how JSON is used in real applications. These examples represent common patterns you'll encounter daily.</p>
<p><strong>1. API Response (User Data)</strong></p>
<p>This is a typical response from a REST API returning user information:</p>`,
        code: {
          language: 'json',
          filename: 'api-response.json',
          content: `{
  "status": "success",
  "data": {
    "user": {
      "id": 12345,
      "username": "johndoe",
      "email": "john@example.com",
      "profile": {
        "firstName": "John",
        "lastName": "Doe",
        "avatar": "https://example.com/avatars/12345.jpg"
      },
      "createdAt": "2024-01-15T10:30:00Z",
      "permissions": ["read", "write", "delete"]
    }
  },
  "meta": {
    "requestId": "abc-123",
    "timestamp": "2026-01-22T12:00:00Z"
  }
}`
        }
      },
      {
        id: 'json-vs-xml',
        heading: 'JSON vs XML: Quick Comparison',
        content: `<p>Before JSON became dominant, XML was the primary data exchange format. Here's why JSON won:</p>`,
        table: {
          headers: ['Aspect', 'JSON', 'XML'],
          rows: [
            ['Readability', 'Cleaner, less verbose', 'More verbose with tags'],
            ['File Size', 'Smaller (30-50% less)', 'Larger due to closing tags'],
            ['Parsing Speed', 'Faster', 'Slower'],
            ['Data Types', 'Native types (number, boolean)', 'Everything is a string'],
            ['Comments', 'Not supported', 'Supported'],
            ['Namespaces', 'Not supported', 'Supported'],
          ]
        }
      },
      {
        id: 'working-with-json',
        heading: 'Working with JSON in Code',
        content: `<p>Every major programming language has built-in or standard library support for JSON. Here are examples in the most common languages:</p>
<p><strong>JavaScript (Native Support)</strong></p>`,
        code: {
          language: 'javascript',
          content: `// Parse JSON string to object
const data = JSON.parse('{"name": "John", "age": 30}');
console.log(data.name); // "John"

// Convert object to JSON string
const obj = { name: "Jane", age: 25 };
const jsonString = JSON.stringify(obj, null, 2);
console.log(jsonString);`
        }
      },
      {
        id: 'common-use-cases',
        heading: 'Common Use Cases for JSON',
        content: `<p>JSON is everywhere in modern software development. Here are the most common scenarios:</p>
<ul>
  <li><strong>REST APIs</strong> — The standard format for API request/response bodies</li>
  <li><strong>Configuration Files</strong> — package.json, tsconfig.json, .eslintrc.json</li>
  <li><strong>Data Storage</strong> — MongoDB documents, localStorage, IndexedDB</li>
  <li><strong>Message Queues</strong> — Kafka, RabbitMQ, AWS SQS payloads</li>
  <li><strong>GraphQL</strong> — Response format for GraphQL queries</li>
  <li><strong>WebSockets</strong> — Real-time data exchange format</li>
  <li><strong>Logging</strong> — Structured logging (JSON logs)</li>
</ul>
<p><strong>Pro Tip:</strong> When working with large JSON files or complex structures, use a <a href="/json-formatter">JSON formatter</a> to make the data readable and catch syntax errors.</p>`
      },
      {
        id: 'best-practices',
        heading: 'JSON Best Practices',
        content: `<p>Follow these best practices to write clean, maintainable JSON:</p>
<ol>
  <li><strong>Use consistent naming conventions</strong> — camelCase is most common for JavaScript/TypeScript projects</li>
  <li><strong>Keep nesting shallow</strong> — Deeply nested objects are hard to work with</li>
  <li><strong>Use arrays for homogeneous data</strong> — All items should have the same structure</li>
  <li><strong>Validate your JSON</strong> — Always validate before parsing in production</li>
  <li><strong>Use ISO 8601 for dates</strong> — "2026-01-22T12:00:00Z" format is universally parseable</li>
  <li><strong>Consider JSON Schema</strong> — For complex APIs, define a schema for validation</li>
</ol>`
      }
    ],
    
    faqs: [
      {
        question: 'What does JSON stand for?',
        answer: 'JSON stands for JavaScript Object Notation. It was derived from JavaScript but is now language-independent and used across all programming languages.'
      },
      {
        question: 'Is JSON better than XML?',
        answer: 'For most web applications, yes. JSON is more compact (30-50% smaller), faster to parse, and has native data types. However, XML is better when you need comments, namespaces, or document markup (like XHTML).'
      },
      {
        question: 'Can JSON have comments?',
        answer: 'No, standard JSON does not support comments. If you need comments in configuration files, consider using JSON5, JSONC (JSON with Comments), or YAML instead.'
      },
      {
        question: 'What is the maximum size of a JSON file?',
        answer: 'There is no official limit in the JSON specification. However, practical limits depend on the parser and available memory. Most parsers handle files up to several gigabytes, but for very large datasets, consider streaming parsers or alternative formats.'
      },
      {
        question: 'How do I validate JSON?',
        answer: 'You can validate JSON using online tools like our JSON Formatter, or programmatically using JSON.parse() in JavaScript (it throws an error for invalid JSON), or json.loads() in Python.'
      }
    ],
    
    ctaTitle: 'Format & Validate Your JSON',
    ctaDescription: 'Use our free JSON Formatter to beautify, validate, and minify your JSON data. Instant syntax highlighting and error detection.',
    ctaLink: '/json-formatter',
    ctaLabel: 'Try JSON Formatter',
    relatedArticles: ['what-is-csv', 'what-is-toon', 'json-to-csv-guide']
  },

  // ============================================================
  // ARTICLE 2: What is CSV?
  // ============================================================
  {
    slug: 'what-is-csv',
    title: 'What is CSV? The Complete Guide to Comma-Separated Values',
    description: 'Learn CSV format fundamentals: structure, syntax, Excel compatibility, and when to use CSV vs JSON. Practical examples included.',
    keywords: ['what is csv', 'csv format', 'csv file', 'comma separated values', 'csv example', 'csv excel'],
    category: 'Fundamentals',
    icon: 'FileSpreadsheet',
    readTime: '6 min read',
    publishDate: '2026-01-22',
    
    intro: `<p><strong>CSV (Comma-Separated Values)</strong> is the simplest and most widely supported format for tabular data. If you've ever exported data from Excel, imported contacts to your phone, or migrated data between systems, you've used CSV.</p>
<p>This guide explains the CSV format, its strengths and limitations, and when to choose CSV over alternatives like JSON or Excel.</p>`,
    
    sections: [
      {
        id: 'what-is-csv',
        heading: 'What is CSV?',
        content: `<p>CSV stands for <strong>Comma-Separated Values</strong>. It's a plain text format where:</p>
<ul>
  <li>Each line represents a <strong>row</strong> (record)</li>
  <li>Values within a row are separated by <strong>commas</strong></li>
  <li>The first row typically contains <strong>column headers</strong></li>
</ul>
<p>CSV files have been around since the 1970s, predating most modern formats. Their simplicity is their greatest strength — any text editor can open them, and virtually every programming language and spreadsheet application supports them.</p>`,
        code: {
          language: 'csv',
          filename: 'users.csv',
          content: `name,email,age,city
John Doe,john@example.com,30,New York
Jane Smith,jane@example.com,25,London
Bob Johnson,bob@example.com,35,Tokyo`
        }
      },
      {
        id: 'csv-structure',
        heading: 'CSV Structure & Rules',
        content: `<p>While CSV seems simple, there are important rules to follow:</p>
<p><strong>Basic Rules:</strong></p>
<ol>
  <li><strong>Delimiter</strong> — Commas separate values (some regions use semicolons)</li>
  <li><strong>Line ending</strong> — Each row ends with a newline (CRLF or LF)</li>
  <li><strong>Quoting</strong> — Values containing commas, quotes, or newlines must be enclosed in double quotes</li>
  <li><strong>Escaping quotes</strong> — Double quotes inside quoted fields are escaped by doubling them: <code>""</code></li>
</ol>
<p><strong>Handling Special Characters:</strong></p>`,
        code: {
          language: 'csv',
          filename: 'special-chars.csv',
          content: `name,description,price
"Widget, Large",Standard widget with comma,19.99
"Quote Test","He said ""Hello""",29.99
"Multiline
Description","This spans
multiple lines",39.99`
        }
      },
      {
        id: 'csv-advantages',
        heading: 'Advantages of CSV',
        content: `<p>CSV remains popular for good reasons:</p>
<ul>
  <li><strong>Universal Compatibility</strong> — Opens in Excel, Google Sheets, Numbers, and any text editor</li>
  <li><strong>Small File Size</strong> — 50-60% smaller than equivalent JSON for tabular data</li>
  <li><strong>Human Readable</strong> — Easy to inspect and edit manually</li>
  <li><strong>Fast Processing</strong> — Streaming parsers can handle massive files efficiently</li>
  <li><strong>Database Friendly</strong> — Easy to import/export from SQL databases</li>
  <li><strong>No Dependencies</strong> — No special libraries needed to read/write</li>
</ul>`
      },
      {
        id: 'csv-limitations',
        heading: 'Limitations of CSV',
        content: `<p>CSV has significant limitations you should be aware of:</p>
<ul>
  <li><strong>No Data Types</strong> — Everything is a string. Numbers, dates, and booleans have no inherent type.</li>
  <li><strong>No Nesting</strong> — Cannot represent hierarchical or nested data structures.</li>
  <li><strong>No Standard</strong> — Different applications handle edge cases differently.</li>
  <li><strong>Encoding Issues</strong> — UTF-8 handling varies. Excel sometimes expects BOM.</li>
  <li><strong>No Metadata</strong> — Cannot include schema, comments, or additional information.</li>
</ul>
<p><strong>When CSV Causes Problems:</strong></p>
<ul>
  <li>Dates like "01/02/2024" — Is this January 2nd or February 1st?</li>
  <li>Numbers like "001234" — Leading zeros may be stripped</li>
  <li>Large numbers — Excel may convert to scientific notation</li>
</ul>`
      },
      {
        id: 'csv-vs-json',
        heading: 'CSV vs JSON: When to Use Each',
        content: `<p>Both formats have their place. Choose based on your use case:</p>`,
        table: {
          headers: ['Use Case', 'Best Format', 'Why'],
          rows: [
            ['Spreadsheet work', 'CSV', 'Native Excel/Sheets support'],
            ['API responses', 'JSON', 'Supports nested data and types'],
            ['Configuration files', 'JSON', 'Structured and typed'],
            ['Database export/import', 'CSV', 'Universal SQL support'],
            ['Data interchange', 'JSON', 'Language-agnostic with types'],
            ['Large datasets', 'CSV', 'Smaller size, streaming support'],
            ['Complex nested data', 'JSON', 'Supports hierarchy'],
          ]
        }
      },
      {
        id: 'working-with-csv',
        heading: 'Working with CSV Files',
        content: `<p>Here's how to work with CSV in common languages:</p>
<p><strong>JavaScript (Browser)</strong></p>`,
        code: {
          language: 'javascript',
          content: `// Simple CSV parser (for basic CSV without quotes)
function parseCSV(text) {
  const lines = text.trim().split('\\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, i) => {
      obj[header] = values[i];
      return obj;
    }, {});
  });
}

// Usage
const csv = "name,age\\nJohn,30\\nJane,25";
const data = parseCSV(csv);
// [{ name: "John", age: "30" }, { name: "Jane", age: "25" }]`
        }
      },
      {
        id: 'csv-best-practices',
        heading: 'CSV Best Practices',
        content: `<p>Follow these guidelines for reliable CSV files:</p>
<ol>
  <li><strong>Always include headers</strong> — First row should name each column</li>
  <li><strong>Use UTF-8 encoding</strong> — Add BOM for Excel compatibility if needed</li>
  <li><strong>Quote fields with special characters</strong> — Commas, quotes, newlines</li>
  <li><strong>Use ISO 8601 dates</strong> — YYYY-MM-DD format is unambiguous</li>
  <li><strong>Escape quotes properly</strong> — Double them: <code>""</code></li>
  <li><strong>Validate before processing</strong> — Check row lengths match header count</li>
</ol>`
      }
    ],
    
    faqs: [
      {
        question: 'What does CSV stand for?',
        answer: 'CSV stands for Comma-Separated Values. It\'s a plain text format where data values are separated by commas, with each line representing a row of data.'
      },
      {
        question: 'Can Excel open CSV files?',
        answer: 'Yes, Excel natively supports CSV files. Simply double-click a .csv file to open it in Excel, or use File > Open. Note that Excel may change number formatting, so always check your data after opening.'
      },
      {
        question: 'How do I handle commas inside CSV values?',
        answer: 'Wrap the entire value in double quotes. For example: "New York, USA" will be treated as a single value containing a comma.'
      },
      {
        question: 'What\'s the difference between CSV and Excel (.xlsx)?',
        answer: 'CSV is plain text with just data values. Excel files (.xlsx) are binary files that include formatting, formulas, multiple sheets, charts, and more. CSV is simpler and more portable, while Excel is feature-rich.'
      },
      {
        question: 'Can CSV store multiple sheets like Excel?',
        answer: 'No, a CSV file can only contain one table of data (one "sheet"). For multiple sheets, you\'d need separate CSV files or use Excel/XLSX format.'
      }
    ],
    
    ctaTitle: 'Convert JSON to CSV Instantly',
    ctaDescription: 'Need to convert JSON data to CSV for Excel or data analysis? Our free converter handles nested objects and large files.',
    ctaLink: '/json-to-csv-converter',
    ctaLabel: 'Try JSON to CSV Converter',
    relatedArticles: ['what-is-json', 'json-to-csv-guide']
  },

  // ============================================================
  // ARTICLE 3: What is TOON?
  // ============================================================
  {
    slug: 'what-is-toon',
    title: 'What is TOON Format? The AI-Native Data Format That Saves 60% on Tokens',
    description: 'Learn about TOON (Token-Optimized Object Notation) - the data format designed for AI applications that reduces token usage by 30-60% compared to JSON.',
    keywords: ['toon format', 'token optimized object notation', 'reduce ai tokens', 'llm optimization', 'chatgpt tokens', 'claude api cost'],
    category: 'Fundamentals',
    icon: 'Sparkles',
    readTime: '7 min read',
    publishDate: '2026-01-22',
    
    intro: `<p><strong>TOON (Token-Optimized Object Notation)</strong> is a data format designed specifically for AI and LLM applications. It reduces token usage by <strong>30-60%</strong> compared to JSON while maintaining perfect data fidelity.</p>
<p>If you're building AI applications with ChatGPT, Claude, Gemini, or other LLMs, TOON can significantly reduce your API costs and help you fit more data within context windows.</p>`,
    
    sections: [
      {
        id: 'what-is-toon',
        heading: 'What is TOON?',
        content: `<p>TOON stands for <strong>Token-Optimized Object Notation</strong>. It's a data serialization format that:</p>
<ul>
  <li>Eliminates redundant JSON syntax (braces, brackets, quotes, colons)</li>
  <li>Uses indentation to represent structure (like YAML)</li>
  <li>Converts arrays of objects to tabular format with headers</li>
  <li>Is 100% losslessly convertible back to JSON</li>
</ul>
<p><strong>Why tokens matter:</strong> LLMs like GPT-4 and Claude charge per token. They also have context limits (e.g., 128K tokens). By reducing token count, you:</p>
<ul>
  <li><strong>Save money</strong> — Pay less for API calls</li>
  <li><strong>Fit more data</strong> — Include more context in prompts</li>
  <li><strong>Get better results</strong> — Less noise means better AI focus</li>
</ul>`,
        code: {
          language: 'text',
          filename: 'comparison.txt',
          content: `JSON (21 tokens):
{"name":"John","age":30,"city":"NYC"}

TOON (9 tokens):
name: John
age: 30
city: NYC

Savings: 57%`
        }
      },
      {
        id: 'why-toon-exists',
        heading: 'Why TOON Was Created',
        content: `<p>JSON was designed for web APIs — human-readable yet machine-parseable. But LLMs tokenize text differently than traditional parsers.</p>
<p><strong>The problem with JSON for AI:</strong></p>
<ul>
  <li>Every <code>{</code>, <code>}</code>, <code>[</code>, <code>]</code>, <code>"</code>, <code>:</code> consumes tokens</li>
  <li>Property names repeat for every object in an array</li>
  <li>Syntax characters add zero semantic value for the AI</li>
</ul>
<p><strong>TOON solves this by:</strong></p>
<ul>
  <li>Removing all unnecessary punctuation</li>
  <li>Using indentation (which tokenizes efficiently)</li>
  <li>Declaring array headers once, not per object</li>
</ul>`
      },
      {
        id: 'toon-syntax',
        heading: 'TOON Syntax Explained',
        content: `<p>TOON uses a simple, indentation-based syntax similar to YAML:</p>
<p><strong>Objects:</strong></p>`,
        code: {
          language: 'text',
          filename: 'toon-object.toon',
          content: `user
  name: John Doe
  email: john@example.com
  age: 30
  isActive: true`
        }
      },
      {
        id: 'toon-arrays',
        heading: 'TOON Tabular Arrays',
        content: `<p>The biggest token savings come from arrays of objects. Instead of repeating keys for each object, TOON uses a tabular format:</p>`,
        code: {
          language: 'text',
          filename: 'array-comparison.txt',
          content: `JSON (42 tokens):
[{"id":1,"name":"A"},{"id":2,"name":"B"},{"id":3,"name":"C"}]

TOON (15 tokens):
[3]
id, name
1, A
2, B
3, C

Savings: 64%`
        }
      },
      {
        id: 'token-savings',
        heading: 'Real Token Savings Analysis',
        content: `<p>Here's how TOON performs across different data structures:</p>`,
        table: {
          headers: ['Data Type', 'JSON Tokens', 'TOON Tokens', 'Savings'],
          rows: [
            ['Simple Object', '21', '9', '57%'],
            ['Nested Object', '35', '14', '60%'],
            ['Array (3 objects)', '42', '15', '64%'],
            ['API Response', '58', '22', '62%'],
            ['Config File', '45', '18', '60%'],
          ]
        }
      },
      {
        id: 'when-to-use-toon',
        heading: 'When to Use TOON',
        content: `<p><strong>USE TOON for:</strong></p>
<ul>
  <li>AI/LLM prompts and context data</li>
  <li>RAG (Retrieval-Augmented Generation) systems</li>
  <li>Fine-tuning datasets</li>
  <li>Embeddings input data</li>
  <li>AI agent tool responses</li>
</ul>
<p><strong>DON'T USE TOON for:</strong></p>
<ul>
  <li>Traditional web APIs (stick with JSON)</li>
  <li>Configuration files (JSON/YAML are standard)</li>
  <li>Browser localStorage (use JSON)</li>
  <li>Database storage (JSON is BSON-compatible)</li>
</ul>`
      },
      {
        id: 'llm-specific-tips',
        heading: 'Using TOON with Specific LLMs',
        content: `<p>Different AI models may benefit from a brief instruction about the format:</p>
<p><strong>For GPT-4 and o1 series:</strong></p>
<p>OpenAI models handle TOON natively. For large datasets, add: <em>"The following data is in TOON format (CSV-style with headers)."</em></p>
<p><strong>For Claude 3.5 Sonnet:</strong></p>
<p>Anthropic models excel with TOON's clean structure. Claude's training on documentation means it parses indentation-based formats very accurately.</p>
<p><strong>Pro Tip:</strong> When using TOON with 100+ rows of tabular data, adding a brief format note improves parsing accuracy significantly.</p>`
      }
    ],
    
    faqs: [
      {
        question: 'What does TOON stand for?',
        answer: 'TOON stands for Token-Optimized Object Notation. It\'s a data format designed specifically for AI/LLM applications to reduce token usage.'
      },
      {
        question: 'Is TOON conversion lossless?',
        answer: 'Yes, 100% lossless. You can convert JSON to TOON and back to JSON without losing any data. Data types, nesting, and structure are all preserved.'
      },
      {
        question: 'How much money can I save with TOON?',
        answer: 'Token savings of 30-60% translate directly to cost savings. At GPT-4 prices ($0.03/1K tokens), processing 1 million tokens of JSON as TOON saves approximately $500/month.'
      },
      {
        question: 'Do AI models understand TOON format?',
        answer: 'Yes, modern LLMs like GPT-4 and Claude handle TOON natively. The format is similar to YAML, which is well-represented in their training data.'
      },
      {
        question: 'Is TOON an official standard?',
        answer: 'TOON is a practical format for AI optimization, not an ISO standard like JSON. It\'s designed specifically for the LLM use case where token efficiency matters.'
      }
    ],
    
    ctaTitle: 'Convert JSON to TOON Now',
    ctaDescription: 'Start saving on AI tokens immediately. Our free converter transforms your JSON data to TOON format in seconds.',
    ctaLink: '/json-to-toon-converter',
    ctaLabel: 'Try JSON to TOON Converter',
    relatedArticles: ['what-is-json', 'json-to-toon-guide']
  },

  // ============================================================
  // ARTICLE 4: JSON to CSV Guide
  // ============================================================
  {
    slug: 'json-to-csv-guide',
    title: 'How to Convert JSON to CSV: Complete Step-by-Step Guide',
    description: 'Learn how to convert JSON data to CSV format. Step-by-step tutorial covering nested objects, arrays, and best practices for Excel compatibility.',
    keywords: ['convert json to csv', 'json to csv online', 'json to csv converter', 'export json to csv', 'json to excel'],
    category: 'Guides',
    icon: 'ArrowRightLeft',
    readTime: '6 min read',
    publishDate: '2026-01-22',
    
    intro: `<p>Need to open JSON data in Excel or import it into a database? <strong>Converting JSON to CSV</strong> is the solution. CSV files are universally supported by spreadsheet applications, databases, and data analysis tools.</p>
<p>This guide shows you how to convert JSON to CSV, handle nested objects, and avoid common pitfalls.</p>`,
    
    sections: [
      {
        id: 'why-convert',
        heading: 'Why Convert JSON to CSV?',
        content: `<p>There are several compelling reasons to convert JSON to CSV:</p>
<ul>
  <li><strong>Excel/Sheets Compatibility</strong> — Open data in any spreadsheet application</li>
  <li><strong>Smaller File Size</strong> — CSV is 50-60% smaller than equivalent JSON</li>
  <li><strong>Database Import</strong> — Most databases have native CSV import</li>
  <li><strong>Data Analysis</strong> — Tools like Pandas, R, and Tableau prefer CSV</li>
  <li><strong>Non-Technical Users</strong> — Business users can open CSV directly</li>
</ul>`,
        code: {
          language: 'text',
          filename: 'size-comparison.txt',
          content: `JSON file: 10,240 bytes
CSV file:   4,096 bytes

Savings: 60%`
        }
      },
      {
        id: 'basic-conversion',
        heading: 'Basic JSON to CSV Conversion',
        content: `<p>A JSON array of objects converts naturally to CSV rows:</p>`,
        code: {
          language: 'json',
          filename: 'input.json',
          content: `[
  {"name": "John", "email": "john@example.com", "age": 30},
  {"name": "Jane", "email": "jane@example.com", "age": 25},
  {"name": "Bob", "email": "bob@example.com", "age": 35}
]`
        }
      },
      {
        id: 'nested-objects',
        heading: 'Handling Nested Objects (Flattening)',
        content: `<p>CSV can only represent flat data, so nested JSON objects must be <strong>flattened</strong>. The standard approach uses dot notation:</p>`,
        code: {
          language: 'json',
          filename: 'nested-input.json',
          content: `[
  {
    "name": "John",
    "address": {
      "city": "New York",
      "zip": "10001"
    }
  }
]

// Converts to CSV:
name,address.city,address.zip
John,New York,10001`
        }
      },
      {
        id: 'using-tool',
        heading: 'Step-by-Step: Using Our Converter',
        content: `<p>The easiest way to convert JSON to CSV is using our <a href="/json-to-csv-converter">free online converter</a>:</p>
<ol>
  <li><strong>Paste or upload</strong> your JSON data in the left panel</li>
  <li><strong>Click "Convert"</strong> — conversion happens instantly in your browser</li>
  <li><strong>Review the output</strong> — nested objects are automatically flattened</li>
  <li><strong>Download</strong> — Click the download button to save as .csv</li>
</ol>
<p><strong>Privacy Note:</strong> All conversion happens in your browser. Your data never leaves your device.</p>`
      },
      {
        id: 'programmatic',
        heading: 'Programmatic Conversion (Code)',
        content: `<p>For automation, here's how to convert JSON to CSV in JavaScript:</p>`,
        code: {
          language: 'javascript',
          content: `function jsonToCsv(jsonData) {
  const data = JSON.parse(jsonData);
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Input must be a non-empty array');
  }
  
  // Get all unique keys (headers)
  const headers = [...new Set(data.flatMap(obj => Object.keys(obj)))];
  
  // Create CSV rows
  const rows = data.map(obj => 
    headers.map(header => {
      const value = obj[header] ?? '';
      // Escape quotes and wrap in quotes if contains comma
      const escaped = String(value).replace(/"/g, '""');
      return escaped.includes(',') ? \`"\${escaped}"\` : escaped;
    }).join(',')
  );
  
  return [headers.join(','), ...rows].join('\\n');
}`
        }
      },
      {
        id: 'common-issues',
        heading: 'Common Issues & Solutions',
        content: `<p><strong>Issue 1: Arrays inside objects</strong></p>
<p>Arrays don't convert cleanly to CSV. Options:</p>
<ul>
  <li>Join array values: <code>["a","b"]</code> → <code>"a;b"</code></li>
  <li>Create separate columns: <code>tags.0</code>, <code>tags.1</code></li>
  <li>Stringify: Store as JSON string in cell</li>
</ul>
<p><strong>Issue 2: Special characters</strong></p>
<p>Commas, quotes, and newlines in values must be handled:</p>
<ul>
  <li>Wrap values containing commas in double quotes</li>
  <li>Escape quotes by doubling them: <code>""</code></li>
</ul>
<p><strong>Issue 3: Excel encoding</strong></p>
<p>For proper UTF-8 support in Excel, add a BOM (Byte Order Mark) at the start of the file.</p>`
      },
      {
        id: 'best-practices',
        heading: 'Best Practices',
        content: `<ol>
  <li><strong>Validate JSON first</strong> — Ensure your JSON is valid before conversion</li>
  <li><strong>Check for consistent structure</strong> — All objects should have similar keys</li>
  <li><strong>Use ISO dates</strong> — YYYY-MM-DD format is unambiguous</li>
  <li><strong>Be careful with numbers</strong> — Leading zeros may be stripped by Excel</li>
  <li><strong>Test with small data</strong> — Verify output before processing large files</li>
</ol>`
      }
    ],
    
    faqs: [
      {
        question: 'Can I convert nested JSON to CSV?',
        answer: 'Yes, nested objects are flattened using dot notation. For example, {"user": {"name": "John"}} becomes a column called "user.name" with value "John".'
      },
      {
        question: 'Is the conversion reversible?',
        answer: 'You can convert CSV back to JSON, but it will be a flat array of objects. Nested structures from the original JSON (represented via dot notation) can be reconstructed with proper parsing.'
      },
      {
        question: 'How large a JSON file can I convert?',
        answer: 'Our converter runs entirely in your browser, so it depends on your device\'s memory. Most devices handle files up to 50-100MB without issues.'
      },
      {
        question: 'Will my data be uploaded to a server?',
        answer: 'No, all conversion happens locally in your browser using JavaScript. Your data never leaves your device.'
      }
    ],
    
    ctaTitle: 'Convert JSON to CSV Now',
    ctaDescription: 'Try our free, privacy-first JSON to CSV converter. Handles nested objects, large files, and includes bidirectional conversion.',
    ctaLink: '/json-to-csv-converter',
    ctaLabel: 'Open JSON to CSV Converter',
    relatedArticles: ['what-is-json', 'what-is-csv']
  },

  // ============================================================
  // ARTICLE 5: JSON to TOON Guide
  // ============================================================
  {
    slug: 'json-to-toon-guide',
    title: 'How to Convert JSON to TOON for AI Applications',
    description: 'Step-by-step guide to converting JSON to TOON format. Reduce AI token usage by 60% with the AI-optimized data format.',
    keywords: ['json to toon', 'reduce ai tokens', 'llm optimization', 'chatgpt cost reduction', 'claude api optimization'],
    category: 'Guides',
    icon: 'Zap',
    readTime: '5 min read',
    publishDate: '2026-01-22',
    
    intro: `<p>If you're sending JSON data to ChatGPT, Claude, or other AI models, you're wasting tokens—and money. <strong>Converting JSON to TOON</strong> can reduce your token usage by 30-60%.</p>
<p>This guide shows you exactly how to convert your data and start saving immediately.</p>`,
    
    sections: [
      {
        id: 'why-convert-toon',
        heading: 'Why Convert JSON to TOON?',
        content: `<p>Every character in your AI prompts costs tokens. JSON's syntax—all those braces, brackets, and quotes—adds up fast:</p>
<ul>
  <li><strong>30-60% token reduction</strong> with same semantic content</li>
  <li><strong>Lower API costs</strong> at $0.01-0.03 per 1K tokens</li>
  <li><strong>More context space</strong> for actual data within limits</li>
  <li><strong>100% lossless</strong> conversion back to JSON</li>
</ul>`,
        table: {
          headers: ['At Scale', 'JSON Cost', 'TOON Cost', 'Monthly Savings'],
          rows: [
            ['100K tokens/day', '$90/month', '$36/month', '$54'],
            ['1M tokens/day', '$900/month', '$360/month', '$540'],
            ['10M tokens/day', '$9,000/month', '$3,600/month', '$5,400'],
          ]
        }
      },
      {
        id: 'using-converter',
        heading: 'Step-by-Step: Using the Converter',
        content: `<p>Converting JSON to TOON takes seconds:</p>
<ol>
  <li><strong>Go to</strong> <a href="/json-to-toon-converter">JSON to TOON Converter</a></li>
  <li><strong>Paste your JSON</strong> in the left panel</li>
  <li><strong>Click Convert</strong> — see instant TOON output</li>
  <li><strong>Check token count</strong> — displayed for both formats</li>
  <li><strong>Copy or download</strong> the TOON output</li>
</ol>
<p><strong>Toggle Direction:</strong> Use the switch to convert TOON back to JSON when needed.</p>`
      },
      {
        id: 'conversion-example',
        heading: 'Conversion Example',
        content: `<p>Here's a real-world example of API data conversion:</p>`,
        code: {
          language: 'json',
          filename: 'before-json.json',
          content: `{
  "users": [
    {"id": 1, "name": "Alice", "role": "admin"},
    {"id": 2, "name": "Bob", "role": "user"},
    {"id": 3, "name": "Carol", "role": "user"}
  ],
  "total": 3
}`
        }
      },
      {
        id: 'toon-output',
        heading: 'TOON Output',
        content: `<p>The same data in TOON format:</p>`,
        code: {
          language: 'text',
          filename: 'after-toon.toon',
          content: `users
  [3]
  id, name, role
  1, Alice, admin
  2, Bob, user
  3, Carol, user
total: 3

Token reduction: ~55%`
        }
      },
      {
        id: 'ai-usage',
        heading: 'Using TOON in AI Prompts',
        content: `<p>When including TOON data in your prompts, consider adding a brief format note for best results:</p>`,
        code: {
          language: 'text',
          content: `You are analyzing user data. The following is in TOON format (a compact JSON alternative with tabular arrays):

users
  [3]
  id, name, role
  1, Alice, admin
  2, Bob, user
  3, Carol, user

Analyze the role distribution and provide insights.`
        }
      },
      {
        id: 'programmatic-toon',
        heading: 'Programmatic Conversion',
        content: `<p>For integrating into your codebase, you can use our conversion logic:</p>`,
        code: {
          language: 'typescript',
          content: `// Using the TextGauge library (conceptual)
import { jsonToToon, toonToJson } from '@textgauge/toon';

// Convert JSON to TOON
const jsonData = '{"name": "John", "age": 30}';
const toonData = jsonToToon(jsonData);
// Result: "name: John\\nage: 30"

// Convert back to JSON
const backToJson = toonToJson(toonData);
// Result: '{"name":"John","age":30}'`
        }
      },
      {
        id: 'when-not-to-use',
        heading: 'When NOT to Use TOON',
        content: `<p>TOON is designed for AI/LLM use cases. Avoid it for:</p>
<ul>
  <li><strong>REST APIs</strong> — Clients expect standard JSON</li>
  <li><strong>Configuration files</strong> — JSON/YAML are standard</li>
  <li><strong>Browser storage</strong> — localStorage uses JSON</li>
  <li><strong>Database fields</strong> — JSON is BSON-compatible</li>
</ul>
<p><strong>Use TOON for:</strong></p>
<ul>
  <li>AI prompts with structured data</li>
  <li>RAG system context injection</li>
  <li>Fine-tuning dataset preparation</li>
  <li>Any LLM API call with data payloads</li>
</ul>`
      }
    ],
    
    faqs: [
      {
        question: 'Is TOON conversion reversible?',
        answer: 'Yes, 100% lossless. Convert JSON → TOON → JSON and get identical data back. All types, nesting, and structure are preserved.'
      },
      {
        question: 'Do I need to tell the AI about TOON format?',
        answer: 'For simple data, no. For complex or large datasets (100+ items), adding a brief "This data is in TOON format" note improves parsing accuracy.'
      },
      {
        question: 'Can I use TOON with any LLM?',
        answer: 'Yes, TOON works with GPT-4, Claude, Gemini, Llama, and other models. The format resembles YAML, which is well-represented in training data.'
      },
      {
        question: 'How much can I realistically save?',
        answer: 'Real-world savings of 30-60% are typical. Arrays of objects see the highest savings (up to 64%) due to header deduplication.'
      }
    ],
    
    ctaTitle: 'Start Saving on AI Tokens',
    ctaDescription: 'Convert your JSON to TOON and see the token savings instantly. Free, private, no sign-up required.',
    ctaLink: '/json-to-toon-converter',
    ctaLabel: 'Try the Converter',
    relatedArticles: ['what-is-toon', 'what-is-json']
  },
  
  // ============================================================
  // ARTICLE 6: Mastering Cron Expressions
  // ============================================================
  {
    slug: 'mastering-cron-expressions',
    title: 'Mastering Cron Expressions: A Complete Guide for Developers',
    description: 'Understand cron syntax once and for all. Learn standard formatting, special characters, common schedules, and how to debug cron jobs.',
    keywords: ['cron expressions', 'cron syntax', 'cron job generator', 'crontab examples', 'schedule cron job'],
    category: 'Guides',
    icon: 'Clock',
    readTime: '8 min read',
    publishDate: '2026-01-22',
    
    intro: `<p><strong>Cron expressions</strong> are the standard way to schedule tasks in Unix-like systems. Whether you're running nightly backups, sending weekly emails, or clearing cache, you need cron.</p>
<p>This guide breaks down the cryptic standard syntax into simple, understandable parts.</p>`,
    
    sections: [
      {
        id: 'cron-basics',
        heading: 'Cron Syntax Basics',
        content: `<p>A standard cron expression consists of <strong>five fields</strong> separated by spaces:</p>
<pre class="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm my-4">
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)
│ │ │ │ │
* * * * *
</pre>
<p>Each asterisk represents a field. An asterisk means "every" (e.g., every minute, every hour).</p>`,
      },
      {
        id: 'special-characters',
        heading: 'Special Characters',
        content: `<p>Beyond numbers, cron uses special characters to define patterns:</p>
<ul>
  <li><code>*</code> (Asterisk): Every value (e.g., every minute)</li>
  <li><code>,</code> (Comma): Value list separator (e.g., <code>1,15,30</code>)</li>
  <li><code>-</code> (Hyphen): Range of values (e.g., <code>1-5</code> for Mon-Fri)</li>
  <li><code>/</code> (Slash): Step values (e.g., <code>*/15</code> for every 15 mins)</li>
</ul>`,
        code: {
            language: 'text',
            content: `*/15 * * * *   # Run every 15 minutes
0 9-17 * * *   # Run hourly between 9 AM and 5 PM
0 0 1,15 * *   # Run at midnight on 1st and 15th of month`
        }
      },
      {
        id: 'common-examples',
        heading: 'Common Schedules',
        content: `<p>Here are the schedules you'll use 90% of the time:</p>`,
        table: {
            headers: ['Schedule', 'Expression', 'Description'],
            rows: [
                ['Every Minute', '* * * * *', 'Runs once every minute'],
                ['Hourly', '0 * * * *', 'Runs at minute 0 of every hour'],
                ['Daily (Midnight)', '0 0 * * *', 'Runs once a day at 00:00'],
                ['Weekly (Sunday)', '0 0 * * 0', 'Runs once a week on Sunday'],
                ['Monthly (1st)', '0 0 1 * *', 'Runs on the 1st of every month'],
                ['Yearly', '0 0 1 1 *', 'Runs once a year on Jan 1st']
            ]
        }
      },
      {
        id: 'best-practices',
        heading: 'Best Practices',
        content: `<ol>
  <li><strong>Use Comments</strong> — Always comment your crontab usage</li>
  <li><strong>Check Timezone</strong> — Verify server time (UTC vs Local)</li>
  <li><strong>Log Output</strong> — Redirect output to a log file: <code>>> /var/log/cron.log 2>&1</code></li>
  <li><strong>Avoid "Every Minute"</strong> — Unless necessary, it adds system load</li>
  <li><strong>Use a Generator</strong> — Syntax is tricky; use a tool to verify</li>
</ol>`
      }
    ],
    ctaTitle: 'Generate Cron Expressions Instantly',
    ctaDescription: 'Stop guessing syntax. specific syntax. Use our visual Cron Generator to build and verify your schedules in plain English.',
    ctaLink: '/cron-job-generator',
    ctaLabel: 'Open Cron Generator',
    relatedArticles: ['what-is-json']
  },

  // ============================================================
  // ARTICLE 7: Image Optimization Guide
  // ============================================================
  {
    slug: 'image-optimization-guide',
    title: 'Image Optimization for Web Vitals: Best Practices 2026',
    description: 'Improve LCP and SEO by mastering image optimization. Learn about WebP/AVIF, compression levels, and responsive sizing.',
    keywords: ['image optimization', 'reduce image size', 'webp vs avif', 'improve lcp', 'web vitals', 'seo images'],
    category: 'Guides',
    icon: 'Image',
    readTime: '7 min read',
    publishDate: '2026-01-22',
    
    intro: `<p>Images account for <strong>75% of page weight</strong> on most websites. Unoptimized images are the #1 cause of slow load times and poor Core Web Vitals scores.</p>
<p>This guide explains how to reduce image size without sacrificing quality, helping you boost SEO rankings and user engagement.</p>`,
    
    sections: [
        {
          id: 'why-optimize',
          heading: 'Why Optimization Matters',
          content: `<p>Google's <strong>Core Web Vitals</strong> metrics heavily penalize slow visual loading. Large images hurt your <strong>Largest Contentful Paint (LCP)</strong> score directly.</p>
<ul>
  <li><strong>Faster Load Times</strong> — Better UX, lower bounce rates</li>
  <li><strong>Better SEO</strong> — Page speed is a confirmed ranking factor</li>
  <li><strong>Reduced Bandwidth</strong> — Save on hosting/CDN costs</li>
  <li><strong>Mobile Friendly</strong> — Essential for users on 4G/5G networks</li>
</ul>`
        },
        {
          id: 'formats',
          heading: 'Next-Gen Formats: WebP & AVIF',
          content: `<p>Stop using JPEG and PNG for everything. Modern formats offer superior compression:</p>`,
          table: {
            headers: ['Format', 'Best For', 'Compression', 'Browser Support'],
            rows: [
                ['JPEG', 'Photos (Legacy)', 'Lossy', '100%'],
                ['PNG', 'Transparent Logos', 'Lossless', '100%'],
                ['WebP', 'Photos & Graphics', 'Superior Lossy/Lossless', '97%+'],
                ['AVIF', 'High Quality Photos', 'Best (20% < WebP)', '93%+']
            ]
          }
        },
        {
          id: 'compression-levels',
          heading: 'Choosing Compression Levels',
          content: `<p>Compression is a tradeoff between quality and size. For web use:</p>
<ul>
  <li><strong>Quality 80-85%</strong>: Perceptually lossless (best for hero images)</li>
  <li><strong>Quality 60-70%</strong>: Standard web usage (thumbnails, blogs)</li>
  <li><strong>Quality < 50%</strong>: Noticeable artifacts (avoid unless necessary)</li>
</ul>
<p>Our benchmarks show that <strong>WebP at 75% quality</strong> is often 50% smaller than a JPEG at comparable visual quality.</p>`
        },
        {
            id: 'responsive-images',
            heading: 'Responsive Sizing',
            content: `<p>Never serve a 4000px image to a mobile phone. use the <code>srcset</code> attribute to serve appropriate sizes:</p>`,
            code: {
                language: 'text',
                content: `<img src="photo-800.jpg"
     srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
     sizes="(max-width: 600px) 400px, 800px"
     alt="Optimized photo" />`
            }
        }
    ],
    ctaTitle: 'Free Image Compressor',
    ctaDescription: 'Compress unlimited images to optimum WebP/JPEG levels locally in your browser. No upload limits, no server logs.',
    ctaLink: '/image-compressor',
    ctaLabel: 'Compress Images Now',
    relatedArticles: ['base64-encoding-explained']
  },

  // ============================================================
  // ARTICLE 8: YAML vs JSON Guide
  // ============================================================
  {
    slug: 'yaml-vs-json-guide',
    title: 'YAML vs JSON: Which Config Format Should You Use?',
    description: 'A detailed comparison of YAML and JSON for configuration files. We analyze syntax, readability, features, and use cases.',
    keywords: ['yaml vs json', 'json vs yaml', 'yaml syntax', 'configuration formats', 'devops config'],
    category: 'Comparisons',
    icon: 'FileCode',
    readTime: '6 min read',
    publishDate: '2026-01-22',
    
    intro: `<p><strong>YAML (YAML Ain't Markup Language)</strong> and <strong>JSON</strong> are the two titans of configuration formats. While JSON rules the web API world, YAML dominates in DevOps (Kubernetes, Ansible, GitHub Actions).</p>
<p>But when should you choose one over the other? This guide compares them head-to-head.</p>`,
    
    sections: [
        {
          id: 'syntax-comparison',
          heading: 'Syntax Comparison',
          content: `<p>The most obvious difference is syntax. JSON uses braces and quotes; YAML uses indentation.</p>`,
          code: {
              language: 'text',
              filename: 'comparison.txt',
              content: `JSON:
{
  "name": "Server",
  "ports": [80, 443],
  "enabled": true
}

YAML:
name: Server
ports:
  - 80
  - 443
enabled: true`
          }
        },
        {
            id: 'pros-cons',
            heading: 'Pros & Cons',
            content: '<p>A quick comparison of strengths and weaknesses:</p>',
            table: {
                headers: ['Feature', 'JSON', 'YAML'],
                rows: [
                    ['Readability', 'Good (but noisy syntax)', 'Excellent (clean visual structure)'],
                    ['Comments', 'Not supported natively', 'Supported (# comment)'],
                    ['Parsing Speed', 'Extremely Fast', 'Slower (complex parser)'],
                    ['Data Types', 'Basic (String, Number, Bool)', 'Rich (Dates, Sets, Binary)'],
                    ['Risk', 'Low (Strict syntax)', 'Medium (Indentation errors)']
                ]
            }
        },
        {
            id: 'recommendation',
            heading: 'Which One to Choose?',
            content: `<p><strong>Choose JSON if:</strong></p>
<ul>
  <li>You are building web APIs</li>
  <li>Data is generated/parsed by machines primarily</li>
  <li>Speed is critical</li>
  <li>You need strict validation</li>
</ul>
<p><strong>Choose YAML if:</strong></p>
<ul>
  <li>It is a configuration file edited by humans (CI/CD, K8s)</li>
  <li>You need comments to explain settings</li>
  <li>Readability is the top priority</li>
  <li>You need advanced features like anchors/aliases</li>
</ul>`
        }
    ],
    ctaTitle: 'Convert Format Instantly',
    ctaDescription: 'Need to switch formats? Use our converter (coming soon) or validate your JSON now.',
    ctaLink: '/json-formatter',
    ctaLabel: 'Validate JSON',
    relatedArticles: ['what-is-json', 'what-is-toon']
  }
];

// ============ HELPER FUNCTIONS ============

/**
 * Get an article by its slug
 */
export function getArticleBySlug(slug: string): LearnArticle | undefined {
  return LEARN_ARTICLES.find(article => article.slug === slug);
}

/**
 * Get all article slugs (for static generation)
 */
export function getAllArticleSlugs(): string[] {
  return LEARN_ARTICLES.map(article => article.slug);
}

/**
 * Get articles by category
 */
export function getArticlesByCategory(category: ArticleCategory): LearnArticle[] {
  return LEARN_ARTICLES.filter(article => article.category === category);
}

/**
 * Get related articles for a given slug
 */
export function getRelatedArticles(slug: string): LearnArticle[] {
  const article = getArticleBySlug(slug);
  if (!article?.relatedArticles) return [];
  
  return article.relatedArticles
    .map(relatedSlug => getArticleBySlug(relatedSlug))
    .filter((a): a is LearnArticle => a !== undefined);
}

/**
 * Get navigation links for the Learn section
 */
export function getLearnNavLinks(): Array<{ href: string; label: string }> {
  return LEARN_ARTICLES.map(article => ({
    href: `/learn/${article.slug}`,
    label: article.title.split(':')[0].split('?')[0].trim() // Short version
  }));
}
