'use client'

import { useState } from 'react'
import { Check, Send, ShieldBan, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Pill, UserStatusBadge } from '@/components/status-badge'
import { users as initialUsers, type AppUser, type UserStatus } from '@/lib/mock-data'
import { formatDate, initials } from '@/lib/format'

export function UsersManager() {
  const [users, setUsers] = useState<AppUser[]>(initialUsers)
  const setStatus = (id: string, status: UserStatus) =>
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)))

  const pending = users.filter((u) => u.status === 'PENDING_APPROVAL')
  const rest = users.filter((u) => u.status !== 'PENDING_APPROVAL')

  return (
    <div className="flex flex-col gap-6">
      {pending.length > 0 ? (
        <section aria-labelledby="pending-title" className="rounded-xl border border-warning/40 bg-warning/8 p-5">
          <h2 id="pending-title" className="font-semibold">
            Tasdiq kutayotgan ro‘yxatdan o‘tishlar ({pending.length})
          </h2>
          <p className="text-sm text-muted-foreground">Telegram bot orqali kelgan yangi mentorlar</p>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {pending.map((u) => (
              <li key={u.id} className="flex items-center gap-3 rounded-lg border bg-card p-3">
                <Avatar name={u.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{u.name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Send className="size-3" aria-hidden="true" /> {u.telegram} · {formatDate(u.registeredAt)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={`${u.name}ni rad etish`}
                  onClick={() => setStatus(u.id, 'BLOCKED')}
                >
                  <X />
                </Button>
                <Button size="sm" onClick={() => setStatus(u.id, 'ACTIVE')}>
                  <Check /> Tasdiqlash
                </Button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 font-medium">Foydalanuvchi</th>
              <th className="px-3 py-2.5 font-medium">Telegram</th>
              <th className="px-3 py-2.5 font-medium">Rol</th>
              <th className="px-3 py-2.5 font-medium">Ro‘yxatdan o‘tgan</th>
              <th className="px-3 py-2.5 font-medium">Holat</th>
              <th className="px-4 py-2.5">
                <span className="sr-only">Amallar</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rest.map((u) => (
              <tr key={u.id} className="hover:bg-muted/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 whitespace-nowrap">
                    <Avatar name={u.name} />
                    <span className="font-medium">{u.name}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-muted-foreground">{u.telegram}</td>
                <td className="px-3 py-3">
                  <Pill tone={u.role === 'ADMIN' ? 'info' : 'neutral'}>{u.role === 'ADMIN' ? 'Administrator' : 'Mentor'}</Pill>
                </td>
                <td className="px-3 py-3 tabular-nums text-muted-foreground">{formatDate(u.registeredAt)}</td>
                <td className="px-3 py-3">
                  <UserStatusBadge status={u.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  {u.role === 'MENTOR' ? (
                    u.status === 'BLOCKED' ? (
                      <Button variant="outline" size="sm" onClick={() => setStatus(u.id, 'ACTIVE')}>
                        Faollashtirish
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setStatus(u.id, 'BLOCKED')}
                      >
                        <ShieldBan /> Bloklash
                      </Button>
                    )
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

function Avatar({ name }: { name: string }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
      {initials(name)}
    </span>
  )
}
