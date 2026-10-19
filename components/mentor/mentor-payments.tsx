'use client'

import { useState } from 'react'
import { Bell, Check, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PaymentStatusBadge } from '@/components/status-badge'
import { getStudent, mentorDrafts, payments, students, type Payment, type PaymentMethod } from '@/lib/mock-data'
import { formatDate, formatMoney } from '@/lib/format'
import { uz } from '@/lib/i18n/uz'
import { cn } from '@/lib/utils'
import { MentorBottomNav } from './mentor-bottom-nav'

const myStudents = students.filter((s) => s.mentorId === 'm1')
const studentItems = myStudents.map((s) => ({ value: s.id, label: s.name }))
const methodItems = (Object.keys(uz.paymentMethod) as PaymentMethod[]).map((m) => ({ value: m, label: uz.paymentMethod[m] }))

export function MentorPayments() {
  const [tab, setTab] = useState<'drafts' | 'sent'>('drafts')
  const [drafts, setDrafts] = useState<Payment[]>(mentorDrafts)
  const [sent, setSent] = useState<Payment[]>(() => payments.filter((p) => p.mentorId === 'm1'))
  const [selected, setSelected] = useState<Set<string>>(new Set(['d1', 'd2']))
  const [studentId, setStudentId] = useState<string | null>(null)
  const [method, setMethod] = useState<PaymentMethod>('CASH')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('2026-10-20')

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  function addDraft(e: React.FormEvent) {
    e.preventDefault()
    const value = Number(amount.replace(/\s/g, ''))
    if (!studentId || !value) return
    const nextNumber = drafts.reduce((max, d) => Math.max(max, d.number), 0) + 1
    setDrafts((prev) => [
      {
        id: `d${Date.now()}`,
        number: nextNumber,
        date: `${date}T12:00:00`,
        studentId,
        mentorId: 'm1',
        gross: value,
        transit: 0,
        method,
        status: 'DRAFT',
      },
      ...prev,
    ])
    setAmount('')
    setStudentId(null)
  }

  function sendSelected() {
    const toSend = drafts.filter((d) => selected.has(d.id))
    setSent((prev) => [
      ...toSend.map((d, i) => ({ ...d, number: 1049 + i, status: 'PENDING' as const })),
      ...prev,
    ])
    setDrafts((prev) => prev.filter((d) => !selected.has(d.id)))
    setSelected(new Set())
  }

  const selectedTotal = drafts.filter((d) => selected.has(d.id)).reduce((s, d) => s + d.gross, 0)

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b bg-card px-4 py-3">
        <span className="relative flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          JK
          <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-card bg-success" aria-hidden="true" />
        </span>
        <div className="flex-1 leading-tight">
          <p className="font-semibold">Jasur Karimov</p>
          <p className="text-xs text-muted-foreground">Mentor · Avtomaktab</p>
        </div>
        <Button variant="ghost" size="icon" aria-label="Bildirishnomalar">
          <Bell className="size-5" />
        </Button>
      </header>

      <main className="flex-1 pb-4">
        <div className="px-4 pt-4">
          <h1 className="text-xl font-semibold tracking-tight">To‘lovlarni boshqarish</h1>
          <div role="tablist" className="mt-3 grid grid-cols-2 border-b">
            {(
              [
                ['drafts', `Qoralamalar (${drafts.length})`],
                ['sent', `Yuborilgan (${sent.length})`],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                role="tab"
                aria-selected={tab === value}
                onClick={() => setTab(value)}
                className={cn(
                  '-mb-px border-b-2 py-2.5 text-sm font-medium transition-colors',
                  tab === value ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground',
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {tab === 'drafts' ? (
          <>
            <ul className="flex flex-col gap-2.5 px-4 pt-4" aria-label="Qoralama to‘lovlar">
              {drafts.length === 0 ? (
                <li className="rounded-xl border border-dashed py-8 text-center text-sm text-muted-foreground">
                  Qoralamalar yo‘q. Quyida yangi to‘lov qo‘shing.
                </li>
              ) : null}
              {drafts.map((d) => {
                const isSelected = selected.has(d.id)
                const student = getStudent(d.studentId)
                return (
                  <li key={d.id}>
                    <button
                      type="button"
                      onClick={() => toggle(d.id)}
                      aria-pressed={isSelected}
                      className={cn(
                        'flex w-full overflow-hidden rounded-xl border bg-card text-left transition-colors',
                        isSelected && 'border-primary/50',
                      )}
                    >
                      <span
                        className={cn(
                          'flex w-12 shrink-0 items-center justify-center transition-colors',
                          isSelected ? 'bg-primary' : 'bg-muted',
                        )}
                      >
                        <span
                          className={cn(
                            'flex size-5 items-center justify-center rounded-[5px] border-2',
                            isSelected ? 'border-primary-foreground bg-primary-foreground text-primary' : 'border-muted-foreground/40 bg-card',
                          )}
                        >
                          {isSelected ? <Check className="size-3.5" strokeWidth={3} aria-hidden="true" /> : null}
                        </span>
                      </span>
                      <span className="flex flex-1 items-center gap-3 p-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground">
                          {student.name[0]}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold">Qoralama #{String(d.number).padStart(2, '0')}</span>
                          <span className="block truncate text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">{student.name}</span>
                          </span>
                          <span className="block text-xs text-muted-foreground tabular-nums">
                            {formatDate(d.date)} · {uz.paymentMethod[d.method]}
                          </span>
                        </span>
                        <span className="flex flex-col items-end gap-1.5">
                          <span className="font-semibold tabular-nums">{formatMoney(d.gross, false)}</span>
                          <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground">
                            Qoralama
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <section aria-labelledby="new-payment" className="mx-0 mt-5 rounded-t-3xl border-t bg-card px-4 pt-3 pb-5 shadow-[0_-8px_24px_-12px_rgb(0_0_0/0.12)]">
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" aria-hidden="true" />
              <h2 id="new-payment" className="text-lg font-semibold">
                Yangi to‘lov kiritish
              </h2>
              <form onSubmit={addDraft} className="mt-3 grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label>O‘quvchi</Label>
                  <Select items={studentItems} value={studentId} onValueChange={(v) => setStudentId(v as string)}>
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Tanlang..." />
                    </SelectTrigger>
                    <SelectContent>
                      {studentItems.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="amount">Summa (so‘m)</Label>
                  <Input
                    id="amount"
                    inputMode="numeric"
                    placeholder="1 500 000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^\d\s]/g, ''))}
                    className="h-10"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="date">Qabul sanasi</Label>
                  <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-10" />
                </div>
                <div className="grid gap-1.5">
                  <Label>To‘lov usuli</Label>
                  <Select items={methodItems} value={method} onValueChange={(v) => setMethod(v as PaymentMethod)}>
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {methodItems.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="col-span-2 mt-1 h-11 text-base" disabled={!studentId || !amount}>
                  Qoralamaga qo‘shish
                </Button>
              </form>
            </section>
          </>
        ) : (
          <ul className="flex flex-col gap-2.5 px-4 pt-4" aria-label="Yuborilgan to‘lovlar">
            {sent.map((p) => (
              <li key={p.id} className="flex items-center gap-3 rounded-xl border bg-card p-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground">
                  {getStudent(p.studentId).name[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{getStudent(p.studentId).name}</p>
                  <p className="text-xs text-muted-foreground tabular-nums">
                    #{p.number} · {formatDate(p.date)}
                  </p>
                  {p.comment ? <p className="mt-0.5 text-xs text-destructive">{p.comment}</p> : null}
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-semibold tabular-nums">{formatMoney(p.gross, false)}</span>
                  <PaymentStatusBadge status={p.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {tab === 'drafts' ? (
        <div className="sticky bottom-16 z-10 flex items-center justify-between gap-3 border-t bg-card px-4 py-3">
          <div className="leading-tight">
            <p className="text-sm font-medium">{selected.size} ta tanlandi</p>
            <p className="text-xs text-muted-foreground tabular-nums">{formatMoney(selectedTotal)}</p>
          </div>
          <Button className="h-11 rounded-full px-5" disabled={selected.size === 0} onClick={sendSelected}>
            Yuborish ({selected.size}) <Send />
          </Button>
        </div>
      ) : null}

      <MentorBottomNav />
    </div>
  )
}
