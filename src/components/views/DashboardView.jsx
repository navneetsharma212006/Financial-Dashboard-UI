import { motion } from 'framer-motion'
import BalanceTrendChart from '../dashboard/BalanceTrendChart'
import SpendingBreakdownChart from '../dashboard/SpendingBreakdownChart'
import SummaryCards from '../dashboard/SummaryCards'
import InsightsPanel from '../dashboard/InsightsPanel'

const DashboardView = ({ transactions }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <SummaryCards transactions={transactions} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <motion.article
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 xl:col-span-2"
        >
          <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Income vs Expenses Trend</h3>
          <BalanceTrendChart transactions={transactions} />
        </motion.article>
        <motion.article
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
        >
          <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Spending Breakdown</h3>
          <SpendingBreakdownChart transactions={transactions} />
        </motion.article>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
      >
        <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Insights</h3>
        <InsightsPanel transactions={transactions} />
      </motion.article>
    </motion.section>
  )
}

export default DashboardView
