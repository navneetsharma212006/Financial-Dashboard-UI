import BalanceTrendChart from '../dashboard/BalanceTrendChart'
import SpendingBreakdownChart from '../dashboard/SpendingBreakdownChart'
import SummaryCards from '../dashboard/SummaryCards'
import InsightsPanel from '../dashboard/InsightsPanel'

const DashboardView = ({ transactions }) => {
  return (
    <section className="space-y-4">
      <SummaryCards transactions={transactions} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <article className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 xl:col-span-2">
          <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Balance Trend</h3>
          <BalanceTrendChart transactions={transactions} />
        </article>
        <article className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Spending Breakdown</h3>
          <SpendingBreakdownChart transactions={transactions} />
        </article>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Insights</h3>
        <InsightsPanel transactions={transactions} />
      </article>
    </section>
  )
}

export default DashboardView
