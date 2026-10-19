import Link from 'next/link'
import { CheckCheck, Plus, UserPlus } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { PageHeader } from '@/components/admin/page-header'
import { KpiCards } from '@/components/admin/dashboard/kpi-cards'
import { RevenueChart } from '@/components/admin/dashboard/revenue-chart'
import { RecentPayments } from '@/components/admin/dashboard/recent-payments'
import { GroupsOverview } from '@/components/admin/dashboard/groups-overview'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Boshqaruv paneli"
        description="Bugun, 20.10.2026 · Oktabr oyi bo‘yicha umumiy holat"
        actions={
          <>
            <Link href="/admin/oquvchilar" className={cn(buttonVariants({ variant: 'outline' }), 'h-9')}>
              <UserPlus /> O‘quvchi qo‘shish
            </Link>
            <Link href="/admin/guruhlar" className={cn(buttonVariants({ variant: 'outline' }), 'h-9')}>
              <Plus /> Guruh yaratish
            </Link>
            <Link href="/admin/sorovlar" className={cn(buttonVariants(), 'h-9')}>
              <CheckCheck /> So‘rovlarni ko‘rish (3)
            </Link>
          </>
        }
      />
      <div className="flex flex-col gap-6">
        <KpiCards />
        <div className="grid gap-6 xl:grid-cols-5">
          <div className="xl:col-span-3">
            <RecentPayments />
          </div>
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>
        </div>
        <GroupsOverview />
      </div>
    </>
  )
}
