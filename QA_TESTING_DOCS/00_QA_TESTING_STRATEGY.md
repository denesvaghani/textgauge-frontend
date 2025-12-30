# QA Testing Strategy - TextGauge

## Overview

This directory contains comprehensive QA testing documentation for all 7 TextGauge tools. Each document follows a consistent structure with 40 test cases across 4 categories.

## Document Structure

Each QA document contains:
- **Input Testing** (10 test cases) - Validating user input handling
- **Output Testing** (10 test cases) - Verifying output correctness
- **SEO & Accessibility** (10 test cases) - Ensuring discoverability and usability
- **Feature-Specific** (10 test cases) - Testing unique tool features

## Tools Covered

| # | Tool | File | Test Cases | Priority |
|---|------|------|------------|----------|
| 1 | Homepage Character Counter & Editor | [01_HOMEPAGE_EDITOR_QA.md](./01_HOMEPAGE_EDITOR_QA.md) | 40 | Critical |
| 2 | JSON Formatter | [02_JSON_FORMATTER_QA.md](./02_JSON_FORMATTER_QA.md) | 40 | Critical |
| 3 | YAML Formatter | [03_YAML_FORMATTER_QA.md](./03_YAML_FORMATTER_QA.md) | 40 | High |
| 4 | TOML Formatter | [04_TOML_FORMATTER_QA.md](./04_TOML_FORMATTER_QA.md) | 40 | Medium |
| 5 | Diff Checker | [05_DIFF_CHECKER_QA.md](./05_DIFF_CHECKER_QA.md) | 40 | High |
| 6 | JSON to CSV Converter | [06_JSON_CSV_CONVERTER_QA.md](./06_JSON_CSV_CONVERTER_QA.md) | 40 | High |
| 7 | JSON to TOON Converter | [07_JSON_TOON_CONVERTER_QA.md](./07_JSON_TOON_CONVERTER_QA.md) | 40 | Medium-High |

**Total Test Cases: 280**

---

## Testing Priority Matrix

### Critical (Test First)
1. **Homepage Editor** - Main entry point, core functionality
2. **JSON Formatter** - Most used tool, primary SEO driver

### High Priority
3. **YAML Formatter** - Popular among developers
4. **Diff Checker** - Unique functionality
5. **JSON-CSV Converter** - High practical use

### Medium Priority
6. **TOML Formatter** - Niche audience (Rust/Python)
7. **JSON-TOON Converter** - Novel format, AI developer audience

---

## Common Test Scenarios (Cross-Tool)

### 1. Input Handling
- [ ] Empty input behavior
- [ ] Very large files (10MB+)
- [ ] Unicode and emoji support
- [ ] Malformed/invalid data
- [ ] File upload functionality
- [ ] URL loading (where applicable)

### 2. Output Handling
- [ ] Copy to clipboard
- [ ] Download functionality
- [ ] Syntax highlighting
- [ ] Statistics accuracy (lines, chars, KB)
- [ ] Swap button functionality

### 3. SEO Requirements
- [ ] Unique page title
- [ ] Meta description (150-160 chars)
- [ ] Single H1 heading
- [ ] Internal cross-linking
- [ ] FAQ schema markup
- [ ] Mobile responsiveness

### 4. Accessibility
- [ ] Keyboard navigation (Tab order)
- [ ] Screen reader compatibility
- [ ] Color contrast (WCAG AA)
- [ ] Focus indicators visible
- [ ] ARIA labels on buttons
- [ ] Error announcements

### 5. Performance
- [ ] First Contentful Paint < 2s
- [ ] No layout shift (CLS < 0.1)
- [ ] Smooth scrolling
- [ ] No memory leaks

---

## Recommended Testing Approach

### Phase 1: Smoke Testing
Run one critical test from each category per tool:
- Can load page ✓
- Can perform main action ✓
- Output is correct ✓
- Can copy/download output ✓

### Phase 2: Functional Testing
Complete all Input and Output test cases systematically.

### Phase 3: Cross-Browser Testing
Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari
- Mobile Chrome

### Phase 4: SEO & Accessibility Audit
- Run Lighthouse on each page
- Test with screen reader
- Validate structured data
- Check mobile usability

### Phase 5: Performance Testing
- Test with large files
- Monitor memory usage
- Check for console errors
- Validate loading times

---

## Regression Testing Triggers

Run full regression when:
- Updating `SimpleCodeEditor.tsx` (affects all tools)
- Updating `Formatter.tsx` (affects all formatters/converters)
- Major dependency updates
- Before production deployments

---

## Bug Reporting Template

```markdown
## Bug Report

**Tool:** [Tool Name]
**Test Case ID:** [e.g., I1, O5, S3]
**Severity:** Critical / High / Medium / Low

### Description
[Brief description of the bug]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Environment
- Browser: [Chrome 120]
- OS: [macOS 14.2]
- Viewport: [Desktop / Mobile]

### Screenshots
[If applicable]
```

---

## Automation Candidates

High-priority test cases to automate with Playwright:

1. **Input/Output Round-trips**
   - JSON → Format → Minify → Should equal normalized input
   - JSON → CSV → JSON → Should preserve data

2. **File Upload/Download**
   - Upload file → Verify content loaded
   - Download output → Verify file correct

3. **Cross-browser Rendering**
   - Screenshot comparison across browsers

4. **Performance Benchmarks**
   - Time to format 10KB JSON
   - Time to diff 1000-line files

---

*Last Updated: 2025-12-30*
*Total Test Cases: 280*
*Branch: qa/comprehensive-tool-testing*
