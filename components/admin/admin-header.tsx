'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, ChevronDown, LogOut, Menu, Search, Settings, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { AdminNav, Brand } from './admin-nav'
import { uz } from '@/lib/i18n/uz'

export function AdminHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur md:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menyuni ochish" onClick={() => setOpen(true)}>
        <Menu className="size-5" />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 bg-sidebar p-4">
          <SheetTitle className="sr-only">Menyu</SheetTitle>
          <div className="mb-6 pt-1">
            <Brand />
          </div>
          <AdminNav onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          type="search"
          placeholder={uz.app.search}
          aria-label="Qidirish"
          className="h-9 bg-card pl-9"
        />
      </div>

      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative" aria-label="Bildirishnomalar, 3 ta yangi">
          <Bell className="size-4" />
          <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-white">
            3
          </span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="ml-1 flex items-center gap-2 rounded-lg border bg-card py-1 pr-2 pl-1 text-left hover:bg-accent" />
            }
          >
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
              AR
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-medium">Admin Rolibek</span>
              <span className="text-[11px] text-muted-foreground">Administrator</span>
            </span>
            <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem>
              <Settings />
              {uz.app.settings}
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/mentor" />}>
              <Smartphone />
              Mentor panelini ko‘rish
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" render={<Link href="/" />}>
              <LogOut />
              {uz.app.logout}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
