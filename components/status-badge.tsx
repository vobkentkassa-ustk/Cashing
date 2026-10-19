import { cn } from '@/lib/utils'
import { uz } from '@/lib/i18n/uz'
import type { DebtStatus, GroupStatus, PaymentStatus, UserStatus } from '@/lib/mock-data'

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

const toneClass: Record<Tone, string> = {
  neutral: 'bg-muted text-muted-foreground ring-border',
  success: 'bg-success/12 text-success ring-success/25',
  warning: 'bg-warning/18 text-warning-foreground ring-warning/35 dark:text-warning',
  danger: 'bg-destructive/10 text-destructive ring-destructive/25',
  info: 'bg-info/12 text-info ring-info/25',
}

export function Pill({ tone, children, className }: { tone: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset',
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

const paymentTone: Record<PaymentStatus, Tone> = { DRAFT: 'neutral', PENDING: 'warning', APPROVED: 'success', REJECTED: 'danger' }
const groupTone: Record<GroupStatus, Tone> = { ACTIVE: 'success', UPCOMING: 'info', FINISHED: 'neutral' }
const debtTone: Record<DebtStatus, Tone> = { OPEN: 'danger', PARTIAL: 'warning', SETTLED: 'success' }
const userTone: Record<UserStatus, Tone> = { PENDING_APPROVAL: 'warning', ACTIVE: 'success', BLOCKED: 'danger' }

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return <Pill tone={paymentTone[status]}>{uz.paymentStatus[status]}</Pill>
}
export function GroupStatusBadge({ status }: { status: GroupStatus }) {
  return <Pill tone={groupTone[status]}>{uz.groupStatus[status]}</Pill>
}
export function DebtStatusBadge({ status }: { status: DebtStatus }) {
  return <Pill tone={debtTone[status]}>{uz.debtStatus[status]}</Pill>
}
export function UserStatusBadge({ status }: { status: UserStatus }) {
  return <Pill tone={userTone[status]}>{uz.userStatus[status]}</Pill>
}
