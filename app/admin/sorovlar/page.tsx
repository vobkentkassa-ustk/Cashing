import { PageHeader } from '@/components/admin/page-header'
import { RequestsQueue } from '@/components/admin/requests-queue'

export default function RequestsPage() {
  return (
    <>
      <PageHeader
        title="To‘lov so‘rovlari"
        description="Mentorlar yuborgan to‘lovlarni tekshiring va tasdiqlang"
      />
      <RequestsQueue />
    </>
  )
}
