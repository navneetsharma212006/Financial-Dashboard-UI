import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import TransactionFormModal from './components/transactions/TransactionFormModal'
import DashboardView from './components/views/DashboardView'
import InsightsView from './components/views/InsightsView'
import TransactionsView from './components/views/TransactionsView'
import { useFinance } from './context/FinanceContext'
import { exportTransactionsAsCSV, exportTransactionsAsJSON } from './utils/exportData'

const App = () => {
  const {
    transactions,
    filteredTransactions,
    categories,
    role,
    theme,
    searchQuery,
    syncStatus,
    setTheme,
    setSearchQuery,
    addTransaction,
    updateTransaction,
    mockSync,
  } = useFinance()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTx, setEditingTx] = useState(null)
  const [activeView, setActiveView] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const openAddModal = () => {
    setEditingTx(null)
    setModalOpen(true)
  }

  const handleSidebarToggle = () => {
    const isMobile = window.matchMedia('(max-width: 1023px)').matches
    if (isMobile) {
      setSidebarOpen((current) => !current)
      return
    }
    setSidebarCollapsed((current) => !current)
  }

  const openEditModal = (item) => {
    if (role !== 'admin') return
    setEditingTx(item)
    setModalOpen(true)
  }

  const handleSaveTransaction = (payload) => {
    if (role !== 'admin') return
    if (editingTx?.id) {
      updateTransaction({ ...payload, id: editingTx.id })
      return
    }
    addTransaction({ ...payload, id: `t${Date.now()}` })
  }

  return (
    <main className="min-h-screen bg-[#eceff5] p-3 dark:bg-slate-950 sm:p-5">
      <div className="mx-auto flex min-h-screen w-full max-w-[1400px] gap-4 lg:flex-row">
        <Sidebar
          activeView={activeView}
          onChangeView={setActiveView}
          isOpen={sidebarOpen}
          collapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="min-w-0 flex flex-1 flex-col rounded-2xl bg-white/95 p-3 shadow-card transition duration-300 dark:bg-slate-950 sm:p-4">
          <Topbar
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
            role={role}
            onAdd={openAddModal}
            onExportCSV={() => exportTransactionsAsCSV(filteredTransactions)}
            onExportJSON={() => exportTransactionsAsJSON(filteredTransactions)}
            onMockSync={mockSync}
            syncStatus={syncStatus}
            onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            theme={theme}
            onMenuToggle={handleSidebarToggle}
          />

          <div className="flex-1">
            {activeView === 'dashboard' && <DashboardView transactions={transactions} />}
            {activeView === 'transactions' && (
              <TransactionsView rows={filteredTransactions} onEdit={openEditModal} canEdit={role === 'admin'} />
            )}
            {activeView === 'insights' && <InsightsView transactions={transactions} onAdd={openAddModal} canAdd={role === 'admin'} />}
          </div>
          {syncStatus === 'success' && (
            <p className="mt-3 text-sm font-medium text-emerald-600">Mock sync complete. Local changes are up to date.</p>
          )}
        </div>
      </div>

      {modalOpen && (
        <TransactionFormModal
          key={editingTx?.id || 'new-transaction'}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSaveTransaction}
          initialValue={editingTx}
          categories={categories}
        />
      )}
    </main>
  )
}

export default App
