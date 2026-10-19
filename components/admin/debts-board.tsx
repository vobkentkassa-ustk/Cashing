'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DebtStatusBadge } from '@/components/status-badge'
import { debts as initialDebts, type Debt } from '@/lib/mock-data'
import { formatDate, formatMoney } from '@/lib/format'

const typeLabel: Record<Debt['type'], string> = {
  TRANSIT: 'Tranzit',
  STUDENT: 'O‘quvchi',
  MENTOR: 'Mentor',
}

export function DebtsBoard() {
  const [debts, setDebts] = useState(initialDebts)
  const [tab, setTab] = useState<'ALL' | Debt['type']>('ALL')

  const visible = debts.filter((d) => tab === 'ALL' || d.type === tab)
  const open = debts.filter((d) => d.status !== 'SETTLED')
  const outstanding = open.reduce((sum, d) => sum + d.amount - d.settled, 0)

  const settle = (id: string) =>
    setDebts((prev) => prev.map((d) => (d.id === id ? { ...d, settled: d.amount, status: 'SETTLED' } : d)))

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {(['TRANSIT', 'STUDENT', 'MENTOR'] as const).map((type) => {
          const sum = open.filter((d) => d.type === type).reduce((s, d) => s + d.amount - d.settled, 0)
          return (
            <div key={type} className="rounded-xl border bg-card p-4">
              <p className="text-sm text-muted-foreground">{typeLabel[type]} qarzlari</p>
              <p className="mt-1 text-xl font-semibold tabular-nums">{formatMoney(sum)}</p>
            </div>
          )
        })}
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
            <TabsList>
              <TabsTrigger value="ALL">Hammasi</TabsTrigger>
              <TabsTrigger value="TRANSIT">Tranzit</TabsTrigger>
              <TabsTrigger value="STUDENT">O‘quvchi</TabsTrigger>
              <TabsTrigger value="MENTOR">Mentor</TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="text-sm">
            <span className="text-muted-foreground">Jami ochiq: </span>
            <span className="font-semibold text-destructive tabular-nums">{formatMoney(outstanding)}</span>
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 font-medium">Qarzdor</th>
                <th className="px-3 py-2.5 font-medium">Turi</th>
                <th className="px-3 py-2.5 font-medium">Sabab</th>
                <th className="px-3 py-2.5 font-medium">Sana</th>
                <th className="px-3 py-2.5 text-right font-medium">Summa</th>
                <th className="px-3 py-2.5 text-right font-medium">Qoldiq</th>
                <th className="px-3 py-2.5 font-medium">Holat</th>
                <th className="px-4 py-2.5">
                  <span className="sr-only">Amallar</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {visible.map((d) => (
                <tr key={d.id} className="hover:bg-muted/40">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{d.debtorName}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">{typeLabel[d.type]}</td>
                  <td className="px-3 py-3 text-muted-foreground">{d.reason}</td>
                  <td className="px-3 py-3 whitespace-nowrap tabular-nums text-muted-foreground">{formatDate(d.createdAt)}</td>
                  <td className="px-3 py-3 text-right whitespace-nowrap tabular-nums">{formatMoney(d.amount, false)}</td>
                  <td className="px-3 py-3 text-right font-medium whitespace-nowrap tabular-nums">
                    {formatMoney(d.amount - d.settled, false)}
                  </td>
                  <td className="px-3 py-3">
                    <DebtStatusBadge status={d.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    {d.status !== 'SETTLED' ? (
                      <Button variant="outline" size="sm" onClick={() => settle(d.id)}>
                        Yopish
                      </Button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
