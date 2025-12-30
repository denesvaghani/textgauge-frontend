# QA Testing Document: JSON to TOON Converter

**Tool URL:** `/json-to-toon-converter`
**Component:** `json-to-toon-converter/JsonToonClient.tsx`, `Formatter.tsx`
**Priority:** Medium-High
**Last Updated:** 2025-12-30

---

## 1. INPUT TESTING - 10 Critical Test Cases

### I1. Simple JSON Array Conversion
**Test:** Paste flat JSON array:
```json
[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]
```
**Expected:**
- TOON output with [2] header
- Field names as header row
- Values as data rows
**Bug Risk:** Incorrect TOON format

### I2. Single JSON Object
**Test:** Paste single object:
```json
{"name": "John", "email": "john@test.com"}
```
**Expected:**
- Converts to TOON with [1] or key: value format
**Bug Risk:** Wrong handling of non-array

### I3. Nested JSON Objects
**Test:** Paste nested JSON:
```json
[{"user": {"name": "John", "email": "john@test.com"}}]
```
**Expected:**
- Nested structure represented in TOON
- Indentation or notation for depth
**Bug Risk:** Nested objects lost

### I4. JSON with Arrays
**Test:** Paste JSON with array values:
```json
{"tags": ["ai", "ml", "nlp"]}
```
**Expected:**
- Arrays converted to TOON list format
**Bug Risk:** Arrays corrupted

### I5. Large JSON (Token Reduction Test)
**Test:** Paste large JSON, compare token counts
**Expected:**
- TOON significantly smaller
- 30-60% reduction as claimed
**Bug Risk:** No actual reduction

### I6. Unicode Content
**Test:** Paste JSON with unicode:
```json
[{"name": "日本語", "emoji": "🎉"}]
```
**Expected:**
- Unicode preserved
- No encoding issues
**Bug Risk:** Character corruption

### I7. Empty JSON Array
**Test:** Paste empty: `[]`
**Expected:**
- Empty TOON or appropriate message
- No error
**Bug Risk:** Error thrown

### I8. Complex Nested Structures
**Test:** Paste deeply nested JSON (5+ levels)
**Expected:**
- All levels represented
- Structure clear in TOON
**Bug Risk:** Deep nesting fails

### I9. Null and Boolean Values
**Test:** Paste JSON with special values:
```json
[{"active": true, "deleted": false, "data": null}]
```
**Expected:**
- true/false in TOON output
- null represented appropriately
**Bug Risk:** Type coercion issues

### I10. TOON Input (Reverse Direction)
**Test:** Toggle to TOON→JSON, paste TOON:
```
[2]
name, email
John, john@test.com
Jane, jane@test.com
```
**Expected:**
- Converts back to JSON array
- Proper structure restored
**Bug Risk:** Parse failure

---

## 2. OUTPUT TESTING - 10 Critical Test Cases

### O1. TOON Format Correctness
**Test:** Verify TOON output format
**Expected:**
- [N] array count header
- Column names on second line
- Data rows following
**Bug Risk:** Malformed TOON

### O2. Token Count Reduction
**Test:** Compare input JSON tokens vs output TOON
**Expected:**
- Measurable reduction
- Matches claimed 30-60%
**Bug Risk:** No reduction or increase

### O3. Lossless Conversion
**Test:** JSON→TOON→JSON round-trip
**Expected:**
- Original JSON reconstructable
- No data loss
**Bug Risk:** Data loss on conversion

### O4. Copy TOON Output
**Test:** Copy TOON to clipboard
**Expected:**
- TOON format preserved
- Ready to paste in AI prompts
**Bug Risk:** Copy fails

### O5. Download TOON
**Test:** Download output
**Expected:**
- Downloads with appropriate extension (.toon or .txt)
- Valid TOON content
**Bug Risk:** Wrong extension

### O6. JSON Output (Reverse Direction)
**Test:** TOON→JSON output format
**Expected:**
- Valid, beautified JSON
- Proper indentation
**Bug Risk:** Invalid JSON

### O7. Statistics Bar Accuracy
**Test:** Check character/line counts
**Expected:**
- Accurate for TOON output
- Shows size reduction from input
**Bug Risk:** Wrong stats

### O8. Whitespace Handling
**Test:** Check TOON whitespace
**Expected:**
- Minimal necessary whitespace
- Optimized for token efficiency
**Bug Risk:** Excessive whitespace

### O9. Comparison Table Display
**Test:** Check token economy comparison table
**Expected:**
- JSON vs TOON comparison visible
- Accurate metrics
**Bug Risk:** Static/fake comparison

