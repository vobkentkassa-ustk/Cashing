export type PaymentStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED'
export type PaymentMethod = 'CASH' | 'CARD' | 'TRANSFER' | 'CLICK'
export type GroupStatus = 'ACTIVE' | 'UPCOMING' | 'FINISHED'
export type DebtStatus = 'OPEN' | 'PARTIAL' | 'SETTLED'
export type UserStatus = 'PENDING_APPROVAL' | 'ACTIVE' | 'BLOCKED'

export type Mentor = { id: string; name: string }
export type Group = {
  id: string
  name: string
  category: 'A' | 'B' | 'BC' | 'C'
  contractPrice: number
  startDate: string
  durationWeeks: number
  students: number
  capacity: number
  mentorId: string
  status: GroupStatus
}
export type Student = {
  id: string
  name: string
  phone: string
  groupId: string
  mentorId: string
  contractAmount: number
  paid: number
}
export type Payment = {
  id: string
  number: number
  date: string
  studentId: string
  mentorId: string
  gross: number
  transit: number
  method: PaymentMethod
  status: PaymentStatus
  comment?: string
}
export type Debt = {
  id: string
  type: 'TRANSIT' | 'STUDENT' | 'MENTOR'
  debtorName: string
  reason: string
  amount: number
  settled: number
  createdAt: string
  status: DebtStatus
}
export type AppUser = {
  id: string
  name: string
  telegram: string
  role: 'ADMIN' | 'MENTOR'
  status: UserStatus
  registeredAt: string
}

export const mentors: Mentor[] = [
  { id: 'm1', name: 'Jasur Karimov' },
  { id: 'm2', name: 'Dilnoza Rahimova' },
  { id: 'm3', name: 'Sardor To‘xtayev' },
  { id: 'm4', name: 'Aziza Yo‘ldosheva' },
]

export const groups: Group[] = [
  { id: 'g1', name: 'B-Nabor 12', category: 'B', contractPrice: 4_200_000, startDate: '2026-10-05', durationWeeks: 10, students: 18, capacity: 25, mentorId: 'm1', status: 'ACTIVE' },
  { id: 'g2', name: 'B-Nabor 13', category: 'B', contractPrice: 4_200_000, startDate: '2026-11-02', durationWeeks: 10, students: 9, capacity: 25, mentorId: 'm2', status: 'UPCOMING' },
  { id: 'g3', name: 'A-Nabor 6', category: 'A', contractPrice: 2_800_000, startDate: '2026-09-14', durationWeeks: 6, students: 25, capacity: 25, mentorId: 'm3', status: 'ACTIVE' },
  { id: 'g4', name: 'Dam olish kunlari 5', category: 'B', contractPrice: 4_600_000, startDate: '2026-09-28', durationWeeks: 12, students: 22, capacity: 25, mentorId: 'm4', status: 'ACTIVE' },
  { id: 'g5', name: 'BC-Nabor 3', category: 'BC', contractPrice: 6_500_000, startDate: '2026-08-03', durationWeeks: 14, students: 14, capacity: 20, mentorId: 'm1', status: 'ACTIVE' },
  { id: 'g6', name: 'B-Nabor 11', category: 'B', contractPrice: 4_000_000, startDate: '2026-07-06', durationWeeks: 10, students: 24, capacity: 25, mentorId: 'm2', status: 'FINISHED' },
  { id: 'g7', name: 'C-Nabor 2', category: 'C', contractPrice: 7_200_000, startDate: '2026-11-16', durationWeeks: 16, students: 4, capacity: 15, mentorId: 'm3', status: 'UPCOMING' },
  { id: 'g8', name: 'A-Nabor 5', category: 'A', contractPrice: 2_600_000, startDate: '2026-06-01', durationWeeks: 6, students: 20, capacity: 25, mentorId: 'm4', status: 'FINISHED' },
]

