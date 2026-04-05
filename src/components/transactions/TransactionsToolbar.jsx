import { useFinance } from '../../context/FinanceContext'

const TransactionsToolbar = () => {
  const { filters, categories, searchQuery, setFilters, setSearchQuery } = useFinance()

  return (
    <div className="mb-4 grid grid-cols-1 gap-3 lg:grid-cols-4">
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search category, note or amount"
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-slate-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      />

      <select
        value={filters.type}
        onChange={(e) => setFilters({ type: e.target.value })}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-slate-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) => setFilters({ category: e.target.value })}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-slate-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={filters.sortBy}
        onChange={(e) => setFilters({ sortBy: e.target.value })}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-slate-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      >
        <option value="date_desc">Date (Newest)</option>
        <option value="date_asc">Date (Oldest)</option>
        <option value="amount_desc">Amount (High to Low)</option>
        <option value="amount_asc">Amount (Low to High)</option>
      </select>
    </div>
  )
}

export default TransactionsToolbar
