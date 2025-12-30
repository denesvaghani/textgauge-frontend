# QA Testing Document: Diff Checker

**Tool URL:** `/diff-checker`
**Component:** `diff-checker/page.tsx`, `DiffViewer.tsx`, `SimpleCodeEditor.tsx`
**Priority:** High
**Last Updated:** 2025-12-30

---

## 1. INPUT TESTING - 10 Critical Test Cases

### I1. Identical Texts
**Test:** Paste identical text in both Original and Modified
**Expected:**
- "No differences found" or similar message
- No highlighted changes
**Bug Risk:** False positives shown

### I2. Completely Different Texts
**Test:** Paste entirely different content in each editor
**Expected:**
- All lines marked as additions/deletions
- Diff computed without crashing
**Bug Risk:** Diff algorithm hangs

### I3. Single Character Difference
**Test:** Original: "Hello World", Modified: "Hello World!" (added !)
**Expected:**
- Only the exclamation mark highlighted as addition
- Line marked as changed (not full replacement)
**Bug Risk:** Entire line marked as different

### I4. Line Additions
**Test:** Original has 5 lines, Modified has 7 lines (2 added)
**Expected:**
- Added lines highlighted in green
- Original lines preserved
- Line numbers accurate
**Bug Risk:** Lines misaligned

### I5. Line Deletions
**Test:** Original has 7 lines, Modified has 5 lines (2 removed)
**Expected:**
- Deleted lines highlighted in red
- Remaining lines aligned
**Bug Risk:** Wrong lines marked as deleted

### I6. Large File Comparison (10K+ Lines)
**Test:** Compare two large files (10,000+ lines each)
**Expected:**
- Comparison completes within 5 seconds
- No browser freeze
- Scrolling smooth
**Bug Risk:** Performance issues, memory crash

### I7. File Upload (Original)
**Test:** Click upload button for Original editor
**Expected:**
- File picker opens
- Content loaded into Original editor
- Works for .txt, .json, .yaml, etc.
**Bug Risk:** Upload fails silently

### I8. File Upload (Modified)
**Test:** Upload file to Modified editor
**Expected:**
- Works independently of Original
- File loaded correctly
**Bug Risk:** Wrong editor receives content

### I9. Empty Editor Comparison
**Test:** Leave one or both editors empty, click Compare
**Expected:**
- If both empty: "Nothing to compare" message
- If one empty: Shows all as additions/deletions
**Bug Risk:** Error thrown, confusing output

### I10. Whitespace-Only Differences
**Test:** Original: "hello", Modified: "hello " (trailing space)
**Expected:**
- Whitespace difference detected
- Clearly indicated (may require option to show)
**Bug Risk:** Whitespace ignored, user confused

---

## 2. OUTPUT TESTING - 10 Critical Test Cases

### O1. Side-by-Side View
**Test:** Compare and select "Side by Side" view mode
**Expected:**
- Original on left, Modified on right
- Lines aligned horizontally
- Deletions red on left, additions green on right
**Bug Risk:** Lines not aligned, colors wrong

### O2. Unified View
**Test:** Compare and select "Unified" view mode
**Expected:**
- Single column output
- Deleted lines prefixed with - (red)
- Added lines prefixed with + (green)
- Context lines shown
**Bug Risk:** Wrong format, missing context

### O3. View Mode Toggle
**Test:** Switch between Side-by-Side and Unified multiple times
**Expected:**
- Instant re-render
- No data loss
- Selection remembered
**Bug Risk:** View doesn't update, state issues

### O4. Diff Statistics
**Test:** Check additions/deletions count in output
**Expected:**
- "N additions, M deletions" summary
- Accurate counts
**Bug Risk:** Counts incorrect or missing

### O5. Line Number Display
**Test:** Verify line numbers in diff output
**Expected:**
- Original line numbers on left
- Modified line numbers on right
- Empty cells for added/deleted lines
**Bug Risk:** Line numbers wrong or missing

### O6. Changes Auto-Update
**Test:** Modify text after comparison, compare again
**Expected:**
- Diff updates with new changes
- Previous diff replaced
**Bug Risk:** Stale diff shown

### O7. Scroll Synchronization
**Test:** In side-by-side view, scroll one side
**Expected:**
- Other side scrolls in sync
- Alignment maintained
**Bug Risk:** Scroll desync

### O8. Copy Diff Output
**Test:** If copy feature exists, copy diff result
**Expected:**
- Diff copied in readable format
- Context preserved
**Bug Risk:** No copy feature or broken output

### O9. Word-Level Diff (if supported)
**Test:** Check for inline word highlighting
**Expected:**
- Changed words within lines highlighted
- Not just entire lines marked
**Bug Risk:** Coarse line-only diff

