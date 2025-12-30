# QA Testing Document: Homepage Character Counter & Editor

**Tool URL:** `/` (Homepage)
**Component:** `Editor.tsx`
**Priority:** Critical
**Last Updated:** 2025-12-30

---

## 1. INPUT TESTING - 10 Critical Test Cases

### I1. Empty State Behavior
**Test:** Load the homepage with no text
**Expected:** 
- Placeholder text "Start typing here or paste your content..." should be visible
- All metrics should show 0 values
- Undo/Redo buttons should be disabled
**Bug Risk:** Placeholder not visible, metrics showing NaN or undefined

### I2. Paste Large Content (100+ KB)
**Test:** Paste a very large text file (100KB - 1MB of Lorem Ipsum or real text)
**Expected:** 
- Content should paste without freezing the browser
- Metrics should update within 2 seconds
- No console errors
**Bug Risk:** Browser freeze, memory leak, metrics not updating

### I3. Unicode and Emoji Input
**Test:** Type or paste text containing emojis 🎉💯, Chinese characters 你好, Arabic العربية, and special symbols ñ, ü, ß
**Expected:** 
- All characters should display correctly
- Character count should be accurate (emoji may count as multiple code points)
- No rendering issues
**Bug Risk:** Character count incorrect for multi-byte characters, display corruption

### I4. Contenteditable Cursor Position
**Test:** Click in middle of existing text and start typing
**Expected:** 
- New text should insert at cursor position
- Cursor should move naturally
- Undo should restore previous state correctly
**Bug Risk:** Text inserted at wrong position, cursor jumps unexpectedly

### I5. Rapid Typing Performance
**Test:** Type extremely fast for 30+ seconds continuously
**Expected:** 
- No lag in character display
- Metrics update smoothly without visible delay
- History stack doesn't overflow
**Bug Risk:** Input lag, history stack grows unbounded causing memory issues

### I6. Copy/Paste Formatting (Rich Text)
**Test:** Copy text from Microsoft Word or Google Docs with bold/italic formatting and paste
**Expected:** 
- Basic formatting (bold/italic) should be preserved
- Metrics should count plain text characters, not HTML tags
- No stray HTML visible
**Bug Risk:** HTML tags visible in content, broken layout

### I7. Newline and Paragraph Handling
**Test:** Enter multiple paragraphs with blank lines between them
**Expected:** 
- Paragraph count should be accurate
- Line breaks preserved on display
- Reading time calculation accounts for paragraphs
**Bug Risk:** Paragraph count incorrect, newlines stripped

### I8. Whitespace-Only Input
**Test:** Enter only spaces, tabs, and newlines
**Expected:** 
- Character count should include spaces
- Word count should be 0
- Sentence count should be 0
**Bug Risk:** Edge case handling - divide by zero errors in density calculations

### I9. Mobile Touch Input
**Test:** On mobile device, tap to position cursor and type using on-screen keyboard
**Expected:** 
- Touch targets large enough (44px minimum)
- Cursor positions correctly on tap
- Virtual keyboard doesn't obscure content
**Bug Risk:** Touch targets too small, content hidden by keyboard

