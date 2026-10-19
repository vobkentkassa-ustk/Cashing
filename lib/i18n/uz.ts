export const uz = {
  app: {
    name: 'Avtomaktab',
    subtitle: 'Buxgalteriya tizimi',
    search: 'O‘quvchi yoki to‘lovni qidirish...',
    settings: 'Sozlamalar',
    logout: 'Chiqish',
  },
  nav: {
    dashboard: 'Boshqaruv paneli',
    ledger: 'Daftar',
    requests: 'So‘rovlar',
    groups: 'Guruhlar',
    students: 'O‘quvchilar',
    debts: 'Qarzlar',
    users: 'Foydalanuvchilar',
    drafts: 'Qoralamalar',
    myStudents: 'O‘quvchilarim',
    myDebts: 'Qarzlarim',
    profile: 'Profil',
  },
  paymentStatus: {
    DRAFT: 'Qoralama',
    PENDING: 'Kutilmoqda',
    APPROVED: 'Tasdiqlangan',
    REJECTED: 'Rad etilgan',
  },
  groupStatus: {
    ACTIVE: 'Faol',
    UPCOMING: 'Kutilmoqda',
    FINISHED: 'Tugatilgan',
  },
  debtStatus: {
    OPEN: 'Ochiq',
    PARTIAL: 'Qisman',
    SETTLED: 'Yopilgan',
  },
  userStatus: {
    PENDING_APPROVAL: 'Tasdiq kutmoqda',
    ACTIVE: 'Faol',
    BLOCKED: 'Bloklangan',
  },
  paymentMethod: {
    CASH: 'Naqd',
    CARD: 'Karta',
    TRANSFER: 'O‘tkazma',
    CLICK: 'Click / Payme',
  },
} as const
