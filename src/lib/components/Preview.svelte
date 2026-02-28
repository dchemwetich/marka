<script>
  import { markdown } from '$lib/stores/editor.js'
  import { marked } from 'marked'
  import { markedHighlight } from 'marked-highlight'
  import hljs from 'highlight.js'
  import 'highlight.js/styles/github-dark.css'

  marked.use(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
      }
    })
  )

  marked.setOptions({ gfm: true, breaks: true })

  let { ref = $bindable() } = $props()

  let html = $derived(marked.parse($markdown))
</script>

<div class="preview-pane">
  <div class="pane-label">PREVIEW</div>
  <div class="preview-scroll">
    <article
      class="prose-paper"
      bind:this={ref}
    >
      {@html html}
    </article>
  </div>
</div>

<style>
  .preview-pane {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #f5f0e8;
    overflow: hidden;
  }

  .pane-label {
    font-family: 'Syne', sans-serif;
    font-size: .65rem;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: #999;
    padding: 8px 16px 6px;
    border-bottom: 1px solid #e0dbd0;
    background: #ede8db;
    flex-shrink: 0;
  }

  .preview-scroll {
    flex: 1;
    overflow-y: auto;
    padding: 36px 44px;
  }

  .preview-scroll::-webkit-scrollbar { width: 5px; }
  .preview-scroll::-webkit-scrollbar-track { background: #ede8db; }
  .preview-scroll::-webkit-scrollbar-thumb { background: #c4bfb0; border-radius: 3px; }

  /* ── Prose styles ── */
  :global(.prose-paper) {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 15.5px;
    line-height: 1.85;
    color: #1a1410;
    max-width: 680px;
  }

  :global(.prose-paper h1) {
    font-family: 'Syne', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 .5em;
    padding-bottom: .3em;
    border-bottom: 2.5px solid #b54a24;
    color: #0d0d0d;
    line-height: 1.2;
  }

  :global(.prose-paper h2) {
    font-family: 'Syne', sans-serif;
    font-size: 1.35rem;
    font-weight: 700;
    margin: 1.8em 0 .4em;
    color: #0d0d0d;
  }

  :global(.prose-paper h3) {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    margin: 1.4em 0 .3em;
    color: #2a1e14;
  }

  :global(.prose-paper p) {
    margin: 0 0 1em;
  }

  :global(.prose-paper ul, .prose-paper ol) {
    margin: 0 0 1em 1.4em;
  }

  :global(.prose-paper li) {
    margin-bottom: .3em;
  }

  :global(.prose-paper blockquote) {
    border-left: 3px solid #b54a24;
    margin: 1.2em 0;
    padding: .5em 1em;
    background: #ede8db;
    font-style: italic;
    color: #4a3a2a;
  }

  :global(.prose-paper code) {
    font-family: 'JetBrains Mono', monospace;
    background: #e2ddd4;
    padding: .15em .4em;
    border-radius: 3px;
    font-size: .85em;
    color: #b54a24;
  }

  :global(.prose-paper pre) {
    margin: 1em 0;
    border-radius: 8px;
    overflow-x: auto;
  }

  :global(.prose-paper pre code) {
    background: none;
    padding: 0;
    color: inherit;
    font-size: .85em;
  }

  :global(.prose-paper a) {
    color: #b54a24;
    text-decoration: underline;
  }

  :global(.prose-paper strong) {
    font-weight: 700;
  }

  :global(.prose-paper em) {
    font-style: italic;
  }

  :global(.prose-paper hr) {
    border: none;
    border-top: 1px solid #c4bfb0;
    margin: 1.8em 0;
  }

  :global(.prose-paper table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    font-size: .9em;
  }

  :global(.prose-paper th) {
    background: #0d0d0d;
    color: #f5f0e8;
    padding: .5em .8em;
    text-align: left;
    font-family: 'Syne', sans-serif;
    font-size: .8rem;
    letter-spacing: .04em;
  }

  :global(.prose-paper td) {
    padding: .5em .8em;
    border-bottom: 1px solid #d8d0c0;
  }

  :global(.prose-paper tr:nth-child(even) td) {
    background: #ede8db;
  }
</style>