### O10. AI Use Case Examples
**Test:** Verify TOON works in AI prompt
**Expected:**
- Copy TOON, paste in ChatGPT/Claude
- AI understands the data correctly
**Bug Risk:** TOON not AI-readable

---

## 3. SEO & ACCESSIBILITY TESTING - 10 Critical Test Cases

### S1. Page Title
**Test:** Check `<title>` tag
**Expected:**
- "JSON to TOON Converter - AI Token Optimization | TextGauge"
**Bug Risk:** Missing AI keywords

### S2. Meta Description
**Test:** Check meta description
**Expected:**
- Contains "JSON to TOON", "token reduction", "AI", "LLM"
- Mentions ChatGPT, Claude
**Bug Risk:** Generic description

### S3. H1 Heading
**Test:** Check primary heading
**Expected:**
- "JSON to TOON Converter"
- Lavender theme (purple)
**Bug Risk:** Multiple H1s

### S4. Token Savings Banner
**Test:** Check "30-60% Token Reduction" section
**Expected:**
- Visually prominent
- Accurate claims
**Bug Risk:** Misleading stats

### S5. TOON Explanation Content
**Test:** Check "What is TOON" section
**Expected:**
- Clear explanation
- Use cases for AI/LLM
**Bug Risk:** Confusing or missing

### S6. AI Benefits Section
**Test:** Check "Why TOON is Better for AI" content
**Expected:**
- Clear value proposition
- Technical but accessible
**Bug Risk:** Too marketing-focused

### S7. FAQ Section
**Test:** FAQs about TOON
**Expected:**
- Answers common TOON questions
- Explains format benefits
**Bug Risk:** Missing key questions

### S8. Direction Toggle Accessibility
**Test:** Check toggle for JSON↔TOON
**Expected:**
- Toggle accessible
- State announced
**Bug Risk:** Inaccessible toggle

### S9. Related Tools
**Test:** Check related tools links
**Expected:**
- Link to JSON Formatter
- Link to JSON to CSV
**Bug Risk:** Broken links

### S10. Mobile Usability
**Test:** Use converter on mobile
**Expected:**
- Toggle works
- Content readable
- Conversion functional
**Bug Risk:** Broken on mobile

---

## 4. FEATURE-SPECIFIC TESTING - 10 Critical Test Cases

### F1. Direction Toggle (JSON↔TOON)
**Test:** Switch between conversion directions
**Expected:**
- Input/output types swap
- Sample data updates
- Placeholders change
**Bug Risk:** Direction not applied

### F2. Convert Button
**Test:** Check main action button
**Expected:**
- Says "Convert"
- Performs conversion
**Bug Risk:** Wrong label

### F3. Load Sample JSON
**Test:** In JSON→TOON mode, load sample
**Expected:**
- Sample JSON with array of objects
- Shows tabular conversion potential
**Bug Risk:** Unhelpful sample

### F4. Load Sample TOON
**Test:** In TOON→JSON mode, load sample
**Expected:**
- Valid TOON sample
- Demonstrates format
**Bug Risk:** Sample not switching

### F5. jsonToToon Function
**Test:** Check conversion function works
**Expected:**
- Proper TOON output
- Handles edge cases
**Bug Risk:** Function bugs

### F6. toonToJson Function
**Test:** Check reverse conversion
**Expected:**
- Valid JSON output
- Types preserved
**Bug Risk:** Parse failures

### F7. Error Handling (Invalid JSON)
**Test:** Paste invalid JSON
**Expected:**
- Clear error message
- Suggests fix
**Bug Risk:** Cryptic error

### F8. Error Handling (Invalid TOON)
**Test:** Paste malformed TOON in reverse mode
**Expected:**
- Graceful error handling
- Guidance on TOON format
**Bug Risk:** Crash

### F9. Keyboard Shortcut
**Test:** Cmd+Enter to convert
**Expected:**
- Triggers conversion
**Bug Risk:** Not working

### F10. LocalStorage Persistence
**Test:** Enter data, refresh
**Expected:**
- Input preserved
**Bug Risk:** Data lost

---

## Summary

| Category | Test Cases | Priority |
|----------|------------|----------|
| Input | 10 | High |
| Output | 10 | High |
| SEO/Accessibility | 10 | Medium |
| Feature-Specific | 10 | High |
| **Total** | **40** | - |

**JSON-TOON Converter Unique Considerations:**
- Novel format (TOON) requires explanation
- AI/LLM token optimization focus
- Bidirectional conversion
- Must prove token reduction claims
- SEO targeting AI developer audience
