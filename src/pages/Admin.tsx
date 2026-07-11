import { AdminAuthGate } from '@/components/admin/AdminAuthGate';
import { AdminLayout } from '@/components/admin/AdminLayout';

export default function Admin() {
  return (
    <AdminAuthGate>
      <AdminLayout />
    </AdminAuthGate>
  );
}
