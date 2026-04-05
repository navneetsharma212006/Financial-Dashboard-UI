import { FiMenu } from 'react-icons/fi'

const Topbar = ({
  searchQuery,
  onSearch,
  role,
  onAdd,
  onExportCSV,
  onExportJSON,
  onMockSync,
  syncStatus,
  onThemeToggle,
  theme,
  onMenuToggle,
}) => {
  return (
    <header className="mb-4 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <FiMenu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </button>

          <div className="min-w-0 flex-1">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search transactions..."
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none ring-slate-500 transition focus:border-slate-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="hidden rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-white sm:inline-flex">
            {role}
          </span>
          <button
            type="button"
            onClick={onThemeToggle}
            className="rounded-2xl border border-slate-300 px-3 py-2 text-xs dark:border-slate-600 dark:text-slate-200"
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <button
            type="button"
            onClick={onExportCSV}
            className="rounded-2xl border border-slate-300 px-3 py-2 text-xs dark:border-slate-600 dark:text-slate-200"
          >
            CSV
          </button>
          <button
            type="button"
            onClick={onExportJSON}
            className="rounded-2xl border border-slate-300 px-3 py-2 text-xs dark:border-slate-600 dark:text-slate-200"
          >
            JSON
          </button>
          <button
            type="button"
            onClick={onMockSync}
            className="rounded-2xl border border-slate-900 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:bg-slate-800 dark:border-slate-200 dark:bg-slate-200 dark:text-slate-950"
          >
            {syncStatus === 'syncing' ? 'Syncing...' : 'Sync'}
          </button>
          <button
            type="button"
            disabled={role !== 'admin'}
            onClick={onAdd}
            className="rounded-2xl bg-slate-900 px-4 py-2 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-45"
          >
            + Add Transaction
          </button>
        </div>
      </div>
    </header>
  )
}

export default Topbar
