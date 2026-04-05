import RoleSwitcher from '../common/RoleSwitcher'

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: '▦' },
  { key: 'transactions', label: 'Transactions', icon: '☰' },
  { key: 'insights', label: 'Insights', icon: '◔' },
]

const Sidebar = ({ activeView, onChangeView }) => {
  return (
    <aside className="flex w-full flex-col rounded-2xl bg-slate-900 p-3 text-slate-200 lg:min-h-[85vh] lg:w-64">
      <div className="flex items-center gap-2 px-2 py-3 text-base font-semibold">
        <span className="text-amber-300">◍</span>
        <span>Finance Dashboard</span>
      </div>

      <nav className="mt-4 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onChangeView(item.key)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
              activeView === item.key ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-6 lg:mt-auto">
        <div className="rounded-lg bg-slate-800 p-2">
          <RoleSwitcher />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
