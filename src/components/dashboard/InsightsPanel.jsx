import { motion } from 'framer-motion'
import { FiTrendingUp, FiTrendingDown, FiRepeat, FiBarChart2 } from 'react-icons/fi'
import { getInsights, getFrequentCategories } from '../../utils/analytics'
import { formatCurrency, monthLabel } from '../../utils/formatters'
import EmptyState from '../common/EmptyState'

const InsightCard = ({ title, value, subtitle, icon: Icon, color }) => (
  <motion.article
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <p className={`mt-1 text-xl font-bold ${color}`}>{value}</p>
        {subtitle && <p className="text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>}
      </div>
      <div className={`rounded-lg p-2 ${color.replace('text-', 'bg-').replace('-600', '-100')} text-slate-900 dark:text-slate-100`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </motion.article>
)

const InsightsPanel = ({ transactions }) => {
  if (!transactions.length) {
    return <EmptyState title="No insights yet" hint="Insights appear once you have enough financial activity in the dashboard." />
  }

  const insights = getInsights(transactions)
  const { topCategory, monthComparison } = insights
  const frequentCategories = getFrequentCategories(transactions)
  const direction = monthComparison.change >= 0 ? 'up' : 'down'

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <InsightCard
        title="Highest Spending Category"
        value={topCategory ? topCategory.name : 'N/A'}
        subtitle={topCategory ? formatCurrency(topCategory.value) : '-'}
        icon={FiBarChart2}
        color="text-rose-600"
      />

      <InsightCard
        title="Monthly Comparison"
        value={`${direction === 'up' ? '+' : ''}${formatCurrency(monthComparison.change)}`}
        subtitle={`vs ${monthComparison.previous ? monthLabel(monthComparison.previous) : 'last month'}`}
        icon={direction === 'up' ? FiTrendingUp : FiTrendingDown}
        color={direction === 'up' ? 'text-emerald-600' : 'text-rose-600'}
      />

      <InsightCard
        title="Most Frequent Category"
        value={frequentCategories[0]?.name || 'N/A'}
        subtitle={`${frequentCategories[0]?.count || 0} transactions`}
        icon={FiRepeat}
        color="text-blue-600"
      />

      <InsightCard
        title="Total Transactions"
        value={transactions.length}
        subtitle="All time"
        icon={FiBarChart2}
        color="text-slate-600"
      />
    </div>
  )
}

export default InsightsPanel
