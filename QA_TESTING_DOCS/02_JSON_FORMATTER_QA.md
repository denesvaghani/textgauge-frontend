# QA Testing Document: JSON Formatter

**Tool URL:** `/json-formatter`
**Component:** `json-formatter/page.tsx`, `Formatter.tsx`, `SimpleCodeEditor.tsx`
**Priority:** Critical
**Last Updated:** 2025-12-30

---

## 1. INPUT TESTING - 10 Critical Test Cases

### I1. Valid JSON Parsing
**Test:** Paste valid JSON: `{"name": "John", "age": 30}`
**Expected:**
- Syntax highlighting applied (keys blue, strings green, numbers orange)
- No errors shown
- Ready to beautify/minify
**Bug Risk:** Highlighting not applied, valid JSON marked as error

### I2. Invalid JSON Error Display
**Test:** Paste invalid JSON: `{"name": "John", age: 30}` (missing quotes on key)
**Expected:**
- Clear error message indicating line/position of error
- Red error banner visible
- Error message human-readable
**Bug Risk:** Cryptic error message, no error shown

### I3. Large JSON File (10+ MB)
**Test:** Paste or upload JSON file > 10MB (API response, logs)
**Expected:**
- Editor handles without crashing
- Warning if performance may be affected
- Beautify completes (may take time)
**Bug Risk:** Browser tab crash, infinite loading

### I4. Nested JSON (10+ Levels Deep)
**Test:** Paste deeply nested JSON structure
```json
{"a":{"b":{"c":{"d":{"e":{"f":{"g":{"h":{"i":{"j":"deep"}}}}}}}}}}
```
**Expected:**
- Beautify indents all levels correctly
- All levels visible with scroll
- Minify restores to single line
**Bug Risk:** Indentation breaks after certain depth

### I5. JSON with Special Characters
**Test:** Paste JSON containing:
- Unicode: `{"emoji": "🎉", "chinese": "你好"}`
- Escaped chars: `{"path": "C:\\Users\\name"}`
- HTML entities: `{"html": "<div>test</div>"}`
**Expected:**
- All characters preserved exactly
- Escaped characters remain escaped
- HTML not rendered (displayed as text)
**Bug Risk:** Character corruption, XSS vulnerability

### I6. File Upload (.json)
**Test:** Upload a .json file using the Upload button
**Expected:**
- File content loaded into input editor
- File size shown in status bar
- Syntax highlighting applied
**Bug Risk:** Upload fails silently, wrong encoding

### I7. URL Loading (Fetch JSON)
**Test:** Load from URL button → Enter a JSON API endpoint
**Expected:**
- JSON fetched and loaded into input
- Error if CORS blocked or 404
- Loading indicator during fetch
**Bug Risk:** No CORS handling, silent failure

### I8. Empty Input Handling
**Test:** Click Beautify with empty input
**Expected:**
- No action taken (no error)
- Output remains empty
- No console errors
**Bug Risk:** Errors thrown for empty string parsing

### I9. JSON Arrays
**Test:** Paste JSON array: `[1, 2, 3, {"a": 1}]`
**Expected:**
- Array recognized and beautified
- Mixed array items (primitives + objects) handled
- Line count accurate
**Bug Risk:** Arrays not recognized as valid JSON

### I10. Comments in JSON (Invalid but Common)
**Test:** Paste JSON with comments:
```json
{
  // This is a comment
  "name": "John"
}
```
**Expected:**
- Error message clearly stating JSON doesn't support comments
- Suggest removing comments
**Bug Risk:** Unclear why parsing fails

---

## 2. OUTPUT TESTING - 10 Critical Test Cases

### O1. Beautify with Default 2-Space Indent
**Test:** Beautify compact JSON with default settings
**Expected:**
- 2 spaces per indentation level
- Each key on new line
- Proper spacing after colons
**Bug Risk:** Wrong indent size, inconsistent formatting

### O2. Beautify with 4-Space Indent
**Test:** Change indentation to 4 spaces → Beautify
**Expected:**
- 4 spaces per level applied
- Setting persists for session
**Bug Risk:** Setting not applied, reverts to default

