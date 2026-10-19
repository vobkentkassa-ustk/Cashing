import { PageHeader } from '@/components/admin/page-header'
import { GroupsBoard } from '@/components/admin/groups-board'

export default function GroupsPage() {
  return (
    <>
      <PageHeader title="Avtomaktab guruhlari" description="Guruhlar, shartnoma narxlari va to‘lganlik darajasi" />
      <GroupsBoard />
    </>
  )
}
