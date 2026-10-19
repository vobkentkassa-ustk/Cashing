import { PageHeader } from '@/components/admin/page-header'
import { UsersManager } from '@/components/admin/users-manager'

export default function UsersPage() {
  return (
    <>
      <PageHeader title="Foydalanuvchilar" description="Mentorlarni tasdiqlash, bloklash va rollarni boshqarish" />
      <UsersManager />
    </>
  )
}
