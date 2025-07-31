import ThemeSelector from '@/components/ThemeSelector';

export default function GeneralSettingsPage() {
  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      {/* Title với màu sắc theo theme */}
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">
        General Settings
      </h1>

      {/* Section cài đặt theme */}
      <section className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-sm transition-colors duration-300">
        {/* Header section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-1">
            Appearance
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Customize how this app looks on your device
          </p>
        </div>

        {/* Theme selector component */}
        <ThemeSelector />

        {/* Preview theme */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Preview</h3>
          <div className="flex gap-4">
            <div className="flex-1 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="h-8 mb-2 bg-blue-600 dark:bg-cyan-500 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded"></div>
                <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-3/4"></div>
              </div>
            </div>
            <div className="flex-1 p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
              <div className="h-8 mb-2 bg-blue-600 dark:bg-cyan-500 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
