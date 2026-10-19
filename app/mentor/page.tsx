import type { Metadata } from 'next'
import { MentorPayments } from '@/components/mentor/mentor-payments'

export const metadata: Metadata = {
  title: 'Mentor paneli · To‘lovlar',
}

export default function MentorPage() {
  return (
    <div className="min-h-dvh bg-muted/50">
      <div className="mx-auto max-w-md border-x bg-background shadow-sm">
        <MentorPayments />
      </div>
    </div>
  )
}
