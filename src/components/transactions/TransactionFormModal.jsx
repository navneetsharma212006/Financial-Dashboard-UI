import { useState } from 'react'

const emptyForm = { date: '', amount: '', category: '', type: 'expense', note: '' }

const TransactionFormModal = ({ open, onClose, onSubmit, onDelete, initialValue, categories }) => {
  const [form, setForm] = useState(initialValue || emptyForm)

  if (!open) return null

  const submitHandler = (e) => {
    e.preventDefault()
    if (!form.date || !form.category || !form.amount) return
    onSubmit({
      ...form,
      amount: Number(form.amount),
    })
    onClose()
  }

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/40 p-3 sm:p-4">
      <form onSubmit={submitHandler} className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-card dark:bg-slate-900 sm:p-5">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{initialValue ? 'Edit Transaction' : 'Add Transaction'}</h3>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            required
          />
          <input
            type="number"
            min="1"
            value={form.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            placeholder="Amount"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            required
          />
          <input
            type="text"
            value={form.category}
            list="category-list"
            onChange={(e) => handleChange('category', e.target.value)}
            placeholder="Category"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            required
          />
          <datalist id="category-list">
            {categories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
          <select
            value={form.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            type="text"
            value={form.note}
            onChange={(e) => handleChange('note', e.target.value)}
            placeholder="Note"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          {initialValue && (
            <button
              type="button"
              onClick={() => {
                const confirmed = window.confirm('Are you sure you want to delete this transaction?')
                if (confirmed) {
                  onDelete(initialValue.id)
                }
              }}
              className="rounded-md border border-rose-300 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300 dark:hover:bg-rose-900"
            >
              Delete
            </button>
          )}
          <div className="flex flex-1 justify-between gap-2 sm:justify-end">
            <button type="button" onClick={onClose} className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:text-slate-200">
              Cancel
            </button>
            <button type="submit" className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default TransactionFormModal
