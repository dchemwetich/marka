<script>
  import { markdown } from '$lib/stores/editor.js'

  function handleKeydown(e) {
    // Tab = 2 spaces
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      $markdown = $markdown.substring(0, start) + '  ' + $markdown.substring(end)
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2
      }, 0)
    }

    // Ctrl+Shift+D = PDF
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      e.preventDefault()
      document.dispatchEvent(new CustomEvent('export:pdf'))
    }

    // Ctrl+Shift+W = DOCX
    if (e.ctrlKey && e.shiftKey && e.key === 'W') {
      e.preventDefault()
      document.dispatchEvent(new CustomEvent('export:docx'))
    }
  }
</script>

<div class="editor-pane">
  <div class="pane-label">MARKDOWN</div>
  <textarea
    class="editor"
    bind:value={$markdown}
    onkeydown={handleKeydown}
    spellcheck="false"
    placeholder="# Start writing..."
  ></textarea>
</div>

<style>
  .editor-pane {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #0d0d0d;
    overflow: hidden;
  }

  .pane-label {
    font-family: 'Syne', sans-serif;
    font-size: .65rem;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: #333;
    padding: 8px 16px 6px;
    border-bottom: 1px solid #161616;
    background: #0d0d0d;
    flex-shrink: 0;
  }

  .editor {
    flex: 1;
    width: 100%;
    background: #0d0d0d;
    color: #c8c2b5;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13.5px;
    line-height: 1.75;
    padding: 20px 22px;
    border: none;
    outline: none;
    resize: none;
    caret-color: #b54a24;
    overflow-y: auto;
  }

  .editor::selection {
    background: rgba(181, 74, 36, 0.25);
  }

  .editor::-webkit-scrollbar { width: 5px; }
  .editor::-webkit-scrollbar-track { background: #0d0d0d; }
  .editor::-webkit-scrollbar-thumb { background: #222; border-radius: 3px; }
</style>

<!-- <script>
  // Props: value (markdown), onInput
  export let value = '';
  export let onInput = () => {};
</script>
<textarea
  bind:value
  on:input={onInput}
  class="editor-textarea"
  rows="20"
  placeholder="Write your markdown here..."
></textarea>
<style>
.editor-textarea {
  width: 100%;
  font-family: monospace;
  font-size: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
}
</style> -->
