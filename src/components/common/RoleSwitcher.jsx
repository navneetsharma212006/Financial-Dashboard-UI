import { useFinance } from '../../context/FinanceContext'

const RoleSwitcher = () => {
  const { role, setRole } = useFinance()

  return (
    <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
      Role
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm outline-none ring-brand-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </label>
  )
}

export default RoleSwitcher
