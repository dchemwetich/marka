<script>
  import { onMount } from 'svelte'
  import { activeTab, markdown } from '$lib/stores/editor.js'
  import Toolbar from '$lib/components/Toolbar.svelte'
  import Editor from '$lib/components/Editor.svelte'
  import Preview from '$lib/components/Preview.svelte'
  import { exportPDF } from '$lib/utils/pdfExport.js'
  import { exportDOCX } from '$lib/utils/docxExport.js'

let previewEl = $state(null)
  let isDragging = $state(false)
  let editorWidth = $state(50) // percent

  // Get preview DOM el from Preview component
function getPreviewEl() {
  return previewEl
}
  async function handleExportPDF() {
    const el = getPreviewEl()
    await exportPDF(el)
  }

  async function handleExportDOCX() {
    await exportDOCX($markdown)
  }

  // Keyboard shortcuts via custom events from Editor
  onMount(() => {
    document.addEventListener('export:pdf', handleExportPDF)
    document.addEventListener('export:docx', handleExportDOCX)

    return () => {
      document.removeEventListener('export:pdf', handleExportPDF)
      document.removeEventListener('export:docx', handleExportDOCX)
    }
  })

  // Drag to resize
  function onDragStart(e) {
    isDragging = true
    e.preventDefault()
  }

  function onDrag(e) {
    if (!isDragging) return
    const workspace = document.getElementById('workspace')
    const rect = workspace.getBoundingClientRect()
    const x = e.clientX - rect.left
    const pct = (x / rect.width) * 100
    editorWidth = Math.min(80, Math.max(20, pct))
  }

  function onDragEnd() {
    isDragging = false
  }
</script>

<svelte:window onmousemove={onDrag} onmouseup={onDragEnd} />

<div class="app">
  <Toolbar
    onExportPDF={handleExportPDF}
    onExportDOCX={handleExportDOCX}
  />

  <div
    id="workspace"
    class="workspace"
  >
    <!-- Editor pane -->
    {#if $activeTab !== 'preview'}
      <div
        class="pane"
        style={$activeTab === 'split' ? `width: ${editorWidth}%` : 'width: 100%'}
      >
        <Editor />
      </div>
    {/if}

    <!-- Drag handle -->
    {#if $activeTab === 'split'}
<button
  class="drag-handle"
  onmousedown={onDragStart}
  aria-label="Resize panels"
>
  <span></span>
  <span></span>
  <span></span>
</button>
    {/if}

    <!-- Preview pane -->
    {#if $activeTab !== 'editor'}
      <div
        class="pane"
        style={$activeTab === 'split' ? `width: ${100 - editorWidth}%` : 'width: 100%'}
      >
      <Preview bind:ref={previewEl} />
      </div>
    {/if}
  </div>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    background: #0a0a0a;
  }

  .workspace {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .pane {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
  }

  /* Drag handle */
.drag-handle {
  appearance: none;
  border: none;
  padding: 0;
  width: 12px;
  background: #111;
  border-left: 1px solid #1a1a1a;
  border-right: 1px solid #1a1a1a;
  cursor: col-resize;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  flex-shrink: 0;
  transition: background .15s;
}

  .drag-handle:hover {
    background: #1a1a1a;
  }

  .drag-handle span {
    width: 3px;
    height: 3px;
    background: #333;
    border-radius: 50%;
    transition: background .15s;
  }

  .drag-handle:hover span {
    background: #b54a24;
  }
</style>