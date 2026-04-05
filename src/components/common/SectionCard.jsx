const SectionCard = ({ title, actions, children }) => {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-card dark:bg-slate-900 sm:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
        {actions}
      </div>
      {children}
    </section>
  )
}

export default SectionCard
