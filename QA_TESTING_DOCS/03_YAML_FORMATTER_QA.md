# QA Testing Document: YAML Formatter

**Tool URL:** `/yaml-formatter`
**Component:** `yaml-formatter/page.tsx`, `Formatter.tsx`, `SimpleCodeEditor.tsx`
**Priority:** High
**Last Updated:** 2025-12-30

---

## 1. INPUT TESTING - 10 Critical Test Cases

### I1. Valid YAML Parsing
**Test:** Paste valid YAML:
```yaml
name: John
age: 30
skills:
  - JavaScript
  - Python
```
**Expected:**
- Syntax highlighting applied (keys blue, values green, dashes teal)
- No errors shown
**Bug Risk:** Valid YAML marked as error

### I2. Invalid YAML Error Display
**Test:** Paste invalid YAML with bad indentation:
```yaml
name: John
  age: 30
```
**Expected:**
- Clear error message about indentation
- Error position indicated if possible
**Bug Risk:** Cryptic js-yaml error messages

### I3. YAML Anchors and Aliases
**Test:** Paste YAML with anchors:
```yaml
defaults: &defaults
  timeout: 30
  retries: 3

production:
  <<: *defaults
  timeout: 60
```
**Expected:**
- Anchors resolved correctly
- Output shows expanded values
**Bug Risk:** Anchors not supported, output incorrect

### I4. Multi-line Strings
**Test:** Paste YAML with multi-line strings:
```yaml
description: |
  This is a
  multi-line string
summary: >
  This is a
  folded string
```
**Expected:**
- Literal block (|) preserved with newlines
- Folded block (>) folded correctly
**Bug Risk:** Newlines lost, wrong block style

### I5. Special YAML Types
**Test:** Paste YAML with special types:
```yaml
date: 2025-12-30
time: 12:30:00
null_value: ~
boolean: yes
```
**Expected:**
- Dates, times parsed correctly
- Tilde recognized as null
- "yes"/"no" as boolean
**Bug Risk:** Type inference incorrect

### I6. Large YAML File (5+ MB)
**Test:** Upload a large Kubernetes manifest or config file
**Expected:**
- Editor handles without crashing
- Formatting completes
**Bug Risk:** Performance degradation, timeout

### I7. YAML with Comments
**Test:** Paste YAML with comments:
```yaml
# This is a comment
name: John  # inline comment
```
**Expected:**
- Comments preserved in output
- Comments highlighted in gray/italic
**Bug Risk:** Comments stripped, no highlighting

### I8. File Upload (.yaml, .yml)
**Test:** Upload files with both extensions
**Expected:**
- Both extensions accepted
- Content loaded correctly
**Bug Risk:** .yml not recognized

### I9. YAML to JSON Mental Model
**Test:** User pastes JSON expecting YAML formatter to work
**Expected:**
- JSON is valid YAML (superset)
- Should format correctly
- User not confused
**Bug Risk:** JSON rejected

### I10. Unicode and Non-ASCII Keys
**Test:** Paste YAML with unicode keys:
```yaml
名前: 田中
Ñame: García
```
**Expected:**
- Unicode keys preserved
- Values intact
**Bug Risk:** Encoding issues, corrupted output

---

## 2. OUTPUT TESTING - 10 Critical Test Cases

### O1. Beautify Standard YAML
**Test:** Compact YAML → Beautify
**Expected:**
- Proper 2-space indentation
- List items properly indented
- Consistent formatting
**Bug Risk:** Inconsistent indentation

### O2. Tab Size Application
**Test:** Change tab size to 4 → Beautify
**Expected:**
- 4-space indentation applied
**Bug Risk:** YAML library ignores tab size setting

### O3. Key Ordering
**Test:** Beautify YAML with keys in specific order
**Expected:**
- Key order preserved (not alphabetized unless configured)
**Bug Risk:** Keys reordered unexpectedly

### O4. Nested Objects Indentation
**Test:** Beautify 5+ levels of nesting
**Expected:**
- Each level indented correctly
- Visual hierarchy clear
**Bug Risk:** Deep nesting breaks formatting

### O5. Array Formatting
**Test:** Beautify array of objects:
```yaml
users:
  - name: John
    age: 30
  - name: Jane
    age: 25
```
**Expected:**
- Dashes aligned
- Object properties indented under dash
**Bug Risk:** Array items not formatted correctly

### O6. Output Line Count Accuracy
**Test:** Verify status bar line count
**Expected:**
- Matches actual lines in output
- Updates after each beautify
**Bug Risk:** Count stale or incorrect

### O7. Copy YAML Output
**Test:** Click copy on output editor
**Expected:**
- YAML copied to clipboard with correct indentation
- No extra/missing whitespace
**Bug Risk:** Indentation lost in copy

### O8. Download as .yaml
**Test:** Click Download on output
**Expected:**
- Downloads as `formatted.yaml`
- Valid YAML file
**Bug Risk:** Wrong extension (.txt), corrupted file

