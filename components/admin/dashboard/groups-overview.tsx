import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { GroupStatusBadge } from '@/components/status-badge'
import { getMentor, groups } from '@/lib/mock-data'
import { formatDate } from '@/lib/format'

export function GroupsOverview() {
  return (
    <section className="rounded-xl border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">O‘quv guruhlari holati</h2>
        <Link href="/admin/guruhlar" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Guruhlar <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {groups.slice(0, 4).map((g) => {
          const fill = Math.round((g.students / g.capacity) * 100)
          return (
            <li key={g.id} className="rounded-lg border p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{g.name}</p>
                <GroupStatusBadge status={g.status} />
              </div>
              <dl className="mt-2 space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <dt>Mentor</dt>
                  <dd className="text-foreground">{getMentor(g.mentorId).name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Boshlanish</dt>
                  <dd className="text-foreground tabular-nums">{formatDate(g.startDate)}</dd>
                </div>
              </dl>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${fill}%` }} />
                </div>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {g.students}/{g.capacity}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
