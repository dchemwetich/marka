<script>
import { activeTab, markdown } from '$lib/stores/editor.js'

let wordCount = $derived(
  $markdown.replace(/[#*`_~\[\]()>-]/g, '').trim()
    ? $markdown.replace(/[#*`_~\[\]()>-]/g, '').trim().split(/\s+/).filter(Boolean).length
    : 0
)

let charCount = $derived($markdown.length)

  

  let { onExportPDF, onExportDOCX } = $props()

  let showExportMenu = $state(false)

  function toggleMenu() {
    showExportMenu = !showExportMenu
  }

  function handlePDF() {
    showExportMenu = false
    onExportPDF()
  }

  function handleDOCX() {
    showExportMenu = false
    onExportDOCX()
  }
</script>

<!-- Click outside to close menu -->
<svelte:window onclick={(e) => {
  if (!e.target.closest('.export-wrap')) showExportMenu = false
}} />

<header class="toolbar">
  <!-- Logo -->
  <div class="logo">
    <span class="logo-md">MD</span>
    <span class="logo-arrow">→</span>
    <span class="logo-pdf">MARKA</span>
  </div>

  <!-- Tabs -->
  <nav class="tabs">
    <button
      class="tab"
      class:active={$activeTab === 'editor'}
      onclick={() => activeTab.set('editor')}
    >
      Editor
    </button>
    <button
      class="tab"
      class:active={$activeTab === 'split'}
      onclick={() => activeTab.set('split')}
    >
      Split
    </button>
    <button
      class="tab"
      class:active={$activeTab === 'preview'}
      onclick={() => activeTab.set('preview')}
    >
      Preview
    </button>
  </nav>

  <!-- Right side -->
  <div class="right">
    <span class="stats">{wordCount}w · {charCount}c</span>

    <!-- Export dropdown -->
    <div class="export-wrap">
      <button class="btn-export" onclick={toggleMenu}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Export
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {#if showExportMenu}
        <div class="export-menu">
          <button class="export-item" onclick={handlePDF}>
            <span class="export-icon">📄</span>
            <div>
              <div class="export-label">Export as PDF</div>
              <div class="export-hint">⌃⇧D</div>
            </div>
          </button>
          <button class="export-item" onclick={handleDOCX}>
            <span class="export-icon">📝</span>
            <div>
              <div class="export-label">Export as DOCX</div>
              <div class="export-hint">⌃⇧W</div>
            </div>
          </button>
        </div>
      {/if}
    </div>
  </div>
</header>

<style>
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 52px;
    border-bottom: 1px solid #1e1e1e;
    background: #0d0d0d;
    flex-shrink: 0;
    position: relative;
    z-index: 50;
  }

  .logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 6px;
    letter-spacing: .02em;
  }
  .logo-md { color: #e8e2d5; }
  .logo-arrow { color: #b54a24; }
  .logo-pdf { color: #b54a24; }

  .tabs {
    display: flex;
    gap: 2px;
    background: #111;
    padding: 4px;
    border-radius: 8px;
    border: 1px solid #1e1e1e;
  }

  .tab {
    font-family: 'Syne', sans-serif;
    font-size: .72rem;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    background: transparent;
    color: #555;
    transition: all .15s;
  }
  .tab:hover { color: #999; background: #1a1a1a; }
  .tab.active { background: #b54a24; color: #f5f0e8; }

  .right {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .stats {
    font-family: 'JetBrains Mono', monospace;
    font-size: .7rem;
    color: #444;
    letter-spacing: .04em;
  }

  .export-wrap {
    position: relative;
  }

  .btn-export {
    font-family: 'Syne', sans-serif;
    font-size: .75rem;
    font-weight: 700;
    letter-spacing: .06em;
    text-transform: uppercase;
    padding: 7px 14px;
    background: #b54a24;
    color: #f5f0e8;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 7px;
    transition: background .15s;
  }
  .btn-export:hover { background: #d45a30; }

  .export-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: #161616;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
    overflow: hidden;
    min-width: 200px;
    box-shadow: 0 8px 32px rgba(0,0,0,.6);
    animation: menuIn .15s ease;
  }

  @keyframes menuIn {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .export-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background .1s;
    border-bottom: 1px solid #1e1e1e;
  }
  .export-item:last-child { border-bottom: none; }
  .export-item:hover { background: #1e1e1e; }

  .export-icon { font-size: 1.2rem; }

  .export-label {
    font-family: 'Syne', sans-serif;
    font-size: .8rem;
    font-weight: 700;
    color: #e8e2d5;
  }

  .export-hint {
    font-family: 'JetBrains Mono', monospace;
    font-size: .65rem;
    color: #555;
    margin-top: 2px;
  }
</style>