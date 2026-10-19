'use client'

import { useMemo, useState } from 'react'
import { Download, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PaymentStatusBadge } from '@/components/status-badge'
import { getGroup, getMentor, getStudent, mentors, payments, type PaymentStatus } from '@/lib/mock-data'
import { formatDateTime, formatMoney } from '@/lib/format'
import { uz } from '@/lib/i18n/uz'

const statusItems = [
  { value: 'ALL', label: 'Barcha holatlar' },
  ...(['PENDING', 'APPROVED', 'REJECTED'] as PaymentStatus[]).map((s) => ({ value: s, label: uz.paymentStatus[s] })),
]
const mentorItems = [{ value: 'ALL', label: 'Barcha mentorlar' }, ...mentors.map((m) => ({ value: m.id, label: m.name }))]

export function LedgerTable() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<string>('ALL')
  const [mentor, setMentor] = useState<string>('ALL')

  const rows = useMemo(
    () =>
      payments.filter((p) => {
        const student = getStudent(p.studentId)
        if (status !== 'ALL' && p.status !== status) return false
        if (mentor !== 'ALL' && p.mentorId !== mentor) return false
        if (query && !`${student.name} ${p.number}`.toLowerCase().includes(query.toLowerCase())) return false
        return true
      }),
    [query, status, mentor],
  )

  const totals = rows
    .filter((p) => p.status === 'APPROVED')
    .reduce((acc, p) => ({ gross: acc.gross + p.gross, transit: acc.transit + p.transit }), { gross: 0, transit: 0 })

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <Summary label="Yalpi tushum" value={formatMoney(totals.gross)} />
        <Summary label="Tranzit (qarzga o‘tgan)" value={formatMoney(totals.transit)} tone="text-warning-foreground dark:text-warning" />
        <Summary label="Sof daromad" value={formatMoney(totals.gross - totals.transit)} tone="text-success" />
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="O‘quvchi ismi yoki to‘lov raqami"
              aria-label="Daftardan qidirish"
              className="h-9 pl-9"
            />
          </div>
          <Select items={statusItems} value={status} onValueChange={(v) => setStatus(v as string)}>
            <SelectTrigger className="h-9 w-full md:w-44" aria-label="Holat bo‘yicha filtr">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusItems.map((i) => (
                <SelectItem key={i.value} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select items={mentorItems} value={mentor} onValueChange={(v) => setMentor(v as string)}>
            <SelectTrigger className="h-9 w-full md:w-48" aria-label="Mentor bo‘yicha filtr">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mentorItems.map((i) => (
                <SelectItem key={i.value} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="h-9">
            <Download /> Excel
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 font-medium">№</th>
                <th className="px-3 py-2.5 font-medium">Sana</th>
                <th className="px-3 py-2.5 font-medium">O‘quvchi</th>
                <th className="px-3 py-2.5 font-medium">Mentor</th>
                <th className="px-3 py-2.5 font-medium">Usul</th>
                <th className="px-3 py-2.5 text-right font-medium">Yalpi</th>
                <th className="px-3 py-2.5 text-right font-medium">Tranzit</th>
                <th className="px-3 py-2.5 text-right font-medium">Sof</th>
                <th className="px-4 py-2.5 font-medium">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((p) => {
                const student = getStudent(p.studentId)
                return (
                  <tr key={p.id} className="hover:bg-muted/40">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">#{p.number}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-muted-foreground tabular-nums">{formatDateTime(p.date)}</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <p className="font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{getGroup(student.groupId).name}</p>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">{getMentor(p.mentorId).name}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">{uz.paymentMethod[p.method]}</td>
                    <td className="px-3 py-3 text-right whitespace-nowrap tabular-nums">{formatMoney(p.gross, false)}</td>
                    <td className="px-3 py-3 text-right whitespace-nowrap tabular-nums text-muted-foreground">
                      {p.transit ? formatMoney(p.transit, false) : '—'}
                    </td>
                    <td className="px-3 py-3 text-right font-medium whitespace-nowrap tabular-nums">
                      {formatMoney(p.gross - p.transit, false)}
                    </td>
                    <td className="px-4 py-3">
                      <PaymentStatusBadge status={p.status} />
                    </td>
                  </tr>
                )
              })}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-muted-foreground">
                    Hech narsa topilmadi
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <p className="border-t px-4 py-3 text-xs text-muted-foreground">
          {rows.length} ta yozuv · Summalar so‘mda · Jami ko‘rsatkichlar faqat tasdiqlangan to‘lovlar bo‘yicha
        </p>
      </div>
    </div>
  )
}

function Summary({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`mt-1 text-xl font-semibold tabular-nums ${tone ?? ''}`}>{value}</p>
    </div>
  )
}