export const students: Student[] = [
  { id: 's1', name: 'Bekzod Aliyev', phone: '+998 90 123 45 67', groupId: 'g1', mentorId: 'm1', contractAmount: 4_200_000, paid: 2_100_000 },
  { id: 's2', name: 'Madina Usmonova', phone: '+998 93 456 78 90', groupId: 'g1', mentorId: 'm1', contractAmount: 4_200_000, paid: 4_200_000 },
  { id: 's3', name: 'Otabek Nazarov', phone: '+998 97 765 43 21', groupId: 'g3', mentorId: 'm3', contractAmount: 2_800_000, paid: 1_400_000 },
  { id: 's4', name: 'Shahzoda Qodirova', phone: '+998 99 111 22 33', groupId: 'g4', mentorId: 'm4', contractAmount: 4_600_000, paid: 3_000_000 },
  { id: 's5', name: 'Javohir G‘ofurov', phone: '+998 91 222 33 44', groupId: 'g5', mentorId: 'm1', contractAmount: 6_500_000, paid: 2_000_000 },
  { id: 's6', name: 'Nilufar Ergasheva', phone: '+998 94 333 44 55', groupId: 'g2', mentorId: 'm2', contractAmount: 4_200_000, paid: 1_000_000 },
  { id: 's7', name: 'Sherzod Mirzayev', phone: '+998 95 444 55 66', groupId: 'g1', mentorId: 'm1', contractAmount: 4_200_000, paid: 0 },
  { id: 's8', name: 'Gulnoza Hamidova', phone: '+998 98 555 66 77', groupId: 'g4', mentorId: 'm4', contractAmount: 4_600_000, paid: 4_600_000 },
  { id: 's9', name: 'Ulug‘bek Sobirov', phone: '+998 90 666 77 88', groupId: 'g3', mentorId: 'm3', contractAmount: 2_800_000, paid: 2_800_000 },
  { id: 's10', name: 'Kamola Tursunova', phone: '+998 93 777 88 99', groupId: 'g5', mentorId: 'm1', contractAmount: 6_500_000, paid: 3_250_000 },
]

export const payments: Payment[] = [
  { id: 'p1', number: 1048, date: '2026-10-20T10:15:00', studentId: 's1', mentorId: 'm1', gross: 1_050_000, transit: 0, method: 'CASH', status: 'PENDING' },
  { id: 'p2', number: 1047, date: '2026-10-20T09:40:00', studentId: 's5', mentorId: 'm1', gross: 2_000_000, transit: 300_000, method: 'CARD', status: 'PENDING' },
  { id: 'p3', number: 1046, date: '2026-10-19T17:20:00', studentId: 's4', mentorId: 'm4', gross: 1_500_000, transit: 0, method: 'CLICK', status: 'APPROVED' },
  { id: 'p4', number: 1045, date: '2026-10-19T12:05:00', studentId: 's2', mentorId: 'm1', gross: 2_100_000, transit: 0, method: 'TRANSFER', status: 'APPROVED' },
  { id: 'p5', number: 1044, date: '2026-10-18T15:30:00', studentId: 's3', mentorId: 'm3', gross: 700_000, transit: 200_000, method: 'CASH', status: 'REJECTED', comment: 'Chek rasmi yo‘q' },
  { id: 'p6', number: 1043, date: '2026-10-18T11:10:00', studentId: 's6', mentorId: 'm2', gross: 1_000_000, transit: 0, method: 'CARD', status: 'APPROVED' },
  { id: 'p7', number: 1042, date: '2026-10-17T16:45:00', studentId: 's9', mentorId: 'm3', gross: 1_400_000, transit: 0, method: 'CASH', status: 'APPROVED' },
  { id: 'p8', number: 1041, date: '2026-10-17T10:00:00', studentId: 's10', mentorId: 'm1', gross: 3_250_000, transit: 500_000, method: 'TRANSFER', status: 'APPROVED' },
  { id: 'p9', number: 1040, date: '2026-10-16T14:20:00', studentId: 's8', mentorId: 'm4', gross: 2_300_000, transit: 0, method: 'CLICK', status: 'APPROVED' },
  { id: 'p10', number: 1039, date: '2026-10-15T09:30:00', studentId: 's4', mentorId: 'm4', gross: 1_500_000, transit: 0, method: 'CASH', status: 'PENDING' },
  { id: 'p11', number: 1038, date: '2026-10-14T13:50:00', studentId: 's3', mentorId: 'm3', gross: 700_000, transit: 0, method: 'CARD', status: 'APPROVED' },
  { id: 'p12', number: 1037, date: '2026-10-13T18:05:00', studentId: 's8', mentorId: 'm4', gross: 2_300_000, transit: 0, method: 'TRANSFER', status: 'APPROVED' },
]

export const mentorDrafts: Payment[] = [
  { id: 'd1', number: 1, date: '2026-10-20T08:30:00', studentId: 's7', mentorId: 'm1', gross: 1_500_000, transit: 0, method: 'CASH', status: 'DRAFT' },
  { id: 'd2', number: 2, date: '2026-10-19T18:10:00', studentId: 's1', mentorId: 'm1', gross: 1_050_000, transit: 0, method: 'CARD', status: 'DRAFT' },
  { id: 'd3', number: 3, date: '2026-10-18T12:40:00', studentId: 's10', mentorId: 'm1', gross: 2_000_000, transit: 0, method: 'CLICK', status: 'DRAFT' },
  { id: 'd4', number: 4, date: '2026-10-17T16:00:00', studentId: 's5', mentorId: 'm1', gross: 800_000, transit: 0, method: 'CASH', status: 'DRAFT' },
]

