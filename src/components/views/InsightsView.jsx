import { getCategorySpending, getFrequentCategories, getInsights } from '../../utils/analytics'
import { formatCurrency, monthLabel } from '../../utils/formatters'

const InsightsView = ({ transactions, onAdd, canAdd }) => {
  const insights = getInsights(transactions)
  const categories = getCategorySpending(transactions).slice(0, 3)
  const frequent = getFrequentCategories(transactions)
  const changePositive = insights.monthComparison.change >= 0

  return (
    <section className="flex min-h-full flex-col rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Insights</h2>
        <button
          type="button"
          onClick={onAdd}
          disabled={!canAdd}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-50 dark:border-slate-600 dark:text-slate-200"
        >
          + Add Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Top Spending</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
            {insights.topCategory ? insights.topCategory.name : 'N/A'}{' '}
            <span className="text-2xl">{insights.topCategory ? formatCurrency(insights.topCategory.value) : ''}</span>
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Top categories by total spending</p>
          <div className="mt-4 space-y-2">
            {categories.map((item) => (
              <div key={item.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-slate-700 dark:text-slate-200">{item.name}</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{formatCurrency(item.value)}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className="h-2 rounded-full bg-slate-500 dark:bg-slate-300" style={{ width: `${Math.min(100, item.value / 200)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Monthly Comparison</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
            {insights.monthComparison.latest ? monthLabel(insights.monthComparison.latest) : 'Current'} expenses
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{formatCurrency(Math.abs(insights.monthComparison.latestValue))}</p>
          <p className={`mt-2 text-sm font-semibold ${changePositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {changePositive ? '+' : ''}
            {formatCurrency(insights.monthComparison.change)} from last month
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Frequent Categories</p>
          <div className="mt-4 space-y-3">
            {frequent.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-slate-700 dark:text-slate-200">{item.name}</span>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{item.count} times</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}

export default InsightsView
