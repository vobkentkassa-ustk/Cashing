import Link from 'next/link'
import { ArrowRight, CarFront, LayoutDashboard, Send, Smartphone } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

const roles = [
  {
    href: '/admin',
    icon: LayoutDashboard,
    title: 'Administrator paneli',
    text: 'Daftar, so‘rovlarni tasdiqlash, guruhlar, qarzlar va hisobotlar.',
  },
  {
    href: '/mentor',
    icon: Smartphone,
    title: 'Mentor ilovasi',
    text: 'Telegram Mini App: to‘lov qoralamalari va paketli yuborish.',
  },
]

export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-muted/40 px-4 py-12">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <CarFront className="size-7" aria-hidden="true" />
          </span>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-balance">Avtomaktab Hisob tizimi</h1>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">
            To‘lovlar, shartnomalar va qarzlarni yagona joyda boshqaring.
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {roles.map(({ href, icon: Icon, title, text }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-primary/50"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="block font-medium">{title}</span>
                  <span className="block text-sm text-muted-foreground">{text}</span>
                </span>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Send className="size-3.5" aria-hidden="true" /> Kirish Telegram orqali amalga oshiriladi
        </p>
      </div>
    </main>
  )
}
