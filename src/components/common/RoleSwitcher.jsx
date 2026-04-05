import { useFinance } from '../../context/FinanceContext'

const RoleSwitcher = () => {
  const { role, setRole } = useFinance()

  return (
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-500"
    >
      <option value="viewer">Viewer</option>
      <option value="admin">Admin</option>
    </select>
  )
}

export default RoleSwitcher