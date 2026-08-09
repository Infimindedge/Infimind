import { AdminAuthGate } from '@/components/admin/AdminAuthGate';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { usePageMetadata } from '@/hooks/usePageMetadata';

export default function Admin() {
  usePageMetadata({
    title: 'Admin Dashboard | Infimind',
    description: 'Infimind administrative console.',
    noindex: true,
  });

  return (
    <AdminAuthGate>
      <AdminLayout />
    </AdminAuthGate>
  );
}
