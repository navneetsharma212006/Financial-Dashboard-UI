import { FiBarChart2, FiHome, FiList, FiPieChart, FiMenu, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useFinance } from '../../context/FinanceContext'
import RoleSwitcher from '../common/RoleSwitcher'

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: FiHome },
  { key: 'transactions', label: 'Transactions', icon: FiList },
  { key: 'insights', label: 'Insights', icon: FiPieChart },
]

const Sidebar = ({ activeView, onChangeView, isOpen, onClose, collapsed, onToggleCollapse }) => {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 bg-slate-950/40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Sidebar - now scrolls with page */}
      <aside
        className={`flex h-full flex-col rounded-r-3xl border-r border-slate-800 bg-slate-950/95 p-4 text-slate-100 shadow-2xl transition-all duration-300 ${
          isOpen ? 'fixed inset-y-0 left-0 z-40 lg:relative lg:inset-auto lg:flex' : 'hidden lg:hidden'
        } ${collapsed ? 'lg:w-16' : 'lg:w-64'} lg:rounded-3xl lg:border-0 lg:bg-slate-900/95`}
      >
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between gap-3">
          <div className={`flex items-center gap-2 text-lg font-semibold text-white ${collapsed ? 'lg:justify-center' : ''}`}>
            {!collapsed && <span>Finance Dashboard</span>}
            <FiBarChart2 className="h-6 w-6" />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden rounded-xl bg-slate-800 p-2 text-slate-200 transition hover:bg-slate-700 lg:block"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <FiChevronRight className="h-5 w-5" /> : <FiChevronLeft className="h-5 w-5" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-800 p-2 text-slate-200 transition hover:bg-slate-700 lg:hidden"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  onChangeView(item.key)
                  if (window.matchMedia('(max-width: 1023px)').matches) {
                    onClose()
                  }
                }}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition duration-200 ${
                  activeView === item.key
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                } ${collapsed ? 'lg:justify-center lg:px-3' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>

        {/* Role Section */}
        {!collapsed && (
          <div className="flex-shrink-0 mt-6 rounded-3xl bg-slate-900 p-4 ring-1 ring-slate-800">
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