export const debts: Debt[] = [
  { id: 'q1', type: 'TRANSIT', debtorName: 'Jasur Karimov', reason: 'To‘lov #1047 dan tranzit', amount: 300_000, settled: 0, createdAt: '2026-10-20', status: 'OPEN' },
  { id: 'q2', type: 'TRANSIT', debtorName: 'Jasur Karimov', reason: 'To‘lov #1041 dan tranzit', amount: 500_000, settled: 200_000, createdAt: '2026-10-17', status: 'PARTIAL' },
  { id: 'q3', type: 'STUDENT', debtorName: 'Sherzod Mirzayev', reason: 'Shartnoma bo‘yicha qoldiq', amount: 4_200_000, settled: 0, createdAt: '2026-10-05', status: 'OPEN' },
  { id: 'q4', type: 'STUDENT', debtorName: 'Javohir G‘ofurov', reason: 'Guruh almashtirish farqi', amount: 900_000, settled: 400_000, createdAt: '2026-09-30', status: 'PARTIAL' },
  { id: 'q5', type: 'MENTOR', debtorName: 'Sardor To‘xtayev', reason: 'Yoqilg‘i avansi', amount: 650_000, settled: 650_000, createdAt: '2026-09-22', status: 'SETTLED' },
  { id: 'q6', type: 'MENTOR', debtorName: 'Dilnoza Rahimova', reason: 'Naqd pul topshirilmagan', amount: 1_200_000, settled: 0, createdAt: '2026-10-12', status: 'OPEN' },
  { id: 'q7', type: 'TRANSIT', debtorName: 'Sardor To‘xtayev', reason: 'To‘lov #1030 dan tranzit', amount: 250_000, settled: 250_000, createdAt: '2026-10-02', status: 'SETTLED' },
]

export const users: AppUser[] = [
  { id: 'u1', name: 'Admin Rolibek', telegram: '@admin_roli', role: 'ADMIN', status: 'ACTIVE', registeredAt: '2026-01-10' },
  { id: 'u2', name: 'Jasur Karimov', telegram: '@jasur_k', role: 'MENTOR', status: 'ACTIVE', registeredAt: '2026-02-14' },
  { id: 'u3', name: 'Dilnoza Rahimova', telegram: '@dilnoza_r', role: 'MENTOR', status: 'ACTIVE', registeredAt: '2026-03-02' },
  { id: 'u4', name: 'Sardor To‘xtayev', telegram: '@sardor_t', role: 'MENTOR', status: 'ACTIVE', registeredAt: '2026-04-21' },
  { id: 'u5', name: 'Aziza Yo‘ldosheva', telegram: '@aziza_y', role: 'MENTOR', status: 'ACTIVE', registeredAt: '2026-05-08' },
  { id: 'u6', name: 'Rustam Xolmatov', telegram: '@rustam_x', role: 'MENTOR', status: 'PENDING_APPROVAL', registeredAt: '2026-10-19' },
  { id: 'u7', name: 'Feruza Abdullayeva', telegram: '@feruza_a', role: 'MENTOR', status: 'PENDING_APPROVAL', registeredAt: '2026-10-20' },
  { id: 'u8', name: 'Anvar Qosimov', telegram: '@anvar_q', role: 'MENTOR', status: 'BLOCKED', registeredAt: '2026-06-11' },
]

export const revenueByMonth = [
  { month: 'Yan', revenue: 38_400_000 },
  { month: 'Fev', revenue: 42_100_000 },
  { month: 'Mar', revenue: 51_800_000 },
  { month: 'Apr', revenue: 47_300_000 },
  { month: 'May', revenue: 58_900_000 },
  { month: 'Iyun', revenue: 63_200_000 },
  { month: 'Iyul', revenue: 71_500_000 },
  { month: 'Avg', revenue: 68_000_000 },
  { month: 'Sen', revenue: 79_600_000 },
  { month: 'Okt', revenue: 84_250_000 },
]

export const getStudent = (id: string) => students.find((s) => s.id === id)!
export const getMentor = (id: string) => mentors.find((m) => m.id === id)!
export const getGroup = (id: string) => groups.find((g) => g.id === id)!
