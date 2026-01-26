import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </ProtectedRoute>
  );
}
