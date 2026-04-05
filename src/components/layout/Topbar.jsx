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
}) => {
  return (
    <header className="mb-4 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search transactions..."
          className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 md:max-w-md"
        />

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onThemeToggle}
            className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs dark:border-slate-600 dark:text-slate-200"
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <button
            type="button"
            onClick={onExportCSV}
            className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs dark:border-slate-600 dark:text-slate-200"
          >
            CSV
          </button>
          <button
            type="button"
            onClick={onExportJSON}
            className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs dark:border-slate-600 dark:text-slate-200"
          >
            JSON
          </button>
          <button
            type="button"
            onClick={onMockSync}
            className="rounded-md border border-brand-500 px-2.5 py-1.5 text-xs text-brand-600"
          >
            {syncStatus === 'syncing' ? 'Syncing...' : 'Sync'}
          </button>
          <button
            type="button"
            disabled={role !== 'admin'}
            onClick={onAdd}
            className="rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-45"
          >
            + Add Transaction
          </button>
        </div>
      </div>
    </header>
  )
}

export default Topbar
