import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getBalanceTrend } from '../../utils/analytics'
import { formatCurrency } from '../../utils/formatters'
import EmptyState from '../common/EmptyState'

const BalanceTrendChart = ({ transactions }) => {
  const data = getBalanceTrend(transactions)

  if (!data.length) {
    return <EmptyState title="No trend data yet" hint="Add transactions to see how your balance changes over time." />
  }

  return (
    <div className="h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickFormatter={(v) => `$${Math.round(v / 1000)}k`} tickLine={false} axisLine={false} />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Line type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={3} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BalanceTrendChart
