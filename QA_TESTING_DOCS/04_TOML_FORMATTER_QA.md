# QA Testing Document: TOML Formatter

**Tool URL:** `/toml-formatter`
**Component:** `toml-formatter/page.tsx`, `Formatter.tsx`, `SimpleCodeEditor.tsx`
**Priority:** Medium
**Last Updated:** 2025-12-30

---

## 1. INPUT TESTING - 10 Critical Test Cases

### I1. Valid TOML Parsing
**Test:** Paste valid TOML:
```toml
[package]
name = "textgauge"
version = "1.0.0"
```
**Expected:**
- Sections highlighted in yellow
- Keys blue, values green/orange
- No parsing errors
**Bug Risk:** Valid TOML rejected

### I2. Invalid TOML Error Display
**Test:** Paste invalid TOML:
```toml
[package]
name = "missing quote
```
**Expected:**
- Clear error message from smol-toml parser
- Error position if available
**Bug Risk:** Cryptic error message

### I3. Cargo.toml File (Rust)
**Test:** Paste a complete Cargo.toml:
```toml
[package]
name = "my-crate"
version = "0.1.0"

[dependencies]
serde = "1.0"
tokio = { version = "1", features = ["full"] }
```
**Expected:**
- Inline tables parsed correctly
- Dependencies section formatted
**Bug Risk:** Inline tables corrupted

### I4. pyproject.toml File (Python)
**Test:** Paste a Python project config:
```toml
[build-system]
requires = ["setuptools>=45", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "my-project"
version = "0.1.0"
```
**Expected:**
- All sections recognized
- Array of strings formatted
**Bug Risk:** Build system section issues

### I5. TOML Arrays
**Test:** Various array syntaxes:
```toml
simple = [1, 2, 3]
strings = ["a", "b", "c"]
multiline = [
    1,
    2,
    3,
]
```
**Expected:**
- All array formats handled
- Trailing comma preserved or normalized
**Bug Risk:** Arrays corrupted

### I6. TOML Tables (Standard and Inline)
**Test:** Both table types:
```toml
[standard.table]
key = "value"

inline = { key = "value", another = 123 }
```
**Expected:**
- Standard tables on separate lines
- Inline tables stay inline
**Bug Risk:** Table types confused

### I7. Multi-line Strings
**Test:** Multi-line basic and literal strings:
```toml
multi_basic = """
Line 1
Line 2"""

multi_literal = '''
Exact\nText'''
```
**Expected:**
- Escaped chars in basic strings processed
- Literal strings kept exactly as-is
**Bug Risk:** Escape processing wrong

### I8. Date/Time Types
**Test:** TOML date/time formats:
```toml
odt = 2025-12-30T12:00:00-05:00
ldt = 2025-12-30T12:00:00
ld = 2025-12-30
lt = 12:00:00
```
**Expected:**
- All date/time formats recognized
- No type coercion
**Bug Risk:** Dates parsed as strings

### I9. Comments in TOML
**Test:** Paste TOML with comments:
```toml
# Configuration file
[package]
name = "test"  # Package name
```
**Expected:**
- Comments preserved
- Inline comments kept on same line
**Bug Risk:** Comments stripped

### I10. Boolean and Number Types
**Test:** Various primitive types:
```toml
enabled = true
disabled = false
integer = 42
float = 3.14
hex = 0xDEADBEEF
underscored = 1_000_000
```
**Expected:**
- true/false as booleans
- Hex notation preserved
- Underscores in numbers preserved
**Bug Risk:** Type conversion issues

---

## 2. OUTPUT TESTING - 10 Critical Test Cases

### O1. Beautify TOML
**Test:** Compact TOML → Beautify
**Expected:**
- Proper section spacing
- Keys aligned or consistently formatted
- Comments preserved
**Bug Risk:** smol-toml formatting quirks

### O2. Section Ordering
**Test:** Beautify with multiple sections
**Expected:**
- Section order preserved
- Subsections grouped correctly
**Bug Risk:** Sections reordered

### O3. Value Type Preservation
**Test:** Beautify and verify types unchanged:
```toml
str = "hello"
num = 42
bool = true
```
**Expected:**
- Strings stay quoted
- Numbers unquoted
- Booleans lowercase
**Bug Risk:** Type coercion in output

### O4. Inline Table Handling
**Test:** Beautify inline tables
**Expected:**
- Short inline tables stay inline
- Complex ones might expand (library dependent)
**Bug Risk:** All tables expanded or all inlined

### O5. Array Formatting
**Test:** Beautify long arrays
**Expected:**
- Arrays may wrap to multiple lines for readability
- Consistent formatting
**Bug Risk:** Arrays broken mid-element

### O6. Copy TOML Output
**Test:** Copy button on output
**Expected:**
- Valid TOML copied
- Can be pasted into Cargo.toml etc.
**Bug Risk:** Copy fails

### O7. Download as .toml
**Test:** Download button
**Expected:**
- Downloads as `formatted.toml`
- Valid TOML file
**Bug Risk:** Wrong extension

