import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PaymentStatusBadge } from '@/components/status-badge'
import { getMentor, getStudent, payments } from '@/lib/mock-data'
import { formatDate, formatMoney } from '@/lib/format'

export function RecentPayments() {
  return (
    <section className="overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between p-5 pb-3">
        <h2 className="font-semibold">Yaqindagi to‘lovlar</h2>
        <Link href="/admin/daftar" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Barchasi <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs text-muted-foreground">
            <tr>
              <th className="px-5 py-2.5 font-medium">Sana</th>
              <th className="px-3 py-2.5 font-medium">O‘quvchi</th>
              <th className="px-3 py-2.5 text-right font-medium">Miqdori</th>
              <th className="px-3 py-2.5 font-medium">Holat</th>
              <th className="px-5 py-2.5 font-medium">Mentor</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {payments.slice(0, 5).map((p) => (
              <tr key={p.id} className="hover:bg-muted/40">
                <td className="px-5 py-3 whitespace-nowrap text-muted-foreground tabular-nums">{formatDate(p.date)}</td>
                <td className="px-3 py-3 font-medium whitespace-nowrap">{getStudent(p.studentId).name}</td>
                <td className="px-3 py-3 text-right whitespace-nowrap tabular-nums">{formatMoney(p.gross)}</td>
                <td className="px-3 py-3">
                  <PaymentStatusBadge status={p.status} />
                </td>
                <td className="px-5 py-3 whitespace-nowrap text-muted-foreground">{getMentor(p.mentorId).name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
