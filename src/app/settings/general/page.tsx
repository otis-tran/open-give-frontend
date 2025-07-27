import ThemeSelector from '@/components/ThemeSelector';

export default function GeneralSettingsPage() {
  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">General</h1>

      <section className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <ThemeSelector />
      </section>
    </div>
  );
}
