import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
} from 'docx'

// Parse markdown into tokens and convert to docx paragraphs
function parseMarkdown(markdown) {
  const paragraphs = []
  const lines = markdown.split('\n')

  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    // H1
    if (line.startsWith('# ')) {
      paragraphs.push(
        new Paragraph({
          text: line.replace('# ', ''),
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 200 },
          border: {
            bottom: {
              color: 'b54a24',
              size: 6,
              style: BorderStyle.SINGLE,
            }
          }
        })
      )
    }

    // H2
    else if (line.startsWith('## ')) {
      paragraphs.push(
        new Paragraph({
          text: line.replace('## ', ''),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 120 },
        })
      )
    }

    // H3
    else if (line.startsWith('### ')) {
      paragraphs.push(
        new Paragraph({
          text: line.replace('### ', ''),
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 100 },
        })
      )
    }

    // Blockquote
    else if (line.startsWith('> ')) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line.replace('> ', ''),
              italics: true,
              color: '4a3a2a',
            })
          ],
          indent: { left: 720 },
          border: {
            left: {
              color: 'b54a24',
              size: 12,
              style: BorderStyle.SINGLE,
            }
          },
          spacing: { after: 160 },
        })
      )
    }

    // Horizontal rule
    else if (line.startsWith('---')) {
      paragraphs.push(
        new Paragraph({
          border: {
            bottom: {
              color: 'c4bfb0',
              size: 2,
              style: BorderStyle.SINGLE,
            }
          },
          spacing: { after: 200 },
        })
      )
    }

    // Unordered list
    else if (line.match(/^[-*] /)) {
      paragraphs.push(
        new Paragraph({
          children: parseInline(line.replace(/^[-*] /, '')),
          bullet: { level: 0 },
          spacing: { after: 80 },
        })
      )
    }

    // Ordered list
    else if (line.match(/^\d+\. /)) {
      paragraphs.push(
        new Paragraph({
          children: parseInline(line.replace(/^\d+\. /, '')),
          numbering: { reference: 'default-numbering', level: 0 },
          spacing: { after: 80 },
        })
      )
    }

    // Empty line
    else if (line.trim() === '') {
      paragraphs.push(
        new Paragraph({ spacing: { after: 80 } })
      )
    }

    // Regular paragraph
    else {
      paragraphs.push(
        new Paragraph({
          children: parseInline(line),
          spacing: { after: 160 },
        })
      )
    }

    i++
  }

  return paragraphs
}

// Handle inline bold, italic, inline code
function parseInline(text) {
  const runs = []
  // Regex to match **bold**, *italic*, `code`
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g
  let last = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    // Text before match
    if (match.index > last) {
      runs.push(new TextRun({ text: text.slice(last, match.index) }))
    }

    if (match[0].startsWith('**')) {
      runs.push(new TextRun({ text: match[2], bold: true }))
    } else if (match[0].startsWith('*')) {
      runs.push(new TextRun({ text: match[3], italics: true }))
    } else if (match[0].startsWith('`')) {
      runs.push(new TextRun({
        text: match[4],
        font: 'Courier New',
        color: 'b54a24',
        shading: { type: ShadingType.CLEAR, fill: 'f0ebe0' }
      }))
    }

    last = match.index + match[0].length
  }

  // Remaining text
  if (last < text.length) {
    runs.push(new TextRun({ text: text.slice(last) }))
  }

  return runs.length > 0 ? runs : [new TextRun({ text })]
}

export async function exportDOCX(markdown) {
  if (!markdown) return

  const doc = new Document({
    numbering: {
      config: [
        {
          reference: 'default-numbering',
          levels: [
            {
              level: 0,
              format: 'decimal',
              text: '%1.',
              alignment: 'left',
            }
          ]
        }
      ]
    },
    styles: {
      default: {
        document: {
          run: {
            font: 'Georgia',
            size: 24,
            color: '1a1410',
          }
        }
      },
      paragraphStyles: [
        {
          id: 'Heading1',
          name: 'Heading 1',
          run: {
            font: 'Arial',
            size: 40,
            bold: true,
            color: '0d0d0d',
          },
          paragraph: {
            spacing: { after: 200 },
          }
        },
        {
          id: 'Heading2',
          name: 'Heading 2',
          run: {
            font: 'Arial',
            size: 30,
            bold: true,
            color: '0d0d0d',
          }
        },
        {
          id: 'Heading3',
          name: 'Heading 3',
          run: {
            font: 'Arial',
            size: 26,
            bold: true,
            color: '2a1e14',
          }
        }
      ]
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            }
          }
        },
        children: parseMarkdown(markdown)
      }
    ]
  })

  const blob = await Packer.toBlob(doc)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'marka-document.docx'
  a.click()
  URL.revokeObjectURL(url)
}