import { useMemo, useState } from 'react'
import TransactionsTable from '../transactions/TransactionsTable'
import TransactionsToolbar from '../transactions/TransactionsToolbar'

const PAGE_SIZE = 6

const TransactionsView = ({ rows, canEdit, onEdit, onAdd }) => {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE))

  const pagedRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return rows.slice(start, start + PAGE_SIZE)
  }, [rows, page])

  const currentFrom = rows.length ? (page - 1) * PAGE_SIZE + 1 : 0
  const currentTo = Math.min(page * PAGE_SIZE, rows.length)

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Transactions</h2>
      <TransactionsToolbar />
      <TransactionsTable rows={pagedRows} onEdit={onEdit} canEdit={canEdit} onAdd={onAdd} />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500 dark:text-slate-300">
        <span>
          Showing {currentFrom}-{currentTo} of {rows.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-md border border-slate-300 px-3 py-1.5 disabled:opacity-50 dark:border-slate-600"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-md border border-slate-300 px-3 py-1.5 disabled:opacity-50 dark:border-slate-600"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

export default TransactionsView
