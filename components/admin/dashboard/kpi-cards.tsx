import { Clock, HandCoins, TrendingUp, Users } from 'lucide-react'
import { formatMoney } from '@/lib/format'
import { cn } from '@/lib/utils'

const kpis = [
  {
    label: 'Oylik daromad (sof)',
    value: formatMoney(84_250_000),
    hint: '+5,8% o‘tgan oyga nisbatan',
    hintTone: 'text-success',
    icon: TrendingUp,
    iconTone: 'bg-success/12 text-success',
  },
  {
    label: 'Kutilayotgan so‘rovlar',
    value: '3',
    hint: 'Tasdiqlash kerak · 4 550 000 so‘m',
    hintTone: 'text-warning-foreground dark:text-warning',
    icon: Clock,
    iconTone: 'bg-warning/20 text-warning-foreground dark:text-warning',
  },
  {
    label: 'Ochiq qarzlar',
    value: formatMoney(6_250_000),
    hint: '5 ta qarzdor',
    hintTone: 'text-destructive',
    icon: HandCoins,
    iconTone: 'bg-destructive/10 text-destructive',
  },
  {
    label: 'Faol o‘quvchilar',
    value: '215',
    hint: '18 mentor · 5 faol guruh',
    hintTone: 'text-muted-foreground',
    icon: Users,
    iconTone: 'bg-info/12 text-info',
  },
]

export function KpiCards() {
  return (
    <section aria-label="Asosiy ko‘rsatkichlar" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map(({ label, value, hint, hintTone, icon: Icon, iconTone }) => (
        <div key={label} className="rounded-xl border bg-card p-5">
          <div className="flex items-center gap-3">
            <span className={cn('flex size-9 items-center justify-center rounded-lg', iconTone)}>
              <Icon className="size-[18px]" aria-hidden="true" />
            </span>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
          </div>
          <p className="mt-4 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
          <p className={cn('mt-1 text-xs font-medium', hintTone)}>{hint}</p>
        </div>
      ))}
    </section>
  )
}
