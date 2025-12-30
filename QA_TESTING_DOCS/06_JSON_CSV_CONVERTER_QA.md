# QA Testing Document: JSON to CSV Converter

**Tool URL:** `/json-to-csv-converter`
**Component:** `json-to-csv-converter/JsonCsvClient.tsx`, `Formatter.tsx`
**Priority:** High
**Last Updated:** 2025-12-30

---

## 1. INPUT TESTING - 10 Critical Test Cases

### I1. Simple JSON Array
**Test:** Paste flat JSON array:
```json
[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]
```
**Expected:**
- Converts to 2-row CSV plus header
- All fields extracted correctly
**Bug Risk:** Fields missing in output

### I2. Nested JSON Objects
**Test:** Paste JSON with nesting:
```json
[{"name": "John", "address": {"city": "NYC", "zip": "10001"}}]
```
**Expected:**
- Flattened to columns: name, address.city, address.zip
- Dot notation used
**Bug Risk:** Nested objects lost or wrong notation

### I3. JSON with Arrays as Values
**Test:** Paste JSON with array values:
```json
[{"name": "John", "skills": ["JS", "Python"]}]
```
**Expected:**
- Array serialized (e.g., "JS,Python" or "[JS, Python]")
- Clear handling strategy
**Bug Risk:** Corrupted or lost array data

### I4. Missing Fields Across Objects
**Test:** Paste JSON with inconsistent fields:
```json
[{"name": "John", "age": 30}, {"name": "Jane", "email": "jane@test.com"}]
```
**Expected:**
- All columns created: name, age, email
- Missing values empty or null
**Bug Risk:** Missing columns, data in wrong columns

### I5. Very Large JSON (100K Objects)
**Test:** Paste or upload JSON with 100,000 objects
**Expected:**
- Conversion completes (may take time)
- Browser doesn't crash
- Progress indicator if supported
**Bug Risk:** Memory overflow, browser freeze

### I6. Special Characters in Values
**Test:** Paste JSON with CSV-dangerous characters:
```json
[{"name": "O'Brien", "bio": "Hello, World!", "quote": "He said \"yes\""}]
```
**Expected:**
- Commas escaped (value quoted)
- Quotes escaped (double quotes)
- Newlines handled
**Bug Risk:** CSV parsing breaks on import

### I7. Unicode Values
**Test:** Paste JSON with unicode:
```json
[{"name": "田中", "city": "東京"}]
```
**Expected:**
- Unicode preserved in CSV
- UTF-8 encoding
**Bug Risk:** Character corruption

### I8. Empty JSON Array
**Test:** Paste empty array: `[]`
**Expected:**
- Empty output or "No data" message
- No error
**Bug Risk:** Error thrown

### I9. Single Object (Not Array)
**Test:** Paste single object: `{"name": "John"}`
**Expected:**
- Treated as single-row CSV
- Or clear error about expected array format
**Bug Risk:** Confusing error or wrong output

### I10. CSV Input (Reverse Direction)
**Test:** Toggle to CSV → JSON, paste:
```
name,age
John,30
Jane,25
```
**Expected:**
- Converts to JSON array
- Types inferred (numbers as numbers)
**Bug Risk:** All strings, or type coercion errors

---

## 2. OUTPUT TESTING - 10 Critical Test Cases

### O1. CSV Header Row
**Test:** Check output header row
**Expected:**
- All column names present
- Same order as first JSON object (or alphabetized)
**Bug Risk:** Missing or wrong headers

### O2. CSV Data Rows
**Test:** Verify data rows match JSON objects
**Expected:**
- Row count equals JSON array length
- Values in correct columns
**Bug Risk:** Data misaligned

### O3. File Size Reduction Message
**Test:** Check size savings display
**Expected:**
- Shows ~50-60% reduction claim
- May show actual before/after sizes
**Bug Risk:** Misleading statistics

### O4. Download CSV
**Test:** Click Download on output
**Expected:**
- Downloads as `formatted.csv`
- Opens correctly in Excel/Sheets
**Bug Risk:** Wrong extension, encoding issues

### O5. Copy CSV
**Test:** Copy CSV output
**Expected:**
- Can paste into spreadsheet
- Formatting preserved
**Bug Risk:** Copy fails or corrupts

### O6. JSON Output (Reverse Direction)
**Test:** Convert CSV to JSON, check output
**Expected:**
- Valid JSON array
- Proper indentation
- Types preserved where possible
**Bug Risk:** Invalid JSON

### O7. Nested Object Reconstruction (CSV to JSON)
**Test:** CSV with dot notation headers → JSON
**Expected:**
- `address.city` becomes `{"address": {"city": "..."}}`
**Bug Risk:** Dot notation not parsed

### O8. Statistics Bar
**Test:** Check lines/chars/KB after conversion
**Expected:**
- Accurate for output
- Updates after each conversion
**Bug Risk:** Shows input stats

### O9. Swap and Re-Convert
**Test:** Convert, swap output to input, convert again
**Expected:**
- Round-trip works
- JSON → CSV → JSON loses no data
**Bug Risk:** Data loss on round-trip

### O10. Boolean and Null Handling
**Test:** Convert JSON with booleans and nulls:
```json
[{"active": true, "deleted": null}]
```
**Expected:**
- `true` → "true" (string in CSV)
- `null` → empty or "null"
**Bug Risk:** Inconsistent null handling

---

## 3. SEO & ACCESSIBILITY TESTING - 10 Critical Test Cases

### S1. Page Title
**Test:** Check `<title>` tag
**Expected:**
- "JSON to CSV Converter - Free Online Tool | TextGauge"
**Bug Risk:** Missing keywords

### S2. Meta Description
**Test:** Check meta description
**Expected:**
- Contains "JSON to CSV", "convert JSON", "spreadsheet"
- Mentions file size reduction
**Bug Risk:** Generic description

### S3. H1 Heading
**Test:** Check primary heading
**Expected:**
- "JSON to CSV Converter" as H1
- Sunflower theme (yellow)
**Bug Risk:** Multiple H1s

### S4. Direction Toggle Accessibility
**Test:** Check toggle switch
**Expected:**
- Toggle has aria-label
- State announced to screen readers
**Bug Risk:** Toggle not accessible

### S5. File Size Savings Banner
**Test:** Check "50-60% Smaller Files" section
**Expected:**
- Visually prominent
- Clear value proposition
**Bug Risk:** Hidden or unclear

### S6. FAQ Section
**Test:** All FAQs about JSON-CSV conversion
**Expected:**
- FAQs answer common questions
- Toggle works correctly
**Bug Risk:** Broken accordion

### S7. What Is Section
**Test:** Check educational content
**Expected:**
- Explains JSON to CSV conversion
- Technical but accessible
**Bug Risk:** Too basic or too technical

### S8. Related Tools Links
**Test:** Check related tool links
**Expected:**
- Link to JSON Formatter
- Link to JSON to TOON
- Link to YAML Formatter
**Bug Risk:** Broken or missing links

### S9. Mobile Direction Toggle
**Test:** Use toggle on mobile
**Expected:**
- Toggle touch-friendly
- State clearly visible
**Bug Risk:** Too small to tap

### S10. Platform Compatibility Note
**Test:** Check browser compatibility section
**Expected:**
- Lists Windows, Mac, Linux
- Lists Chrome, Firefox, Safari, Edge
**Bug Risk:** Missing or inaccurate

---

## 4. FEATURE-SPECIFIC TESTING - 10 Critical Test Cases

### F1. Direction Toggle (JSON→CSV / CSV→JSON)
**Test:** Click toggle to switch direction
**Expected:**
- Input/output types swap
- Placeholder text updates
- Sample data updates
**Bug Risk:** Direction not applied

### F2. Convert Button (Not Beautify)
**Test:** Check main action button label
**Expected:**
- Button says "Convert" not "Beautify"
- Correct action performed
**Bug Risk:** Wrong label confuses users

### F3. Load Sample (JSON Direction)
**Test:** Click Load Sample in JSON→CSV mode
**Expected:**
- JSON sample loads with nested objects
- Demonstrates flattening capability
**Bug Risk:** Unhelpful sample

### F4. Load Sample (CSV Direction)
**Test:** Toggle to CSV→JSON, click Load Sample
**Expected:**
- CSV sample loads
- Demonstrates conversion
**Bug Risk:** Sample not switching

### F5. Flatten Option (if configurable)
**Test:** Check if flatten toggle exists
**Expected:**
- Option to flatten or keep nested
- Applied correctly
**Bug Risk:** Option has no effect

### F6. Error Handling for Invalid JSON
**Test:** Paste invalid JSON in JSON→CSV mode
**Expected:**
- Clear error message
- Suggests fixing JSON
**Bug Risk:** Cryptic error

### F7. Error Handling for Invalid CSV
**Test:** Paste malformed CSV in CSV→JSON mode
**Expected:**
- Handles gracefully
- Or shows clear error
**Bug Risk:** Crash or garbage output

### F8. Column Ordering
**Test:** Check if columns are ordered consistently
**Expected:**
- Consistent order (first object's key order or alphabetized)
- Documented behavior
**Bug Risk:** Random ordering confuses users

### F9. Numeric Precision
**Test:** Convert JSON with precise numbers:
```json
[{"value": 1234567890123456789}]
```
**Expected:**
- Precision maintained (up to JS limits)
- Warning if precision loss possible
**Bug Risk:** Silent precision loss

### F10. Keyboard Shortcut
**Test:** Cmd+Enter to convert
**Expected:**
- Converts current input
- Same as clicking Convert
**Bug Risk:** Shortcut not working

---

## Summary

| Category | Test Cases | Priority |
|----------|------------|----------|
| Input | 10 | High |
| Output | 10 | High |
| SEO/Accessibility | 10 | Medium |
| Feature-Specific | 10 | High |
| **Total** | **40** | - |

**JSON-CSV Converter Unique Considerations:**
- Bidirectional conversion (toggle)
- Flattening of nested JSON
- CSV escaping requirements
- Type inference on CSV→JSON
- File size reduction as key selling point