### O8. Statistics Accuracy
**Test:** Check line and character count
**Expected:**
- Accurate counts
- Updates after beautify
**Bug Risk:** Stale stats

### O9. Error to Valid Recovery
**Test:** Fix invalid TOML, beautify again
**Expected:**
- Error clears
- Beautify succeeds
**Bug Risk:** Error state stuck

### O10. Dotted Key Handling
**Test:** Dotted keys beautified:
```toml
physical.color = "orange"
physical.shape = "round"
```
**Expected:**
- Can be left as dotted keys
- Or expanded to table (library choice)
**Bug Risk:** Inconsistent handling

---

## 3. SEO & ACCESSIBILITY TESTING - 10 Critical Test Cases

### S1. Page Title
**Test:** Check `<title>` tag
**Expected:**
- "TOML Formatter - Beautify Cargo.toml & pyproject.toml | TextGauge"
**Bug Risk:** Missing keywords

### S2. Meta Description
**Test:** Check meta description
**Expected:**
- Contains "TOML formatter", "Cargo.toml", "pyproject.toml"
- Targets Rust and Python developers
**Bug Risk:** Too generic

### S3. H1 Heading
**Test:** Single H1
**Expected:**
- "TOML Formatter" as H1
- Frangipani flower theme (orange)
**Bug Risk:** Wrong theme

### S4. Target Audience Keywords
**Test:** Check page content for keywords
**Expected:**
- Mentions Rust, Python, config files
- "Cargo.toml", "pyproject.toml" in content
**Bug Risk:** Missing audience-specific terms

### S5. Related Tools Links
**Test:** Check cross-links
**Expected:**
- Links to JSON Formatter
- Links to YAML Formatter
- Links to Diff Checker
**Bug Risk:** Broken or missing links

### S6. Mobile Usability
**Test:** Use on mobile device
**Expected:**
- Editor usable
- Buttons accessible
- No horizontal scroll
**Bug Risk:** Poor mobile experience

### S7. Keyboard Navigation
**Test:** Tab through page
**Expected:**
- Logical focus order
- All controls reachable
**Bug Risk:** Focus issues

### S8. Error Accessibility
**Test:** Trigger error, check announcement
**Expected:**
- Error has ARIA role
- Screen reader announces
**Bug Risk:** Silent errors

### S9. Theme Consistency
**Test:** Verify Frangipani/orange theme
**Expected:**
- Orange accent colors
- Flower badge visible
**Bug Risk:** Wrong theme applied

### S10. Page Speed
**Test:** Lighthouse audit
**Expected:**
- smol-toml bundle size reasonable
- Fast load time
**Bug Risk:** Heavy bundle

---

## 4. FEATURE-SPECIFIC TESTING - 10 Critical Test Cases

### F1. smol-toml Library Integration
**Test:** Check console for errors
**Expected:**
- No import errors
- Library initialized correctly
**Bug Risk:** Bundle/import issues

### F2. TOML Syntax Highlighting
**Test:** Check highlighting accuracy
**Expected:**
- Sections [xxx] yellow
- Keys blue
- Values green/orange by type
**Bug Risk:** Incomplete highlighting

### F3. Search in TOML
**Test:** Cmd+F to search
**Expected:**
- Search works in TOML content
- Matches highlighted
**Bug Risk:** Highlighting interferes

### F4. Replace in TOML
**Test:** Find "1.0.0", replace with "2.0.0"
**Expected:**
- Version updated
- TOML valid after replace
**Bug Risk:** Corrupts TOML

### F5. Tab Size (Limited)
**Test:** Change tab size setting
**Expected:**
- Note: TOML formatter (smol-toml stringify) may not support custom indent
- Either works or document limitation
**Bug Risk:** Setting does nothing

### F6. Load Sample TOML
**Test:** Click Load Sample if available
**Expected:**
- Cargo.toml or similar example loaded
- Demonstrates TOML features
**Bug Risk:** Missing sample

### F7. LocalStorage Persistence
**Test:** Enter TOML, refresh
**Expected:**
- Content restored
**Bug Risk:** Data lost

### F8. Array of Tables
**Test:** Format array of tables:
```toml
[[products]]
name = "Hammer"

[[products]]
name = "Nail"
```
**Expected:**
- [[section]] syntax preserved
- Each entry separate
**Bug Risk:** Array of tables corrupted

### F9. Integer Key Tables
**Test:** Format with numeric-like section names:
```toml
[1234]
key = "value"
```
**Expected:**
- Numeric section names preserved
**Bug Risk:** Treated as array index

### F10. Empty Tables
**Test:** Format empty table:
```toml
[empty]
```
**Expected:**
- Empty table preserved
- No error
**Bug Risk:** Empty sections removed

---

## Summary

| Category | Test Cases | Priority |
|----------|------------|----------|
| Input | 10 | High |
| Output | 10 | High |
| SEO/Accessibility | 10 | Medium |
| Feature-Specific | 10 | Medium |
| **Total** | **40** | - |

**TOML-Specific Considerations:**
- Primary audience: Rust and Python developers
- Key files: Cargo.toml, pyproject.toml
- smol-toml library specifics
- Less common than JSON/YAML (lower priority)
