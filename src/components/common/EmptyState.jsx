const EmptyState = ({ title, hint }) => {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-800 sm:p-8">
      <p className="text-base font-semibold text-slate-700 dark:text-slate-200">{title}</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{hint}</p>
    </div>
  )
}

export default EmptyState
