import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getBalanceTrend } from '../../utils/analytics'
import { formatCurrency } from '../../utils/formatters'
import { useFinance } from '../../context/FinanceContext'
import EmptyState from '../common/EmptyState'

const BalanceTrendChart = ({ transactions }) => {
  const { theme } = useFinance()
  const data = getBalanceTrend(transactions)
  const lineColor = theme === 'dark' ? '#f8fafc' : '#0f172a'

  if (!data.length) {
    return <EmptyState title="No trend data yet" hint="Add transactions to see how your balance changes over time." />
  }

  return (
    <div className="h-64 sm:h-72 min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fill: theme === 'dark' ? '#cbd5e1' : '#475569', fontSize: 12 }}
          />
          <YAxis
            tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
            tickLine={false}
            axisLine={false}
            tick={{ fill: theme === 'dark' ? '#cbd5e1' : '#475569', fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => formatCurrency(value)}
            labelStyle={{ color: '#f8fafc', fontWeight: 600 }}
            itemStyle={{ color: '#f8fafc' }}
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#0f172a' : '#111827',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: 12,
              padding: '10px',
            }}
          />
          <Line type="monotone" dataKey="balance" stroke={lineColor} strokeWidth={3} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BalanceTrendChart
