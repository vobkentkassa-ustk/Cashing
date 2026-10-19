'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpenText,
  Car,
  HandCoins,
  Inbox,
  LayoutDashboard,
  UserCog,
  Users,
  UsersRound,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { uz } from '@/lib/i18n/uz'

const items = [
  { href: '/admin', label: uz.nav.dashboard, icon: LayoutDashboard },
  { href: '/admin/daftar', label: uz.nav.ledger, icon: BookOpenText },
  { href: '/admin/sorovlar', label: uz.nav.requests, icon: Inbox, count: 3 },
  { href: '/admin/guruhlar', label: uz.nav.groups, icon: UsersRound },
  { href: '/admin/oquvchilar', label: uz.nav.students, icon: Users },
  { href: '/admin/qarzlar', label: uz.nav.debts, icon: HandCoins },
  { href: '/admin/foydalanuvchilar', label: uz.nav.users, icon: UserCog, count: 2 },
]

export function Brand() {
  return (
    <Link href="/admin" className="flex items-center gap-2.5 px-2">
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Car className="size-5" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[15px] font-semibold">{uz.app.name}</span>
        <span className="text-xs text-muted-foreground">{uz.app.subtitle}</span>
      </span>
    </Link>
  )
}

export function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Asosiy menyu" className="flex flex-col gap-1">
      {items.map(({ href, label, icon: Icon, count }) => {
        const active = href === '/admin' ? pathname === href : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              active
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
            )}
          >
            <Icon className="size-[18px]" aria-hidden="true" />
            <span className="flex-1">{label}</span>
            {count ? (
              <span className="rounded-full bg-primary px-1.5 py-px text-[11px] font-semibold text-primary-foreground">
                {count}
              </span>
            ) : null}
          </Link>
        )
      })}
    </nav>
  )
}