### O10. Binary/Non-Text Files
**Test:** Upload a binary file (image, etc.)
**Expected:**
- Error message or warning
- Not attempted as text diff
**Bug Risk:** Garbage output, crash

---

## 3. SEO & ACCESSIBILITY TESTING - 10 Critical Test Cases

### S1. Page Title
**Test:** Check `<title>` tag
**Expected:**
- "Diff Checker - Compare Text & Code Differences | TextGauge"
**Bug Risk:** Missing or generic title

### S2. Meta Description
**Test:** Check meta description content
**Expected:**
- Contains "diff checker", "compare text", "file comparison"
- 150-160 characters
**Bug Risk:** Too short or missing

### S3. H1 Heading
**Test:** Single H1 present
**Expected:**
- "Diff Checker" as H1
- Red Rose theme colors
**Bug Risk:** Multiple H1s

### S4. Format Badges Accessibility
**Test:** Check format badges (JSON, YAML, etc.)
**Expected:**
- Badges have alt text or aria-label
- Decorative role if not interactive
**Bug Risk:** Meaningless to screen readers

### S5. Keyboard Shortcut Discoverability
**Test:** Check if Cmd+Enter shortcut is documented
**Expected:**
- Visible keyboard hint near Compare button
- Works when in editor focus
**Bug Risk:** Hidden feature

### S6. Technical Features Content
**Test:** Check "Technical Specifications" section
**Expected:**
- Explains Myers Diff Algorithm
- Privacy messaging (client-side)
- Professional technical writing
**Bug Risk:** Too technical or too vague

### S7. FAQ Section
**Test:** Expand/collapse FAQs
**Expected:**
- All FAQs toggle correctly
- Content accurate
- Schema markup present
**Bug Risk:** Broken accordion

### S8. Mobile Two-Editor Layout
**Test:** Use on mobile device
**Expected:**
- Editors stack vertically
- Both usable independently
- Diff result scrollable
**Bug Risk:** Editors too small, unusable

### S9. Color Accessibility (Red/Green)
**Test:** View diff with colorblind simulation
**Expected:**
- Red/green not only distinguishing factor
- Icons or text labels also used
**Bug Risk:** Color-only differentiation

### S10. Theme Consistency (Red Rose)
**Test:** Verify Red Rose flower theme
**Expected:**
- Rose/red accent colors
- Flower badge visible
**Bug Risk:** Wrong theme

---

## 4. FEATURE-SPECIFIC TESTING - 10 Critical Test Cases

### F1. Compare Button State
**Test:** Check Compare button when editors empty
**Expected:**
- Button disabled or shows appropriate state
- Enabled when at least one has content
**Bug Risk:** Button clickable but does nothing

### F2. Swap Button
**Test:** Click Swap to exchange Original and Modified
**Expected:**
- Contents exchanged
- Diff automatically updated
**Bug Risk:** Swap fails, content lost

### F3. Clear All Button
**Test:** Click Clear All
**Expected:**
- Both editors cleared
- Diff result cleared
- Fresh state restored
**Bug Risk:** Partial clear

### F4. Load Sample Button
**Test:** Click Load Sample
**Expected:**
- Both editors populated with sample data
- Samples show clear differences
**Bug Risk:** Missing or unhelpful samples

### F5. Clear Individual Editor
**Test:** Click trash icon on single editor
**Expected:**
- Only that editor cleared
- Other editor preserved
**Bug Risk:** Both cleared

### F6. Upload to Specific Editor
**Test:** Upload to Original vs Modified
**Expected:**
- Files load to correct editor
- Buttons clearly indicate which
**Bug Risk:** Confusing UI

### F7. Keyboard Shortcut (Cmd+Enter)
**Test:** Press Cmd+Enter after entering text
**Expected:**
- Compare triggered
- Same as clicking button
**Bug Risk:** Shortcut not working

### F8. Status Bar Statistics
**Test:** Check Lines, Chars, Size in status bars
**Expected:**
- Each editor shows own stats
- Updates on input
**Bug Risk:** Stats shared or wrong

### F9. Related Tools Navigation
**Test:** Click JSON, YAML, TOML formatter links
**Expected:**
- Navigate to correct pages
- Links work
**Bug Risk:** Broken links

### F10. Myers Diff Algorithm Correctness
**Test:** Compare known diff cases
**Expected:**
- Minimal edit distance computed
- Same result as `diff` command
**Bug Risk:** Suboptimal diff, wrong changes

---

## Summary

| Category | Test Cases | Priority |
|----------|------------|----------|
| Input | 10 | High |
| Output | 10 | Critical |
| SEO/Accessibility | 10 | High |
| Feature-Specific | 10 | High |
| **Total** | **40** | - |

**Diff Checker Unique Considerations:**
- Two input editors (not one)
- Myers Diff Algorithm implementation
- Side-by-side vs Unified views
- Color accessibility critical (red/green)
- Performance with large files
