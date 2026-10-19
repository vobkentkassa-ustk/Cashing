'use client'

import { useState } from 'react'
import { CarFront, LayoutGrid, List, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { GroupStatusBadge } from '@/components/status-badge'
import { getMentor, groups as initialGroups, mentors, type Group, type GroupStatus } from '@/lib/mock-data'
import { formatDate, formatMoney } from '@/lib/format'
import { uz } from '@/lib/i18n/uz'
import { cn } from '@/lib/utils'

const filters: { value: 'ALL' | GroupStatus; label: string }[] = [
  { value: 'ALL', label: 'Hammasi' },
  { value: 'ACTIVE', label: uz.groupStatus.ACTIVE },
  { value: 'UPCOMING', label: uz.groupStatus.UPCOMING },
  { value: 'FINISHED', label: uz.groupStatus.FINISHED },
]
const mentorItems = mentors.map((m) => ({ value: m.id, label: m.name }))
const categoryItems = ['A', 'B', 'BC', 'C'].map((c) => ({ value: c, label: `${c} toifa` }))

export function GroupsBoard() {
  const [groups, setGroups] = useState<Group[]>(initialGroups)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [filter, setFilter] = useState<'ALL' | GroupStatus>('ALL')
  const [open, setOpen] = useState(false)

  const visible = groups.filter((g) => filter === 'ALL' || g.status === filter)

  function handleCreate(formData: FormData) {
    const group: Group = {
      id: `g${Date.now()}`,
      name: String(formData.get('name') || 'Yangi guruh'),
      category: (formData.get('category') as Group['category']) || 'B',
      contractPrice: Number(formData.get('price')) || 0,
      startDate: String(formData.get('start') || '2026-11-01'),
      durationWeeks: Number(formData.get('weeks')) || 10,
      students: 0,
      capacity: Number(formData.get('capacity')) || 25,
      mentorId: String(formData.get('mentor') || 'm1'),
      status: 'UPCOMING',
    }
    setGroups((prev) => [group, ...prev])
    setOpen(false)
  }

  return (
    <>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label="Holat bo‘yicha filtr" className="inline-flex w-fit rounded-lg border bg-card p-1">
          {filters.map((f) => (
            <button
              key={f.value}
              role="tab"
              aria-selected={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                filter === f.value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg border bg-card p-1">
            <Button
              variant={view === 'grid' ? 'secondary' : 'ghost'}
              size="icon-sm"
              aria-label="Kartochkalar"
              aria-pressed={view === 'grid'}
              onClick={() => setView('grid')}
            >
              <LayoutGrid />
            </Button>
            <Button
              variant={view === 'list' ? 'secondary' : 'ghost'}
              size="icon-sm"
              aria-label="Ro‘yxat"
              aria-pressed={view === 'list'}
              onClick={() => setView('list')}
            >
              <List />
            </Button>
          </div>
          <Button className="h-9" onClick={() => setOpen(true)}>
            <Plus /> Yangi guruh
          </Button>
        </div>
      </div>

      {view === 'grid' ? (
        <ul className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {visible.map((g) => (
            <GroupCard key={g.id} group={g} />
          ))}
        </ul>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 font-medium">Guruh</th>
                <th className="px-3 py-2.5 font-medium">Mentor</th>
                <th className="px-3 py-2.5 text-right font-medium">Shartnoma narxi</th>
                <th className="px-3 py-2.5 font-medium">Boshlanish</th>
                <th className="px-3 py-2.5 font-medium">O‘quvchilar</th>
                <th className="px-4 py-2.5 font-medium">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {visible.map((g) => (
                <tr key={g.id} className="hover:bg-muted/40">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{g.name}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">{getMentor(g.mentorId).name}</td>
                  <td className="px-3 py-3 text-right whitespace-nowrap tabular-nums">{formatMoney(g.contractPrice)}</td>
                  <td className="px-3 py-3 whitespace-nowrap tabular-nums">{formatDate(g.startDate)}</td>
                  <td className="px-3 py-3 tabular-nums">
                    {g.students}/{g.capacity}
                  </td>
                  <td className="px-4 py-3">
                    <GroupStatusBadge status={g.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Yangi guruh yaratish</DialogTitle>
            <DialogDescription>Shartnoma narxi guruhdagi barcha o‘quvchilarga qo‘llaniladi.</DialogDescription>
          </DialogHeader>
          <form action={handleCreate} className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="g-name">Guruh nomi</Label>
              <Input id="g-name" name="name" placeholder="B-Nabor 14" required />
            </div>
            <div className="grid gap-2">
              <Label>Toifa</Label>
              <Select name="category" items={categoryItems} defaultValue="B">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categoryItems.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Mentor</Label>
              <Select name="mentor" items={mentorItems} defaultValue="m1">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mentorItems.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="g-price">Shartnoma narxi (so‘m)</Label>
              <Input id="g-price" name="price" type="number" inputMode="numeric" placeholder="4200000" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="g-start">Boshlanish sanasi</Label>
              <Input id="g-start" name="start" type="date" defaultValue="2026-11-02" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="g-weeks">Davomiyligi (hafta)</Label>
              <Input id="g-weeks" name="weeks" type="number" defaultValue={10} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="g-capacity">Sig‘imi</Label>
              <Input id="g-capacity" name="capacity" type="number" defaultValue={25} />
            </div>
            <DialogFooter className="sm:col-span-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Bekor qilish
              </Button>
              <Button type="submit">Yaratish</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

function GroupCard({ group: g }: { group: Group }) {
  const fill = Math.round((g.students / g.capacity) * 100)
  return (
    <li className="flex flex-col rounded-xl border bg-card p-5 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
          <CarFront className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold">{g.name}</h3>
          <p className="text-xs text-muted-foreground">
            {g.category} toifa · {getMentor(g.mentorId).name}
          </p>
        </div>
        <GroupStatusBadge status={g.status} />
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <dt className="text-xs text-muted-foreground">Shartnoma narxi</dt>
          <dd className="mt-0.5 font-semibold tabular-nums">{formatMoney(g.contractPrice)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Boshlanish</dt>
          <dd className="mt-0.5 font-semibold tabular-nums">{formatDate(g.startDate)}</dd>
        </div>
      </dl>
      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="text-muted-foreground">O‘quvchilar</span>
          <span className="font-medium tabular-nums">
            {g.students} / {g.capacity}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className={cn('h-full rounded-full', g.status === 'FINISHED' ? 'bg-muted-foreground/50' : 'bg-primary')}
            style={{ width: `${fill}%` }}
          />
        </div>
      </div>
      <div className="mt-5 flex gap-2">
        <Button className="h-8 flex-1">Batafsil</Button>
        <Button variant="outline" className="h-8">
          Tahrirlash
        </Button>
        <Button variant="outline" className="h-8">
          O‘quvchilar
        </Button>
      </div>
    </li>
  )
}
