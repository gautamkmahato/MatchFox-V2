// app/reports/page.js

import ReportList from "../_components/ReportList";


export default function ReportsPage() {
  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <ReportList />
    </main>
  );
}