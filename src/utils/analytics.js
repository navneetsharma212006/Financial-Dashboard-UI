import { monthKey, monthLabel } from './formatters'

export const getSummary = (transactions) => {
  const income = transactions.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0)
  const expenses = transactions.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0)
  return { income, expenses, balance: income - expenses }
}

export const getBalanceTrend = (transactions) => {
  const months = [...new Set(transactions.map((item) => monthKey(item.date)))].sort()
  let runningBalance = 0

  return months.map((month) => {
    const monthItems = transactions.filter((item) => monthKey(item.date) === month)
    const income = monthItems.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0)
    const expenses = monthItems.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0)
    runningBalance += income - expenses
    return { month: monthLabel(month), balance: runningBalance }
  })
}

export const getCategorySpending = (transactions) => {
  const map = new Map()
  transactions
    .filter((item) => item.type === 'expense')
    .forEach((item) => map.set(item.category, (map.get(item.category) || 0) + item.amount))
  return [...map.entries()].map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
}

export const getInsights = (transactions) => {
  const categorySpending = getCategorySpending(transactions)
  const topCategory = categorySpending[0]

  const monthTotals = new Map()
  transactions.forEach((item) => {
    const key = monthKey(item.date)
    monthTotals.set(key, (monthTotals.get(key) || 0) + (item.type === 'income' ? item.amount : -item.amount))
  })

  const sortedMonths = [...monthTotals.keys()].sort()
  const latest = sortedMonths[sortedMonths.length - 1]
  const previous = sortedMonths[sortedMonths.length - 2]
  const latestValue = monthTotals.get(latest) || 0
  const previousValue = monthTotals.get(previous) || 0
  const change = previous ? latestValue - previousValue : latestValue

  return {
    topCategory,
    monthComparison: {
      latest,
      previous,
      latestValue,
      previousValue,
      change,
    },
    note:
      change >= 0
        ? 'Net position improved this month. Cash flow is moving in a healthy direction.'
        : 'Net position dropped this month. Review major expense categories for quick savings.',
  }
}

export const getFrequentCategories = (transactions) => {
  const frequency = new Map()
  transactions
    .filter((item) => item.type === 'expense')
    .forEach((item) => frequency.set(item.category, (frequency.get(item.category) || 0) + 1))
  return [...frequency.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
}
