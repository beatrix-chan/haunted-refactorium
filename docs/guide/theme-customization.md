# Theme Customization

Haunted Refactorium offers flexible theming to match your preferences and needs.

## Theme Modes

### 🎃 Spooky Mode (Default)

Halloween-themed interface with playful terminology:

**Visual Style:**

- Dark purple background (#1a0b2e)
- Orange accents (#ff6b35)
- Green highlights (#2dd881)
- Floating ghost animations
- Spooky iconography

**Terminology:**

- "Cursed Files" instead of "Critical Issues"
- "Ghostly Dependencies" instead of "Deprecated Packages"
- "Haunted" for high severity
- "Spooky" for medium severity
- "Begin the Haunting" instead of "Start Analysis"

**When to Use:**

- Internal team reviews
- Fun presentations
- Developer demos
- Casual environments
- Halloween season! 🎃

### 💼 Professional Mode

Business-appropriate interface with formal terminology:

**Visual Style:**

- Same color scheme (still looks good!)
- No animations
- Professional iconography
- Clean, modern design

**Terminology:**

- "Critical Issues" instead of "Cursed Files"
- "Deprecated Packages" instead of "Ghostly Dependencies"
- "High Priority" for high severity
- "Medium Priority" for medium severity
- "Start Analysis" instead of "Begin the Haunting"

**When to Use:**

- Client presentations
- Executive reviews
- Formal reports
- Conservative environments
- Professional settings

## Accessibility Options

### 🔆 High Contrast Mode

Enhanced visibility for better readability:

**Changes:**

- Pure black background (#000000)
- Pure white text (#ffffff)
- Increased contrast ratios
- Bolder borders
- Clearer focus indicators

**Benefits:**

- Better for low vision users
- Easier to read in bright light
- Reduces eye strain
- WCAG AAA compliant

**When to Use:**

- Visual impairments
- Bright environments
- Extended reading sessions
- Accessibility requirements

### Aa Font Selection

Choose between two font options:

#### JetBrains Mono (Default)

**Characteristics:**

- Monospace font
- Clear character distinction
- Good for code
- Developer-friendly

**Best For:**

- Developers
- Code-heavy interfaces
- Technical users
- Default choice

#### OpenDyslexic

**Characteristics:**

- Designed for dyslexia
- Weighted bottoms
- Unique character shapes
- Easier to read for some

**Best For:**

- Dyslexic users
- Reading difficulties
- Accessibility needs
- Personal preference

## How to Toggle Themes

### In the Application

All theme controls are in the header:

**Spooky/Professional Toggle:**

```
Click: 🎃 Spooky ↔ 💼 Professional
```

**High Contrast Toggle:**

```
Click: 🔆 High Contrast ↔ 🌙 Normal
```

**Font Toggle:**

```
Click: Aa (cycles between fonts)
```

### Keyboard Shortcuts

For accessibility, use keyboard navigation:

```
Tab - Navigate to theme controls
Enter - Toggle selected option
Escape - Close any open menus
```

### Persistence

Theme preferences are saved:

- Stored in browser localStorage
- Persists across sessions
- Per-device setting
- Instant application

## Customizing Colors

### For Developers

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        haunted: {
          dark: '#1a0b2e', // Background
          purple: '#4a1a6b', // Primary
          orange: '#ff6b35', // Accent
          green: '#2dd881', // Success
          gray: '#2d2d3a', // Secondary
        },
      },
    },
  },
};
```

### CSS Variables

Override in `src/frontend/index.css`:

```css
:root {
  --haunted-dark: #1a0b2e;
  --haunted-purple: #4a1a6b;
  --haunted-orange: #ff6b35;
  --haunted-green: #2dd881;
  --haunted-gray: #2d2d3a;
}

.high-contrast {
  --haunted-dark: #000000;
  --haunted-gray: #1a1a1a;
}
```

## Adding Custom Themes

### 1. Define Theme

Create theme object in `ThemeContext.tsx`:

```typescript
interface ThemeMode {
  spooky: boolean;
  highContrast: boolean;
  font: 'jetbrains' | 'dyslexic';
  customTheme?: 'dark' | 'light' | 'custom';
}
```

### 2. Add Toggle

Add button in `Header.tsx`:

```tsx
<button
  onClick={() => updateTheme({ customTheme: 'light' })}
  className="px-4 py-2 bg-haunted-gray rounded"
>
  ☀️ Light Mode
</button>
```

### 3. Apply Styles

Add CSS classes:

```css
.light-theme {
  --haunted-dark: #ffffff;
  --haunted-purple: #6b4a1a;
  --haunted-orange: #ff6b35;
  --haunted-green: #2dd881;
  --haunted-gray: #f0f0f0;
}
```

## Terminology Mapping

### Spooky → Professional

| Spooky               | Professional        |
| -------------------- | ------------------- |
| Cursed               | Critical            |
| Haunted              | High Priority       |
| Spooky               | Medium Priority     |
| Clean                | No Issues           |
| Ghostly Dependencies | Deprecated Packages |
| Cursed Files         | Problem Files       |
| Begin the Haunting   | Start Analysis      |
| Resurrection Plan    | Migration Plan      |
| Exorcise Code Smells | Fix Issues          |

### Implementation

In components, use the theme context:

```tsx
const { theme } = useTheme();

<h2>{theme.spooky ? '👻 Ghostly Dependencies' : '⚠️ Deprecated Packages'}</h2>;
```

## Accessibility Compliance

### WCAG AA Standards

All themes meet WCAG AA requirements:

**Color Contrast:**

- Text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

**High Contrast Mode:**

- Exceeds WCAG AAA (7:1)
- Maximum readability
- Clear focus indicators

### Screen Reader Support

Themes don't affect screen readers:

- Semantic HTML maintained
- ARIA labels consistent
- Meaningful text alternatives
- Logical reading order

### Keyboard Navigation

All theme controls are keyboard accessible:

- Tab to navigate
- Enter to activate
- Escape to cancel
- Focus indicators visible

## Best Practices

### Choosing a Theme

**Use Spooky Mode when:**

- Internal team use
- Fun, casual environment
- Developer audience
- Halloween season

**Use Professional Mode when:**

- Client presentations
- Executive meetings
- Formal reports
- Conservative audience

**Use High Contrast when:**

- Accessibility needs
- Bright environments
- Extended use
- Visual impairments

### Consistency

**Within a session:**

- Keep same theme throughout
- Don't switch mid-presentation
- Maintain consistency

**Across team:**

- Agree on default for meetings
- Document preference
- Respect accessibility needs

### Testing

**Before presenting:**

- Test theme in actual environment
- Check readability
- Verify all features work
- Practice theme switching

## Future Enhancements

### Planned Features

- **Custom color schemes** - User-defined colors
- **Theme presets** - Pre-made themes
- **Dark/Light toggle** - Beyond high contrast
- **Animation controls** - Disable animations
- **Font size adjustment** - Zoom controls
- **Color blind modes** - Specialized palettes

### Community Themes

Want to contribute a theme?

- Fork the repository
- Create your theme
- Submit a pull request
- Share with the community

## Next Steps

- [Accessibility](/guide/accessibility) - Full accessibility features
- [Quick Start](/guide/quick-start) - Try different themes
- [Contributing](/guide/contributing) - Add new themes
