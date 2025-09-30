# Artifact Types Guide

## Welcome to Digital Artifacts!

Digital artifacts are **live, interactive content** that Claude can create and render directly in your browser. This document showcases the Markdown artifact format.

---

## Available Artifact Types

### 1. React Components (.jsx)
The most powerful artifact type for creating interactive user interfaces.

**Features:**
- Full React hooks support (useState, useEffect, etc.)
- Tailwind CSS for styling
- Popular libraries like lucide-react, recharts, d3
- Real-time interactivity

**Best for:** Dashboards, calculators, games, data visualizations

### 2. HTML Pages (.html)
Traditional web pages with CSS and JavaScript in a single file.

**Features:**
- Complete HTML5 support
- Embedded CSS and JavaScript
- CDN library imports
- Form handling and DOM manipulation

**Best for:** Landing pages, portfolios, simple web apps

### 3. Markdown Documents (.md)
Formatted text documents like this one!

**Features:**
- Headers, lists, and formatting
- Code blocks and syntax highlighting
- Tables and blockquotes
- Links and images

**Best for:** Documentation, reports, articles, guides

### 4. SVG Graphics (.svg)
Scalable vector graphics with animations.

**Features:**
- Resolution-independent graphics
- CSS animations and transformations
- Filters and gradients
- Interactive elements

**Best for:** Icons, diagrams, illustrations, infographics

### 5. Mermaid Diagrams (.mermaid)
Flowcharts and diagrams from text descriptions.

**Features:**
- Flowcharts and sequence diagrams
- Gantt charts and timelines
- Entity relationship diagrams
- State diagrams

**Best for:** Process flows, architecture diagrams, planning

---

## When to Use Artifacts

Claude creates artifacts for:

✅ Substantial, self-contained content  
✅ Code that users might want to modify  
✅ Content intended for reuse outside the conversation  
✅ Interactive demonstrations  
✅ Visual presentations  

Claude avoids artifacts for:

❌ Simple code snippets  
❌ Brief explanations  
❌ Conversational responses  
❌ Quick answers  

---

## Example Use Cases

| Artifact Type | Example Use Case |
|---------------|------------------|
| React | Interactive budget calculator |
| HTML | Personal portfolio website |
| Markdown | Project documentation |
| SVG | Custom logo design |
| Mermaid | Software architecture diagram |

---

## Pro Tips

> **Tip 1:** You can edit artifacts! Ask Claude to modify them after creation.

> **Tip 2:** Artifacts can import libraries from CDNs for extended functionality.

> **Tip 3:** React artifacts support the full React ecosystem including hooks and component patterns.

---

## Code Example

Here's a simple JavaScript function:

```javascript
function greet(name) {
  return `Hello, ${name}! Welcome to artifacts.`;
}

console.log(greet("World"));
```

---

## Conclusion

Artifacts transform Claude from a text-based assistant into a **creative development partner** that can produce live, working applications and documents instantly.

**Ready to create something?** Just tell Claude what you need!

---

*Generated as a Markdown artifact • September 29, 2025*