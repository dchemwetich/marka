import { writable } from 'svelte/store'

// Single source of truth — the raw markdown string
export const markdown = writable(`# Hello, Marka ✦

Start writing your markdown here...

## Features
- Live preview
- Export to **PDF**
- Export to **DOCX**

## Code Example
\`\`\`javascript
const greet = (name) => {
  console.log(\`Hello, \${name}!\`)
}
\`\`\`

> "Write once, export anywhere."
`)

// Active tab: 'editor' | 'split' | 'preview'
export const activeTab = writable('split')

// Word count — computed in components via $derived instead
// Char count — computed in components via $derived instead