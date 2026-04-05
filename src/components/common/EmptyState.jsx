import { FiBarChart2 } from 'react-icons/fi'

const EmptyState = ({ title, hint, actionLabel, onAction }) => {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-800 sm:p-8">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-200">
        <FiBarChart2 className="h-6 w-6" />
      </div>
      <p className="text-base font-semibold text-slate-700 dark:text-slate-200">{title}</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{hint}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
