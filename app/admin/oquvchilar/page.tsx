import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/admin/page-header'
import { Pill } from '@/components/status-badge'
import { getGroup, getMentor, students } from '@/lib/mock-data'
import { formatMoney, initials } from '@/lib/format'

export default function StudentsPage() {
  return (
    <>
      <PageHeader
        title="O‘quvchilar"
        description={`${students.length} ta o‘quvchi · shartnoma bo‘yicha to‘lov holati`}
        actions={
          <Button className="h-9">
            <UserPlus /> O‘quvchi qo‘shish
          </Button>
        }
      />
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 font-medium">O‘quvchi</th>
              <th className="px-3 py-2.5 font-medium">Guruh</th>
              <th className="px-3 py-2.5 font-medium">Mentor</th>
              <th className="px-3 py-2.5 text-right font-medium">Shartnoma</th>
              <th className="min-w-48 px-3 py-2.5 font-medium">To‘langan</th>
              <th className="px-4 py-2.5 text-right font-medium">Qoldiq</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {students.map((s) => {
              const remaining = s.contractAmount - s.paid
              const pct = Math.round((s.paid / s.contractAmount) * 100)
              return (
                <tr key={s.id} className="hover:bg-muted/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                        {initials(s.name)}
                      </span>
                      <div className="whitespace-nowrap">
                        <p className="font-medium">{s.name}</p>
                        <p className="text-xs text-muted-foreground tabular-nums">{s.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">{getGroup(s.groupId).name}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">{getMentor(s.mentorId).name}</td>
                  <td className="px-3 py-3 text-right whitespace-nowrap tabular-nums">{formatMoney(s.contractAmount, false)}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">{pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    {remaining === 0 ? (
                      <Pill tone="success">To‘liq to‘langan</Pill>
                    ) : (
                      <span className="font-medium tabular-nums">{formatMoney(remaining, false)}</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