### O3. Minify Output
**Test:** Beautify JSON first, then click Minify
**Expected:**
- All whitespace removed
- Valid single-line JSON
- File size reduced significantly
**Bug Risk:** Invalid JSON after minify, data loss

### O4. Copy Output Button
**Test:** After beautifying, click Copy in output editor
**Expected:**
- Formatted JSON copied to clipboard
- "Copied!" feedback shown
- Clipboard contains exact output
**Bug Risk:** Copy fails silently, copies input instead

### O5. Download Output
**Test:** Click Download button on output
**Expected:**
- Downloads as `formatted.json`
- File contains beautified output
- UTF-8 encoding preserved
**Bug Risk:** Wrong filename, binary encoding

### O6. Swap Button (Output → Input)
**Test:** Beautify JSON, then click Swap button
**Expected:**
- Output becomes new input
- Output cleared
- Can re-transform the swapped content
**Bug Risk:** Data lost during swap, both cleared

### O7. Statistics Accuracy (Lines, Characters, KB)
**Test:** Beautify JSON and verify output stats
**Expected:**
- Line count matches actual lines
- Character count exact
- KB size accurate
**Bug Risk:** Stats not updating, off-by-one errors

### O8. Output Syntax Highlighting
**Test:** Check highlighted output after beautify
**Expected:**
- Same highlighting as input (blue keys, green strings, etc.)
- Highlighting matches new formatted structure
- Read-only (no cursor in output)
**Bug Risk:** No highlighting on output, cursor appearing

### O9. Error Recovery
**Test:** 
1. Paste invalid JSON → Get error
2. Fix the JSON → Beautify again
**Expected:**
- Error clears once JSON is valid
- Successful beautify after fix
**Bug Risk:** Error state stuck, requires page refresh

### O10. Preservation of Data Types
**Test:** Beautify JSON with various types:
```json
{"str": "hello", "num": 42, "float": 3.14, "bool": true, "null": null}
```
**Expected:**
- Strings remain quoted
- Numbers unquoted
- Booleans lowercase (true/false)
- null lowercase
**Bug Risk:** Type coercion, quotes around numbers

---

## 3. SEO & ACCESSIBILITY TESTING - 10 Critical Test Cases

### S1. Page Title and Meta Description
**Test:** Inspect `<title>` and `<meta name="description">`
**Expected:**
- Title: "JSON Formatter - Beautify & Minify JSON | TextGauge"
- Description: 150-160 chars with keywords "JSON formatter", "beautify", "minify"
**Bug Risk:** Missing or generic title

### S2. H1 Heading
**Test:** Check for single H1: "JSON Formatter"
**Expected:**
- Exactly one H1 on page
- Contains primary keyword
**Bug Risk:** Multiple H1s, missing H1

### S3. Semantic HTML Structure
**Test:** Inspect page for proper semantic elements
**Expected:**
- `<header>`, `<main>`, `<section>`, `<footer>` used appropriately
- Content sections have headings
**Bug Risk:** All divs, no semantic meaning

### S4. Keyboard Accessibility
**Test:** Tab through all interactive elements
**Expected:**
- All buttons, inputs focusable
- Logical tab order
- Editor textarea focusable
**Bug Risk:** Focus trap, elements unreachable

### S5. Screen Reader Announcements
**Test:** Use VoiceOver/NVDA on page
**Expected:**
- Buttons announce their purpose
- Error messages announced
- Form labels read correctly
**Bug Risk:** Unlabeled buttons, silent errors

### S6. Related Tools Links
**Test:** Check links to YAML Formatter, Diff Checker, etc.
**Expected:**
- All links working (no 404s)
- Open in same tab
- Descriptive link text
**Bug Risk:** Broken links, "click here" text

### S7. Schema Markup
**Test:** Check for SoftwareApplication or WebApplication schema
**Expected:**
- Structured data for tool
- FAQ schema if FAQs present
- Valid JSON-LD
**Bug Risk:** No schema, invalid markup

