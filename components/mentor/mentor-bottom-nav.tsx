'use client'

import Link from 'next/link'
import { HandCoins, House, UserRound, Users, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { label: 'Asosiy', icon: House, href: '/mentor' },
  { label: 'O‘quvchilar', icon: Users, href: '/mentor' },
  { label: 'To‘lovlar', icon: Wallet, href: '/mentor', active: true },
  { label: 'Qarzlarim', icon: HandCoins, href: '/mentor' },
  { label: 'Profil', icon: UserRound, href: '/' },
]

export function MentorBottomNav() {
  return (
    <nav aria-label="Mentor menyusi" className="sticky bottom-0 z-20 grid h-16 grid-cols-5 border-t bg-card">
      {items.map(({ label, icon: Icon, href, active }) => (
        <Link
          key={label}
          href={href}
          aria-current={active ? 'page' : undefined}
          className={cn(
            'relative flex flex-col items-center justify-center gap-1 text-[11px] font-medium',
            active ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          {active ? <span className="absolute top-0 h-0.5 w-10 rounded-full bg-primary" aria-hidden="true" /> : null}
          <Icon className="size-5" aria-hidden="true" />
          {label}
        </Link>
      ))}
    </nav>
  )
}
