import { AdminHeader } from '@/components/admin/admin-header'
import { AdminNav, Brand } from '@/components/admin/admin-nav'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh">
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r bg-sidebar p-4 lg:flex">
        <div className="mb-8 pt-1">
          <Brand />
        </div>
        <AdminNav />
        <div className="mt-auto rounded-lg border bg-background p-3 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">Telegram bot ulangan</p>
          <p className="mt-0.5">@avtomaktab_bot · bildirishnomalar faol</p>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