### S8. Open Graph Tags
**Test:** Share URL on social media or use OG debugger
**Expected:**
- og:title, og:description, og:image present
- Image appropriate for JSON tool
**Bug Risk:** Missing OG tags, wrong image

### S9. Mobile Responsiveness
**Test:** View on various mobile devices (iPhone SE, Galaxy S8, etc.)
**Expected:**
- Editors stack vertically on mobile
- Controls accessible
- No horizontal scroll
**Bug Risk:** Broken layout, overflowing content

### S10. Page Load Performance
**Test:** Lighthouse performance audit
**Expected:**
- First Contentful Paint < 1.5s
- No render-blocking resources
- Images optimized
**Bug Risk:** Heavy JS bundle, slow initial load

---

## 4. FEATURE-SPECIFIC TESTING - 10 Critical Test Cases

### F1. Cmd/Ctrl+Enter Keyboard Shortcut
**Test:** Paste JSON, press Cmd+Enter (Mac) or Ctrl+Enter (Windows)
**Expected:**
- Beautify action triggered
- Same result as clicking Beautify button
**Bug Risk:** Shortcut not working, wrong action

### F2. Search (Cmd/Ctrl+F) in Input
**Test:** Press Cmd+F in input editor, search for key name
**Expected:**
- Find bar appears
- Matches highlighted in yellow
- Match count shown
**Bug Risk:** Browser's find activated instead, no highlighting

### F3. Replace Functionality
**Test:** Find "name", replace with "fullName"
**Expected:**
- Single replace works
- Replace All works
- JSON remains valid after replace
**Bug Risk:** Breaks JSON structure, partial replace

### F4. Search Options (Case Sensitive, Regex, Whole Word)
**Test:** 
1. Search "name" case-sensitive (should not match "Name")
2. Search "\\d+" regex (should match numbers)
3. Search "name" whole word (should not match "names")
**Expected:** All options work correctly
**Bug Risk:** Options ignored, regex errors

### F5. Tab Size Selector
**Test:** Change tab size dropdown (2, 3, 4, 8 spaces)
**Expected:**
- Next beautify uses selected size
- Dropdown shows current selection
**Bug Risk:** Selection not persisting, wrong indent

### F6. Load Sample Button
**Test:** Click "Load Sample" link
**Expected:**
- Sample JSON loaded into input
- Ready to beautify
- Sample is valid and educational
**Bug Risk:** No sample provided, broken sample

### F7. URL Loader Modal
**Test:** Click Globe icon → URL Loader modal opens
**Expected:**
- Modal with URL input field
- Load button fetches URL
- Error handling for bad URLs
**Bug Risk:** Modal not closing, fetch errors unhandled

### F8. Auto-save to LocalStorage
**Test:** 
1. Type JSON, refresh page
2. Content should persist
**Expected:**
- Input restored from localStorage
- "Saved" indicator accurate
**Bug Risk:** Data lost on refresh, stale data loaded

### F9. Clear Button Behavior
**Test:** Click Clear (trash icon)
**Expected:**
- Input cleared
- Output cleared
- Error cleared
- localStorage cleared for this tool
**Bug Risk:** Partial clear, localStorage not cleared

### F10. Syntax Highlighting Scroll Sync
**Test:** In a long JSON file, scroll down in textarea
**Expected:**
- Highlighted overlay scrolls in sync
- Line numbers scroll in sync
- No visible desync
**Bug Risk:** Overlay drifts out of sync, choppy scrolling

---

## Summary

| Category | Test Cases | Priority |
|----------|------------|----------|
| Input | 10 | High |
| Output | 10 | High |
| SEO/Accessibility | 10 | Critical |
| Feature-Specific | 10 | Medium |
| **Total** | **40** | - |

**Recommended Testing Order:**
1. Input tests (core parsing functionality)
2. Output tests (formatting correctness)
3. Feature-specific (editor features)
4. SEO/Accessibility (user reach and compliance)
