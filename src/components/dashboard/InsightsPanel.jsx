import { getInsights } from '../../utils/analytics'
import { formatCurrency, monthLabel } from '../../utils/formatters'
import EmptyState from '../common/EmptyState'

const InsightsPanel = ({ transactions }) => {
  if (!transactions.length) {
    return <EmptyState title="No insights yet" hint="Insights appear once you have enough financial activity in the dashboard." />
  }

  const insights = getInsights(transactions)
  const { topCategory, monthComparison, note } = insights
  const direction = monthComparison.change >= 0 ? 'up' : 'down'

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-300">Highest Spending Category</p>
        <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{topCategory ? topCategory.name : 'N/A'}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{topCategory ? formatCurrency(topCategory.value) : '-'}</p>
      </article>

      <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-300">Monthly Comparison</p>
        <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {monthComparison.latest ? monthLabel(monthComparison.latest) : 'Current'}
        </p>
        <p className={`text-sm ${direction === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
          {direction === 'up' ? '+' : ''}
          {formatCurrency(monthComparison.change)} vs previous month
        </p>
      </article>

      <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-300">Observation</p>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{note}</p>
      </article>
    </div>
  )
}

export default InsightsPanel
