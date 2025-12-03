# Accessibility

Haunted Refactorium is built with accessibility as a top priority, ensuring everyone can use the application effectively.

## WCAG Compliance

We meet **WCAG 2.1 Level AA** standards:

- Color contrast ratios meet requirements
- Keyboard navigation fully supported
- Screen reader compatible
- Focus indicators visible
- Semantic HTML throughout

## Visual Accessibility

### High Contrast Mode

Toggle high contrast for better visibility:

- Pure black background (#000000)
- Pure white text (#ffffff)
- Increased contrast ratios (7:1+)
- Bolder borders and outlines
- Clearer focus indicators

**How to enable:** Click "🔆 High Contrast" in header

### Color Contrast

All text meets WCAG AA standards:

- **Normal text:** 4.5:1 minimum
- **Large text:** 3:1 minimum
- **UI components:** 3:1 minimum

**High contrast mode:** Exceeds WCAG AAA (7:1+)

### Font Options

Choose between two fonts:

**JetBrains Mono (Default):**

- Monospace font
- Clear character distinction
- Good for code
- Developer-friendly

**OpenDyslexic:**

- Designed for dyslexia
- Weighted bottoms
- Unique character shapes
- Easier to read for some users

**How to toggle:** Click "Aa" button in header

## Keyboard Navigation

### Full Keyboard Support

Navigate without a mouse:

- **Tab** - Move to next element
- **Shift + Tab** - Move to previous element
- **Enter** - Activate buttons/links
- **Space** - Toggle checkboxes
- **Escape** - Close modals/menus
- **Arrow keys** - Navigate lists

### Focus Indicators

Clear visual indicators show keyboard focus:

- Visible outline on focused elements
- High contrast in high contrast mode
- Never hidden or removed
- Consistent across all components

### Skip Navigation

Skip to main content:

- Press Tab on page load
- "Skip to main content" link appears
- Press Enter to skip header
- Saves time for keyboard users

## Screen Reader Support

### Semantic HTML

Proper HTML structure:

- Headings in logical order (h1, h2, h3)
- Lists for grouped items
- Tables for tabular data
- Forms with proper labels

### ARIA Labels

Descriptive labels on all interactive elements:

```html
<button aria-label="Toggle spooky mode">🎃 Spooky</button>

<input type="file" aria-label="Upload code archive" aria-describedby="file-help" />
```

### Status Announcements

Screen readers announce:

- Analysis progress
- Error messages
- Success notifications
- Loading states

### Alternative Text

All images and icons have alt text:

- Decorative images: `alt=""`
- Meaningful images: Descriptive alt text
- Icons: ARIA labels

## Motor Accessibility

### Large Click Targets

All interactive elements meet size requirements:

- Minimum 44×44 pixels
- Adequate spacing between elements
- Easy to click/tap
- No precision required

### No Time Limits

No time-based interactions:

- No auto-advancing content
- No session timeouts during analysis
- Users control pace
- Can pause and resume

### Error Prevention

Help prevent errors:

- Confirmation for destructive actions
- Clear error messages
- Suggestions for fixes
- Easy to undo

## Cognitive Accessibility

### Clear Language

Simple, direct language:

- Short sentences
- Common words
- Clear instructions
- Consistent terminology

### Visual Hierarchy

Clear content structure:

- Important info first
- Logical grouping
- Visual separation
- Consistent layout

### Error Messages

Helpful error messages:

- What went wrong
- Why it happened
- How to fix it
- Where to get help

### Progress Indicators

Show progress clearly:

- Percentage complete
- Current step
- Estimated time
- Visual progress bar

## Testing Tools

### Keyboard Testing

Test keyboard navigation:

1. Unplug mouse
2. Use only keyboard
3. Navigate entire app
4. Verify all features work

### Screen Reader Testing

Test with screen readers:

- **NVDA** (Windows, free)
- **JAWS** (Windows, paid)
- **VoiceOver** (Mac, built-in)
- **TalkBack** (Android, built-in)

### Automated Testing

Run accessibility checks:

```bash
# Install axe-core
npm install -D @axe-core/cli

# Run audit
npx axe http://localhost:3000
```

## Accessibility Features by Section

### Homepage

- Clear heading structure
- Keyboard-accessible file upload
- Alternative text on icons
- Focus indicators on buttons

### Analysis Dashboard

- Sortable tables (keyboard accessible)
- Screen reader announcements for updates
- Clear severity indicators
- Keyboard navigation through results

### Architecture Proposal

- Expandable sections (keyboard accessible)
- Clear phase structure
- Downloadable content
- Print-friendly layout

## Known Limitations

### Current Limitations

- D3 visualizations (planned) may need additional work
- Some animations can't be disabled yet
- Limited mobile optimization

### Planned Improvements

- Animation controls (reduce motion)
- Mobile-responsive design
- Voice control support
- More font options

## Reporting Issues

Found an accessibility issue?

1. **Open an issue** on GitHub
2. **Describe the problem** clearly
3. **Include your setup:**
   - Browser and version
   - Screen reader (if applicable)
   - Operating system
4. **Steps to reproduce**

We prioritize accessibility fixes!

## Resources

### Learn More

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)

### Testing Tools

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## Next Steps

- [Theme Customization](/guide/theme-customization) - Adjust visual settings
- [Quick Start](/guide/quick-start) - Try accessibility features
- [Contributing](/guide/contributing) - Help improve accessibility
