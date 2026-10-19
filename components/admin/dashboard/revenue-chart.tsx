'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { revenueByMonth } from '@/lib/mock-data'
import { formatCompactMoney, formatMoney } from '@/lib/format'

const config = {
  revenue: { label: 'Daromad', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function RevenueChart() {
  return (
    <section className="rounded-xl border bg-card p-5">
      <div className="mb-4">
        <h2 className="font-semibold">Daromad dinamikasi</h2>
        <p className="text-sm text-muted-foreground">2026-yil, tasdiqlangan sof tushum</p>
        <p className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-semibold whitespace-nowrap tabular-nums">{formatMoney(605_050_000)}</span>
          <span className="text-xs text-muted-foreground">yil boshidan</span>
        </p>
      </div>
      <ChartContainer config={config} className="aspect-auto h-64 w-full">
        <AreaChart data={revenueByMonth} margin={{ left: 0, right: 8, top: 8 }}>
          <defs>
            <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} width={64} tickFormatter={(v: number) => formatCompactMoney(v)} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => <span className="font-medium tabular-nums">{formatMoney(Number(value))}</span>}
              />
            }
          />
          <Area dataKey="revenue" type="monotone" stroke="var(--color-revenue)" strokeWidth={2} fill="url(#fillRevenue)" />
        </AreaChart>
      </ChartContainer>
    </section>
  )
}
