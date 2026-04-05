import { formatCurrency, formatDate } from '../../utils/formatters'
import EmptyState from '../common/EmptyState'

const TransactionsTable = ({ rows, onEdit, canEdit, onAdd }) => {
  if (!rows.length) {
    return (
      <EmptyState
        title="No transactions yet"
        hint="Add your first transaction to get started."
        actionLabel={canEdit ? 'Add Transaction' : undefined}
        onAction={canEdit ? onAdd : undefined}
      />
    )
  }

  return (
    <>
      <div className="grid gap-3 md:hidden">
        {rows.map((item) => (
          <article key={item.id} className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-900 dark:text-slate-100">{item.category}</p>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  item.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}
              >
                {item.type}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{formatDate(item.date)}</p>
            <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(item.amount)}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.note}</p>
            <button
              type="button"
              disabled={!canEdit}
              onClick={() => onEdit(item)}
              className="mt-3 rounded-md border border-slate-300 px-2 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-45 dark:border-slate-600 dark:text-slate-200"
            >
              Edit
            </button>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-left text-sm">
        <thead className="sticky top-0 border-b border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900">
          <tr>
            <th className="px-3 py-3 font-medium">Date</th>
            <th className="px-3 py-3 font-medium">Amount</th>
            <th className="px-3 py-3 font-medium">Category</th>
            <th className="px-3 py-3 font-medium">Type</th>
            <th className="px-3 py-3 font-medium">Actions</th>
          </tr>
        </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                <td className="px-3 py-3 text-slate-700 dark:text-slate-300">{formatDate(item.date)}</td>
                <td className="px-3 py-3 font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(item.amount)}</td>
                <td className="px-3 py-3 text-slate-900 dark:text-slate-100">{item.category}</td>
                <td className="px-3 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      item.type === 'income' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300'
                    }`}
                  >
                    {item.type}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <button
                    type="button"
                    disabled={!canEdit}
                    onClick={() => onEdit(item)}
                    className="rounded-md border border-slate-300 px-3 py-1 text-xs transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TransactionsTable