### O9. Swap Button for Iterative Formatting
**Test:** Beautify, modify in output mentally, swap, beautify again
**Expected:**
- Swap works correctly
- Can re-beautify swapped content
**Bug Risk:** Swap fails if output is complex

### O10. Empty Document Handling
**Test:** Beautify empty YAML document (`---`)
**Expected:**
- Outputs empty document marker
- No error
**Bug Risk:** Empty string causes issues

---

## 3. SEO & ACCESSIBILITY TESTING - 10 Critical Test Cases

### S1. Page Title
**Test:** Check `<title>` tag
**Expected:**
- "YAML Formatter - Validate & Beautify YAML | TextGauge"
**Bug Risk:** Generic or missing title

### S2. Meta Description
**Test:** Inspect meta description
**Expected:**
- Contains "YAML formatter", "YAML beautifier", "validate YAML"
- 150-160 characters
**Bug Risk:** Missing or duplicate description

### S3. H1 Heading
**Test:** Single H1 exists
**Expected:**
- "YAML Formatter" as H1
- Correct flower theme (White Lily)
**Bug Risk:** Multiple H1s

### S4. Canonical URL
**Test:** Check canonical tag
**Expected:**
- `<link rel="canonical" href="https://textgauge.com/yaml-formatter">`
**Bug Risk:** Missing canonical, wrong URL

### S5. Internal Linking
**Test:** Check links to related tools
**Expected:**
- Link to JSON Formatter
- Link to TOML Formatter
- Link to Diff Checker
**Bug Risk:** Missing cross-links

### S6. FAQ Section
**Test:** Check FAQ content
**Expected:**
- FAQs about YAML formatting
- Questions users actually ask
- Proper accordion behavior
**Bug Risk:** No FAQs, broken expand/collapse

### S7. Mobile Editor Usability
**Test:** Use YAML formatter on mobile device
**Expected:**
- Can input YAML
- Buttons reachable
- Output readable
**Bug Risk:** Unusable on small screens

### S8. Error State Accessibility
**Test:** Trigger error, check with screen reader
**Expected:**
- Error announced
- Error has role="alert"
**Bug Risk:** Errors not announced

### S9. Focus Management
**Test:** Tab through page
**Expected:**
- Focus starts at top
- Logical progression through controls
- Skip to main content link if present
**Bug Risk:** Random focus order

### S10. Color Theme (White Lily)
**Test:** Verify page uses correct flower theme
**Expected:**
- Emerald/green accent colors
- White Lily branding element visible
**Bug Risk:** Wrong theme colors

---

## 4. FEATURE-SPECIFIC TESTING - 10 Critical Test Cases

### F1. js-yaml Library Integration
**Test:** Check console for library errors
**Expected:**
- No js-yaml initialization errors
- Library loaded correctly
**Bug Risk:** Import failure

### F2. Search in YAML Content
**Test:** Cmd+F, search for key name
**Expected:**
- Highlights found in YAML
- Works with syntax highlighting
**Bug Risk:** Search broken by highlighting HTML

### F3. Replace Value in YAML
**Test:** Find value "John", replace with "Jane"
**Expected:**
- Replacement successful
- YAML remains valid
**Bug Risk:** Breaks YAML structure

### F4. YAML Error Line Highlighting
**Test:** Check if error line is highlighted
**Expected:**
- Error line visually distinct
- Scrolls into view if needed
**Bug Risk:** No visual indicator

### F5. Complex Mapping Types
**Test:** Beautify YAML with complex keys:
```yaml
? |
  multi-line
  key
: value
```
**Expected:**
- Complex key syntax preserved
**Bug Risk:** Complex keys corrupted

### F6. Document Separators
**Test:** MultiDoc YAML:
```yaml
---
doc1: value1
---
doc2: value2
```
**Expected:**
- Both documents processed
- Separators preserved
**Bug Risk:** Only first doc processed

### F7. Numeric Precision
**Test:** YAML with precise numbers:
```yaml
pi: 3.141592653589793
big: 9007199254740993
```
**Expected:**
- Precision preserved (up to JS limits)
**Bug Risk:** Floating point errors

### F8. Load Sample YAML
**Test:** Click Load Sample
**Expected:**
- Valid, instructive YAML loaded
- Demonstrates key features
**Bug Risk:** Missing sample

### F9. LocalStorage Persistence
**Test:** Enter YAML, refresh browser
**Expected:**
- Input restored
- No data loss
**Bug Risk:** YAML not saved

### F10. Related Tools Navigation
**Test:** Click link to Diff Checker
**Expected:**
- Navigates correctly
- Could pass YAML content (nice to have)
**Bug Risk:** Broken link

---

## Summary

| Category | Test Cases | Priority |
|----------|------------|----------|
| Input | 10 | High |
| Output | 10 | High |
| SEO/Accessibility | 10 | Critical |
| Feature-Specific | 10 | Medium |
| **Total** | **40** | - |

**Key Differences from JSON Formatter:**
- YAML comments support
- Multi-line string handling (| and >)
- Anchor/alias support
- Document separators (---)
- js-yaml specific error messages
