export const downloadBlob = (filename, content, type) => {
  const blob = new Blob([content], { type })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}

export const exportTransactionsAsJSON = (transactions) => {
  const content = JSON.stringify(transactions, null, 2)
  downloadBlob('transactions.json', content, 'application/json')
}

export const exportTransactionsAsCSV = (transactions) => {
  const headers = ['id', 'date', 'amount', 'category', 'type', 'note']
  const rows = transactions.map((item) =>
    headers
      .map((key) => {
        const value = String(item[key] ?? '').replace(/"/g, '""')
        return `"${value}"`
      })
      .join(','),
  )
  const content = [headers.join(','), ...rows].join('\n')
  downloadBlob('transactions.csv', content, 'text/csv')
}
