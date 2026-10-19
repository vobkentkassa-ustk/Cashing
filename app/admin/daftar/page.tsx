import { PageHeader } from '@/components/admin/page-header'
import { LedgerTable } from '@/components/admin/ledger-table'

export default function LedgerPage() {
  return (
    <>
      <PageHeader
        title="To‘lovlar daftari"
        description="Barcha to‘lovlar: yalpi summa, tranzit ushlanma va sof daromad"
      />
      <LedgerTable />
    </>
  )
}
