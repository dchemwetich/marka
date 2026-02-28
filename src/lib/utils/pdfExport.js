export async function exportPDF(previewEl) {
  if (!previewEl) return

  const { default: html2pdf } = await import('html2pdf.js')

  const clone = previewEl.cloneNode(true)
  clone.style.cssText = `
    padding: 40px 48px;
    background: #fff;
    max-width: 800px;
    font-family: 'Fraunces', Georgia, serif;
    font-size: 15px;
    line-height: 1.8;
    color: #1a1410;
  `

  const opt = {
    margin: 0,
    filename: 'marka-document.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: '#fff'
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    }
  }

  await html2pdf().set(opt).from(clone).save()
}