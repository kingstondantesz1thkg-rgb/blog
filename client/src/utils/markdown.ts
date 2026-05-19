function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function parseInline(value: string) {
  return value
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/10 text-primary">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-primary underline">$1</a>')
}

export function renderMarkdown(source: string) {
  const escaped = escapeHtml(source || '')
  const fencePattern = /```([\s\S]*?)```/g
  const fences: string[] = []

  const text = escaped.replace(fencePattern, (_, code: string) => {
    const html = `<pre class="overflow-x-auto rounded-2xl p-4 border border-white/10"><code>${code.trim()}</code></pre>`
    fences.push(html)
    return `__CODE_BLOCK_${fences.length - 1}__`
  })

  const lines = text.split('\n')
  const html: string[] = []
  let listBuffer: string[] = []

  const flushList = () => {
    if (listBuffer.length) {
      html.push(`<ul class="list-disc pl-6 space-y-2">${listBuffer.join('')}</ul>`)
      listBuffer = []
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      flushList()
      continue
    }

    if (trimmed.startsWith('- ')) {
      listBuffer.push(`<li>${parseInline(trimmed.slice(2))}</li>`)
      continue
    }

    flushList()

    if (trimmed.startsWith('### ')) {
      html.push(`<h3 class="text-2xl font-bold mt-8 mb-4">${parseInline(trimmed.slice(4))}</h3>`)
      continue
    }

    if (trimmed.startsWith('## ')) {
      html.push(`<h2 class="text-3xl font-bold mt-10 mb-5">${parseInline(trimmed.slice(3))}</h2>`)
      continue
    }

    if (trimmed.startsWith('# ')) {
      html.push(`<h1 class="text-4xl font-bold mt-10 mb-6">${parseInline(trimmed.slice(2))}</h1>`)
      continue
    }

    html.push(`<p class="leading-8">${parseInline(trimmed)}</p>`)
  }

  flushList()

  return html
    .join('')
    .replace(/__CODE_BLOCK_(\d+)__/g, (_, index: string) => fences[Number(index)] || '')
}
