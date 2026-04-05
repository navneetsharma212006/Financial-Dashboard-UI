import { motion } from 'framer-motion'
import { FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi'
import { getSummary } from '../../utils/analytics'
import { formatCurrency } from '../../utils/formatters'

const Card = ({ label, value, accent, icon: Icon, bgColor }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900`}
  >
    <div className={`absolute inset-0 ${bgColor} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
    <div className="relative flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className={`mt-2 text-3xl font-bold ${accent}`}>{value}</p>
      </div>
      <div className={`rounded-xl p-3 ${bgColor} text-white`}>
        <Icon className="h-7 w-7" />
      </div>
    </div>
  </motion.article>
)

const SummaryCards = ({ transactions }) => {
  const { balance, income, expenses } = getSummary(transactions)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card
        label="Total Balance"
        value={formatCurrency(balance)}
        accent="text-slate-900 dark:text-slate-100"
        icon={FiDollarSign}
        bgColor="bg-blue-500"
      />
      <Card
        label="Total Income"
        value={formatCurrency(income)}
        accent="text-emerald-600"
        icon={FiTrendingUp}
        bgColor="bg-emerald-500"
      />
      <Card
        label="Total Expenses"
        value={formatCurrency(expenses)}
        accent="text-rose-600"
        icon={FiTrendingDown}
        bgColor="bg-rose-500"
      />
    </div>
  )
}

export default SummaryCards
