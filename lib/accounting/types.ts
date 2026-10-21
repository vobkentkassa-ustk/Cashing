export type Role = 'admin' | 'mentor'

export type Viewer = { role: 'admin'; name: string } | { role: 'mentor'; mentorId: string; name: string }

export type DebtStatus = 'open' | 'partially_settled' | 'settled'
export type DebtorType = 'student' | 'mentor' | 'organization'
export type DebtCategory = 'student_related' | 'mentor_advance' | 'organization_transit' | 'other'

export type SettlementMethod = 'org_budget' | 'mentor_personal' | 'salary_deduction' | 'student_cash'

export type Debt = {
  id: string
  debtorType: DebtorType
  debtorId?: string
  debtorName: string
  relatedStudentId?: string
  relatedMentorId?: string
  category: DebtCategory
  reason: string
  originalAmount: number
  settledAmount: number
  outstandingAmount: number
  status: DebtStatus
  effectiveDate: string
  createdAt: string
  createdBy: string
  notes?: string
}

export type DebtSettlement = {
  id: string
  debtId: string
  amount: number
  method: SettlementMethod
  effectiveDate: string
  createdAt: string
  createdBy: string
  studentEntryId?: string
  cashTransactionId: string
}

export type LedgerEntryType =
  | 'cash_in'
  | 'cash_out'
  | 'student_payment'
  | 'debt_settlement'
  | 'mentor_repayment'
  | 'mentor_advance'
  | 'salary_deduction'
  | 'student_transfer'
  | 'adjustment'
  | 'reversal'

export type CashTransaction = {
  id: string
  type: LedgerEntryType
  description: string
  cashIn: number
  cashOut: number
  /** Amount of a non-cash (internal) operation. Never counted as cash. */
  internalAmount: number
  effectiveDate: string
  createdAt: string
  relatedDebtId?: string
  relatedStudentId?: string
  relatedMentorId?: string
  createdBy: string
}

export type CashTransactionRow = CashTransaction & {
  balanceAfter: number
  isInternal: boolean
  isHistorical: boolean
}

export type StudentEntryType = 'payment' | 'debt_settlement_credit' | 'transfer' | 'adjustment' | 'reversal'

export type StudentAccountEntry = {
  id: string
  studentId: string
  type: StudentEntryType
  amount: number
  description: string
  effectiveDate: string
  createdAt: string
  relatedDebtId?: string
  relatedCashTransactionId?: string
  createdBy: string
}

export type Mentor = { id: string; name: string; phone: string }

export type Group = {
  id: string
  name: string
  category: 'A' | 'B' | 'BC' | 'C'
  contractPrice: number
  /** null means the start date is unknown; never infer it. */
  startDate: string | null
  mentorId: string
  capacity: number
}

export type Student = {
  id: string
  name: string
  phone: string
  groupId: string
  mentorId: string
  contractAmount: number
}

export type StudentSummary = Student & {
  groupName: string
  mentorName: string
  paidToDate: number
  paidPercent: number
  balanceDue: number
  threshold: ThresholdStatus
  openDebtCount: number
}

export type ThresholdStatus =
  | { kind: 'ok' }
  | { kind: 'warning' }
  | { kind: 'not_started' }
  | { kind: 'unknown_start' }
  | { kind: 'paid' }

export type AuditAction =
  | 'cash_transaction_created'
  | 'debt_created'
  | 'debt_settled'
  | 'student_payment_recorded'
  | 'historical_payment_recorded'
  | 'settlement_rejected'

export type AuditEvent = {
  id: string
  at: string
  actor: string
  actorRole: Role
  action: AuditAction
  amount?: number
  debtId?: string
  studentId?: string
  mentorId?: string
  cashTransactionId?: string
  studentEntryId?: string
  settlementId?: string
  before?: string
  after?: string
  outcome: 'success' | 'failure'
  note?: string
}

export type DateRange = { from: string | null; to: string | null }

export type CashSummary = {
  currentBalance: number
  rangeIn: number
  rangeOut: number
  rangeNet: number
  rangeInternal: number
  openDebtTotal: number
  unsettledCount: number
  openingBalanceForRange: number
}

export type DailyCashPoint = { date: string; label: string; cashIn: number; cashOut: number }

export type SettleDebtInput = {
  debtId: string
  amount: number
  method: SettlementMethod
  expectedOutstanding: number
  idempotencyKey: string
}

export type SettleDebtResult = {
  debt: Debt
  settlement: DebtSettlement
  studentEntry?: StudentAccountEntry
  studentBalance?: number
  cashTransaction: CashTransaction
  audit: AuditEvent
}

export type CreateDebtInput = {
  category: DebtCategory
  relatedStudentId?: string
  mentorId?: string
  reason: string
  amount: number
  effectiveDate: string
  paidFromCash: boolean
  notes?: string
}

export type CreateCashTransactionInput = {
  type: 'cash_in' | 'cash_out' | 'student_payment'
  amount: number
  description: string
  effectiveDate: string
  relatedStudentId?: string
}
