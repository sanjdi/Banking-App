export interface TermDepositOptions {
  startingAmount: number;
  interestRate: number;
  investmentTerm: number;
  interestRateType: InterestRateType;
  numOfCompounds?: number;
  yieldType: YieldType;
}

export interface FinalBalance {
  finalBalance: number;
}

export enum DepositType {
  TermDeposit = "TERM_DEPOSIT",
  CashDeposit = "CASH_DEPOSIT",
}

export enum CompoundingType {
  Monthly = "MONTHLY",
  Quaterly = "QUATERLY",
  Annually = "ANNUALLY",
  AtMaturity = "AT_MATURITY",
}

export enum YieldType {
  ReInvest = "RE_INVEST",
  IncomeStream = "INCOME_STREAM",
}

export enum InterestRateType {
  Simple = "SIMPLE",
  Compounding = "COMPOUNDING",
}
