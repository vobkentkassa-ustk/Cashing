'use client'

import { useState } from 'react'
import { Check, Inbox, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { PaymentStatusBadge } from '@/components/status-badge'
import { getGroup, getMentor, getStudent, payments, type Payment } from '@/lib/mock-data'
import { formatDateTime, formatMoney, initials } from '@/lib/format'
import { uz } from '@/lib/i18n/uz'

export function RequestsQueue() {
  const [items, setItems] = useState<Payment[]>(() => payments.filter((p) => p.status === 'PENDING'))
  const [rejecting, setRejecting] = useState<Payment | null>(null)
  const [reason, setReason] = useState('')

  const resolve = (id: string, status: 'APPROVED' | 'REJECTED') =>
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))

  const pending = items.filter((p) => p.status === 'PENDING')
  const pendingTotal = pending.reduce((sum, p) => sum + p.gross, 0)

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border bg-card px-5 py-4 text-sm">
        <p>
          <span className="text-muted-foreground">Kutilmoqda: </span>
          <span className="font-semibold tabular-nums">{pending.length} ta</span>
        </p>
        <p>
          <span className="text-muted-foreground">Umumiy summa: </span>
          <span className="font-semibold tabular-nums">{formatMoney(pendingTotal)}</span>
        </p>
        {pending.length > 1 ? (
          <Button
            className="ml-auto h-9"
            onClick={() => pending.forEach((p) => resolve(p.id, 'APPROVED'))}
          >
            <Check /> Barchasini tasdiqlash
          </Button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-dashed bg-card py-16 text-center">
          <Inbox className="size-8 text-muted-foreground" aria-hidden="true" />
          <p className="mt-3 font-medium">Yangi so‘rovlar yo‘q</p>
        </div>
      ) : (
        <ul className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {items.map((p) => {
            const student = getStudent(p.studentId)
            const mentor = getMentor(p.mentorId)
            const remaining = student.contractAmount - student.paid
            return (
              <li key={p.id} className="flex flex-col rounded-xl border bg-card">
                <div className="flex items-start gap-3 p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                    {initials(student.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{student.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {getGroup(student.groupId).name} · #{p.number}
                    </p>
                  </div>
                  <PaymentStatusBadge status={p.status} />
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-y bg-muted/30 px-5 py-4 text-sm">
                  <div>
                    <dt className="text-xs text-muted-foreground">Summa</dt>
                    <dd className="text-lg font-semibold tabular-nums">{formatMoney(p.gross)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Tranzit</dt>
                    <dd className="text-lg font-semibold tabular-nums">{p.transit ? formatMoney(p.transit) : '—'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Mentor</dt>
                    <dd>{mentor.name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Usul · vaqt</dt>
                    <dd>
                      {uz.paymentMethod[p.method]} · <span className="tabular-nums">{formatDateTime(p.date).slice(11)}</span>
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-xs text-muted-foreground">Shartnoma qoldig‘i (to‘lovdan oldin)</dt>
                    <dd className="tabular-nums">{formatMoney(remaining)}</dd>
                  </div>
                </dl>
                <div className="mt-auto flex gap-2 p-4">
                  {p.status === 'PENDING' ? (
                    <>
                      <Button
                        variant="outline"
                        className="h-9 flex-1 text-destructive hover:text-destructive"
                        onClick={() => {
                          setReason('')
                          setRejecting(p)
                        }}
                      >
                        <X /> Rad etish
                      </Button>
                      <Button className="h-9 flex-1" onClick={() => resolve(p.id, 'APPROVED')}>
                        <Check /> Tasdiqlash
                      </Button>
                    </>
                  ) : (
                    <p className="w-full text-center text-sm text-muted-foreground">
                      {p.status === 'APPROVED' ? 'Daftarga yozildi' : 'Mentorga qaytarildi'}
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}

      <Dialog open={rejecting !== null} onOpenChange={(open) => !open && setRejecting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>To‘lovni rad etish</DialogTitle>
            <DialogDescription>
              Sabab mentorga Telegram orqali yuboriladi va to‘lov qoralamalarga qaytariladi.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="reject-reason">Sabab</Label>
            <Textarea
              id="reject-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Masalan: chek rasmi yo‘q yoki summa noto‘g‘ri"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejecting(null)}>
              Bekor qilish
            </Button>
            <Button
              variant="destructive"
              disabled={!reason.trim()}
              onClick={() => {
                if (rejecting) resolve(rejecting.id, 'REJECTED')
                setRejecting(null)
              }}
            >
              Rad etish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
