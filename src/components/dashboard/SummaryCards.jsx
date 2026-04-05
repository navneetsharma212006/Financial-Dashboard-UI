import { getSummary } from '../../utils/analytics'
import { formatCurrency } from '../../utils/formatters'

const Card = ({ label, value, accent }) => (
  <article className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
    <p className="text-sm text-slate-500 dark:text-slate-300">{label}</p>
    <p className={`mt-2 text-2xl font-bold ${accent}`}>{value}</p>
  </article>
)

const SummaryCards = ({ transactions }) => {
  const { balance, income, expenses } = getSummary(transactions)

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <Card label="Total Balance" value={formatCurrency(balance)} accent="text-slate-900 dark:text-slate-100" />
      <Card label="Income" value={formatCurrency(income)} accent="text-emerald-600" />
      <Card label="Expenses" value={formatCurrency(expenses)} accent="text-rose-600" />
    </div>
  )
}

export default SummaryCards
