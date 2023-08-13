/* eslint-disable @typescript-eslint/no-explicit-any */
import Express from 'express';
import {
  calculate,
  compoundingTypeMapping,
} from '../services/calculatorService.js';
import {
  CompoundingType,
  FinalBalance,
  InterestRateType,
  TermDepositOptions,
  YieldType,
} from '../models/deposit.js';

export const getTermDepositFinalBalance = (
  req: Express.Request,
  res: Express.Response
) => {
  const { query } = req;

  //validate inputs for null values
  if (
    !query.amount ||
    !query.rate ||
    !query.term ||
    !query.compound ||
    !query.yield
  ) {
    const message: string =
      "One or more of the following keys is missing or is empty in request body: 'amount', 'rate', 'term', 'compound', 'yield'";

    console.log(message);

    res.status(400).send({
      status: 'FAILED',
      data: {
        error: message,
      },
    });

    return;
  }

  // validate inputs for number values
  const amount: number = parseFloat(query.amount as string);
  const ratePerYear: number = parseFloat(query.rate as string);
  const termInMonths: number = parseInt(query.term as string);

  if (isNaN(amount) || isNaN(ratePerYear) || isNaN(termInMonths)) {
    const message: string =
      "One or more of the following values cannot be converted to number: 'amount', 'rate', 'term'";

    console.log(message);

    res.status(400).send({
      status: 'FAILED',
      data: {
        error: message,
      },
    });

    return;
  }

  // validate compound input values
  const compound: string = query.compound as string;
  const compoundingTypeValues: string[] = Object.values(CompoundingType);
  if (!compoundingTypeValues.includes(compound)) {
    const message: string = `Invalid compound value. Please select either: ${compoundingTypeValues}`;

    console.log(message);

    res.status(400).send({
      status: 'FAILED',
      data: {
        error: message,
      },
    });

    return;
  }

  // validate yield input values
  const yieldval: string = query.yield as string;
  const yieldTypeValues: string[] = Object.values(YieldType);
  if (!yieldTypeValues.includes(yieldval)) {
    const message: string = `Invalid yield value. Please select either: ${yieldTypeValues}`;

    console.log(message);

    res.status(400).send({
      status: 'FAILED',
      data: {
        error: message,
      },
    });

    return;
  }

  // populate options used to calculate final balance
  // const yieldType: keyof typeof YieldType = yieldval as keyof typeof YieldType;
  // console.log(`yieldType= ${yieldType}`); //XX
  // console.log(`YieldType[yieldType]= ${YieldType[yieldType]}`); //XX
  const options: TermDepositOptions = {
    startingAmount: amount,
    interestRate: ratePerYear / 100, // convert rate to decimal
    investmentTerm: termInMonths / 12, // convert term to years
    interestRateType: InterestRateType.Compounding, // default type is COMPOUNDING
    yieldType: YieldType.ReInvest, // default type is RE_INVEST
  };

  // if compoundingType is AT_MATURITY, then use simple interest rate calculation
  // else, use componding interest rate calculation with number of compounds,
  // to calculate final balance
  const compoundingType: keyof typeof CompoundingType =
    compound as keyof typeof CompoundingType;
  /* console.log(
    `compoundingType= ${compoundingType}, CompoundingType.AtMaturity= ${CompoundingType.AtMaturity}`
  ); //XX */
  if (compound === CompoundingType.AtMaturity) {
    options.interestRateType = InterestRateType.Simple;
  } else {
    options.interestRateType = InterestRateType.Compounding;
    options.numOfCompounds =
      termInMonths /
      compoundingTypeMapping[compound as keyof typeof compoundingTypeMapping];
  }

  /* console.log(`options= ${JSON.stringify(options)}`); //XX */

  // pass options to service layer to calculate final balance
  // wrap the result in an object before sending to client-side
  const result: FinalBalance = {
    finalBalance: calculate(options),
  };

  // log the output to console
  console.log(
    `Final balance after ${options.investmentTerm.toFixed(2)} years for ${
      options.startingAmount
    } with ${ratePerYear.toFixed(2)}% pa. interest paid ${
      compound === CompoundingType.AtMaturity ? '' : 'at '
    }${compoundingType} is: ${result.finalBalance}`
  );

  // send resonse to client-side
  res.status(200).send({ status: 'OK', data: result });
};

export const generateTermDepositFinalBalance = (
  req: Express.Request,
  res: Express.Response
) => {
  const { body } = req;

  //validate inputs for null values
  if (
    !body.amount ||
    !body.rate ||
    !body.term ||
    !body.compound ||
    !body.yield
  ) {
    const message: string =
      "One or more of the following keys is missing or is empty in request body: 'amount', 'rate', 'term', 'compound', 'yield'";

    console.log(message);

    res.status(400).send({
      status: 'FAILED',
      data: {
        error: message,
      },
    });

    return;
  }

  // validate inputs for number values
  const amount: number = parseFloat(body.amount);
  const ratePerYear: number = parseFloat(body.rate);
  const termInMonths: number = parseInt(body.term);

  if (isNaN(amount) || isNaN(ratePerYear) || isNaN(termInMonths)) {
    const message: string =
      "One or more of the following values cannot be converted to number: 'amount', 'rate', 'term'";

    console.log(message);

    res.status(400).send({
      status: 'FAILED',
      data: {
        error: message,
      },
    });

    return;
  }

  // populate options used to calculate final balance
  const compoundingType: CompoundingType = body.compound;
  const options: TermDepositOptions = {
    startingAmount: amount,
    interestRate: ratePerYear / 100, // convert rate to decimal
    investmentTerm: termInMonths / 12, // convert term to years
    interestRateType: InterestRateType.Compounding, // default type is compunding
    yieldType: body.yield,
  };

  // if compoundingType is AT_MATURITY, then use simple interest rate calculation
  // else, use componding interest rate calculation with number of compounds,
  // to calculate final balance
  /* console.log(
    `compoundingType= ${compoundingType}, CompoundingType.AtMaturity= ${CompoundingType.AtMaturity}`
  ); */
  if (compoundingType === CompoundingType.AtMaturity) {
    options.interestRateType = InterestRateType.Simple;
  } else {
    options.interestRateType = InterestRateType.Compounding;
    options.numOfCompounds =
      termInMonths / compoundingTypeMapping[compoundingType];
  }

  /* console.log(`options= ${JSON.stringify(options)}`); */

  // pass options to service layer to calculate final balance
  // wrap the result in an object before sending to client-side
  const result: FinalBalance = {
    finalBalance: calculate(options),
  };

  // log the output to console
  console.log(
    `Final balance after ${options.investmentTerm.toFixed(2)} years for ${
      options.startingAmount
    } with ${ratePerYear.toFixed(2)}% pa. interest paid ${
      compoundingType === CompoundingType.AtMaturity ? '' : 'at '
    }${compoundingType} is: ${result.finalBalance}`
  );

  // send resonse to client-side
  res.status(200).send({ status: 'OK', data: result });
};

export const calculateCashDeposit = (
  req: Express.Request,
  res: Express.Response
) => {
  const message: string = 'Function not implemented';

  console.log(message);

  res.status(400).send({
    status: 'FAILED',
    data: {
      error: message,
    },
  });
};
