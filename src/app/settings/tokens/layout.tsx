export default function TokensLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <span>Settings</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-gray-50">Design Tokens</span>
      </div>

      {children}
    </div>
  );
}
