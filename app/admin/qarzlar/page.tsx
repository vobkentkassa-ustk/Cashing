import { PageHeader } from '@/components/admin/page-header'
import { DebtsBoard } from '@/components/admin/debts-board'

export default function DebtsPage() {
  return (
    <>
      <PageHeader
        title="Qarzlar"
        description="Tranzit ushlanmalar, o‘quvchi qoldiqlari va mentor qarzlari"
      />
      <DebtsBoard />
    </>
  )
}
