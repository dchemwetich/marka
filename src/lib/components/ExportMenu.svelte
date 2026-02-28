<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  function exportFile(type) {
    dispatch('export', { type });
  }
</script>
<div class="export-menu">
  <select on:change={(e) => exportFile(e.target.value)}>
    <option value="">Export...</option>
    <option value="pdf">PDF</option>
    <option value="docx">DOCX</option>
  </select>
</div>
<style>
.export-menu select {
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}
</style>
