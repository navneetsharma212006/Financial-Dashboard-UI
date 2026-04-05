import { useFinance } from '../../context/FinanceContext'
import RoleSwitcher from '../common/RoleSwitcher'

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: '▦' },
  { key: 'transactions', label: 'Transactions', icon: '☰' },
  { key: 'insights', label: 'Insights', icon: '◔' },
]

const Sidebar = ({ activeView, onChangeView, isOpen, onClose, collapsed }) => {
  const showLabels = !collapsed

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 h-full overflow-y-auto rounded-r-3xl border-r border-slate-800 bg-slate-950/95 p-4 text-slate-100 shadow-2xl transition-all duration-300 ${
          isOpen ? 'w-72 translate-x-0' : '-translate-x-full w-72'
        } lg:static lg:translate-x-0 ${
          collapsed ? 'lg:w-20 lg:px-2' : 'lg:w-64 lg:px-4'
        } lg:h-screen lg:rounded-3xl lg:border-0 lg:bg-slate-900/95`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className={`flex items-center gap-2 text-lg font-semibold text-white ${collapsed ? 'justify-center w-full' : ''}`}>
            <span className="text-amber-300">◍</span>
            <span className={`${showLabels ? 'block' : 'hidden lg:block'}`}>
              Finance Dashboard
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-800 p-2 text-slate-200 transition hover:bg-slate-700 lg:hidden"
          >
            <span className="text-lg">×</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className={`mt-6 flex flex-col gap-2 ${collapsed ? 'items-center' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                onChangeView(item.key)
                onClose()
              }}
              className={`flex items-center rounded-2xl transition duration-200 ${
                showLabels ? 'justify-start gap-3 px-4 py-3' : 'justify-center px-3 py-3'
              } ${
                activeView === item.key
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className={`${showLabels ? 'inline' : 'hidden'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Role Section */}
        {showLabels && (
          <div className="mt-6 rounded-3xl bg-slate-900 p-4 ring-1 ring-slate-800">
            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-slate-400">
              Role
            </p>

            <RoleSwitcher />
          </div>
        )}
      </aside>
    </>
  )
}

export default Sidebar