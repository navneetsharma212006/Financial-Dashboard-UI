import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { getCategorySpending } from '../../utils/analytics'
import { formatCurrency } from '../../utils/formatters'
import EmptyState from '../common/EmptyState'

const COLORS = ['#2563eb', '#14b8a6', '#f59e0b', '#f43f5e', '#8b5cf6', '#0ea5e9', '#84cc16']

const SpendingBreakdownChart = ({ transactions }) => {
  const data = getCategorySpending(transactions)

  if (!data.length) {
    return (
      <EmptyState 
        title="No expense categories yet" 
        hint="Expense transactions will appear here as a category split." 
      />
    )
  }

  return (
    <div className="w-full h-[260px] sm:h-[320px] md:h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="70%"
            paddingAngle={3}
          >
            {data.map((entry, idx) => (
              <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip formatter={(value) => formatCurrency(value)} />

          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            wrapperStyle={{ fontSize: "12px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpendingBreakdownChart