import {
  InterestRateType,
  TermDepositOptions,
  YieldType,
} from '../models/deposit.js';

export const calculate = (params: TermDepositOptions) => {
  const { yieldType } = params;

  // if yieldType is RE_INVEST, then calculate use ReInvestTermDeposit function
  if (yieldType === YieldType.ReInvest) {
    return calculateReInvestTermDeposit(params);
  }

  // else, use IncomeStreamTermDeposit function
  return calculateIncomeStreamTermDeposit(params);
};

const calculateReInvestTermDeposit = (params: TermDepositOptions) => {
  const { interestRateType } = params;

  let finalBalance: number;
  // if interestRateType is COMPOUNDING, then use compounding interest rate calculation
  // else, use simple interest rate calculation
  if (interestRateType === InterestRateType.Compounding) {
    finalBalance = getCompoundingRateFinalAmount(params);
  } else {
    finalBalance = getSimpleRateFinalAmount(params);
  }

  return finalBalance;
};

export const compoundingTypeMapping = {
  MONTHLY: 1,
  QUATERLY: 3,
  ANNUALLY: 12,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const calculateIncomeStreamTermDeposit = (params: TermDepositOptions) => {
  throw { status: 500, message: 'Function not implemented.' };
};

const getSimpleRateFinalAmount = (params: TermDepositOptions) => {
  const { startingAmount, interestRate, investmentTerm } = params;
  /* console.log(`getSimpleRateFinalAmount params= ${JSON.stringify(params)}`); */
  return Math.floor(startingAmount * (1 + interestRate * investmentTerm));
};

const getCompoundingRateFinalAmount = (params: TermDepositOptions) => {
  const {
    startingAmount,
    interestRate,
    investmentTerm,
    numOfCompounds = 1,
  } = params;
  /* console.log(`getCompoundingRateFinalAmount params= ${JSON.stringify(params)}`); */
  return Math.floor(
    startingAmount *
      Math.pow(
        1 + interestRate / numOfCompounds,
        numOfCompounds * investmentTerm
      )
  );
};