### I10. SEO Keyword Input Edge Cases
**Test:** Enter keywords with:
- Very long keyword (50+ characters)
- Keyword with special characters (#, @, &)
- Empty keyword field
- Multiple words with extra spaces
**Expected:** 
- Long keyword should truncate or wrap gracefully
- Special characters handled without errors
- Empty keyword shows appropriate placeholder state
- Extra spaces normalized
**Bug Risk:** Layout breaking with long keywords, JS errors with special chars

---

## 2. OUTPUT TESTING - 10 Critical Test Cases

### O1. Live Statistics Accuracy
**Test:** Type exactly "Hello world. This is a test." and verify stats
**Expected:**
- Characters: 29
- Words: 6
- Sentences: 2
- Paragraphs: 1
- Reading Time: ~1 sec
- Speaking Time: ~3 sec
**Bug Risk:** Off-by-one errors, sentence detection failure

### O2. Keyword Density Calculation
**Test:** Type: "apple banana apple apple banana" with keyword "apple"
**Expected:**
- Occurrences: 3
- Density: 60% (3 out of 5 words)
**Bug Risk:** Case sensitivity issues, density formula incorrect

### O3. Repeated Phrases Detection
**Test:** Type: "the quick brown fox jumped over the quick brown dog and the quick brown cat"
**Expected:**
- "the quick brown" should appear in repeated phrases list with count: 3
**Bug Risk:** Phrases not detected, count incorrect

### O4. Case Conversion - Title Case
**Test:** Select "hello world" and click Title Case button
**Expected:** 
- Text becomes "Hello World"
- History entry created for undo
**Bug Risk:** Already capitalized letters not handled, articles shouldn't be capped

### O5. Case Conversion - snake_case Toggle
**Test:** 
1. Select "hello world" → click snake_case → should become "hello_world"
2. Select "hello_world" → click snake_case again → should become "hello world"
**Expected:** Bidirectional conversion working
**Bug Risk:** Toggle not working, hyphens being removed incorrectly

### O6. Undo/Redo Stack Integrity
**Test:** 
1. Type "A" → Type "B" → Type "C"
2. Undo 3 times → Redo 2 times
**Expected:** 
- After undo 3x: Empty
- After redo 2x: "AB"
- Metrics update with each undo/redo
**Bug Risk:** History corruption, metrics not updating on undo

### O7. AI Rephrase Feature
**Test:** Type a paragraph and click "Rephrase" button
**Expected:**
- Loading spinner appears
- Text is replaced with rephrased version
- New text is grammatically correct
- Error message if API fails
**Bug Risk:** No loading indicator, silent failures, rephrased text not updating metrics

### O8. Reading Time Edge Cases
**Test:** 
1. Single word → should show "1 sec"
2. 250 words → should show "1 min"
3. Zero words → should show "0 sec"
**Expected:** Proper formatting with correct unit labels
**Bug Risk:** Incorrect calculation (standard is 200-250 WPM), poor label formatting

### O9. Bold/Italic Formatting Persistence
**Test:** Apply bold to word, type more text, undo, redo
**Expected:**
- Formatting preserved through history
- execCommand working correctly
- Metrics not affected by HTML tags
**Bug Risk:** Formatting lost on undo, character count including HTML

### O10. Sidebar Keyword Metrics Update
**Test:** Change keyword after text exists
**Expected:**
- Sidebar updates immediately with new keyword stats
- "Keyword not found in text" message if no matches
- Occurrences and density recalculate
**Bug Risk:** Stale data displayed, sidebar not reactive

---

## 3. SEO & ACCESSIBILITY TESTING - 10 Critical Test Cases

### S1. Page Title Tag
**Test:** Check document title on homepage
**Expected:** 
- Title: "Character Counter & Text Tools | TextGauge" or similar
- Under 60 characters
- Primary keyword at start
**Bug Risk:** Missing title, too long (truncated in SERPs)

### S2. Meta Description
**Test:** Inspect meta description tag
**Expected:**
- Present and between 150-160 characters
- Contains target keywords: "character counter", "word count"
- Compelling CTA
**Bug Risk:** Missing, too short, duplicate across pages

### S3. Heading Hierarchy (H1-H6)
**Test:** Inspect heading structure
**Expected:**
- Single H1: "Character Counter & Text Tools"
- H2s for sections: "Live Statistics", "Analysis Dashboard", etc.
- No skipped levels
**Bug Risk:** Multiple H1s, skipped heading levels

### S4. Image Alt Text
**Test:** Check sunflower logo and any other images
**Expected:**
- All images have descriptive alt text
- Alt text for logo includes brand name
**Bug Risk:** Missing alt text, broken accessibility

### S5. Keyboard Navigation
**Test:** Navigate entire page using only Tab key
**Expected:**
- All interactive elements focusable
- Focus order logical (top to bottom, left to right)
- Focus indicators visible
**Bug Risk:** Skip links missing, focus trap in editor, invisible focus states

### S6. ARIA Labels on Buttons
**Test:** Inspect toolbar buttons (Clear, Undo, Redo, Bold, Italic, etc.)
**Expected:**
- Each button has title or aria-label
- Screen readers can announce button purpose
**Bug Risk:** Buttons without accessible names

### S7. Color Contrast
**Test:** Check contrast ratios for:
- Placeholder text
- Metric values
- Button text
**Expected:** 
- 4.5:1 minimum for normal text
- 3:1 minimum for large text
**Bug Risk:** Light gray text on white failing WCAG AA

### S8. Dark Mode Support
**Test:** Toggle system/browser dark mode
**Expected:**
- All elements switch to dark theme
- Text remains readable
- No white flashes during transition
**Bug Risk:** Elements not themed, poor contrast in dark mode

### S9. FAQ Schema Implementation
**Test:** Check for FAQPage structured data
**Expected:**
- FAQPage schema present
- Questions and answers marked up correctly
- Valid JSON-LD
**Bug Risk:** No schema, invalid markup, rich results not appearing

### S10. Core Web Vitals
**Test:** Run Lighthouse audit on homepage
**Expected:**
- LCP (Largest Contentful Paint): < 2.5s
- FID/INP: < 100ms
- CLS (Cumulative Layout Shift): < 0.1
**Bug Risk:** Large hero image not optimized, layout shifts from dynamic content

---

## 4. FEATURE-SPECIFIC TESTING - 10 Critical Test Cases

### F1. Clear All Button
**Test:** Add text, click Clear button
**Expected:**
- All text removed
- Metrics reset to 0
- History cleared (undo not available)
- Confirmation not required (or optional)
**Bug Risk:** Partial clear, history not reset

### F2. Bold/Italic Keyboard Shortcuts
**Test:** Cmd+B and Cmd+I (Ctrl on Windows)
**Expected:**
- Selection becomes bold/italic
- Works with and without selection
- Toggle off when applied twice
**Bug Risk:** Shortcuts not working, conflict with browser defaults

### F3. Toolbar Button Touch Targets (Mobile)
**Test:** On mobile, tap each toolbar button
**Expected:**
- All buttons have 44x44px minimum touch area
- No accidental adjacent button presses
- Visual feedback on tap
**Bug Risk:** Buttons too small, no tap feedback

### F4. Related Keywords Component
**Test:** Enter SEO keyword and check related keywords suggestions
**Expected:**
- Relevant suggestions appear
- Clicking suggestion updates main keyword field
- Loading state while fetching
**Bug Risk:** No suggestions loading, broken click handler

### F5. Rephrase with Selection vs Full Text
**Test:** 
1. Select partial text → Rephrase (only selection should change)
2. No selection → Rephrase (all text should change)
**Expected:** Correct behavior for both cases
**Bug Risk:** Wrong scope of replacement, cursor position issues after replace

### F6. Rephrase Character Limit
**Test:** Try to rephrase text > 5000 characters
**Expected:**
- Error message: "Text too long (max 5000 characters)"
- API call prevented
**Bug Risk:** API call made anyway, no error handling

### F7. Sentence Case Transformation
**Test:** Select "HELLO WORLD. GOODBYE WORLD." → Click Sentence Case
**Expected:** "Hello world. Goodbye world."
**Bug Risk:** Multiple sentences not handled, periods not recognized as sentence end

### F8. Statistics Grid Responsiveness
**Test:** Resize browser from desktop to tablet to mobile
**Expected:**
- 6 columns on desktop → 3 columns on tablet → 2 columns on mobile
- Numbers remain readable
- No overflow or truncation
**Bug Risk:** Grid not responsive, values truncated

### F9. Browser History Navigation
**Test:** Add text, navigate to another page, click browser back button
**Expected:**
- Return to homepage
- Text preserved (if localStorage enabled)
- Metrics recalculated
**Bug Risk:** Text lost, state not restored

### F10. Concurrent Editing and Analysis
**Test:** Type rapidly while keyword analysis is running
**Expected:**
- No race conditions
- Latest text state always reflected
- No duplicate entries in history
**Bug Risk:** Stale analysis results, flickering metrics

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
1. SEO/Accessibility (affects all users and search ranking)
2. Input tests (core functionality)
3. Output tests (user value delivery)
4. Feature-specific tests (extended functionality)
