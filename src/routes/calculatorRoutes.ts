import express from 'express';
import {
  calculateCashDeposit,
  generateTermDepositFinalBalance,
  getTermDepositFinalBalance,
} from '../controllers/calculatorController.js';

const router = express.Router();

/**
 * @openapi
 * /api/calculators/term-deposits:
 *   get:
 *     description: Calculates final balance of term deposits
 *     summary: Get term deposit final balance
 *     operationId: getTermDepositFinalBalance
 *     tags:
 *       - Term deposits
 *     parameters:
 *       - in: query
 *         name: amount
 *         example: 10000
 *         schema:
 *           type: number
 *           description: Specify the starting amount
 *       - in: query
 *         name: rate
 *         example: 1.1
 *         schema:
 *           type: number
 *           description: Specify the annual percentage interest rate (APR), without % sign
 *       - in: query
 *         name: term
 *         example: 36
 *         schema:
 *           type: number
 *           description: Specify the investment term in months
 *       - in: query
 *         name: compound
 *         example: AT_MATURITY
 *         schema:
 *           type: string
 *           description: Specify the frequency that interest is paid. Allowed values are MONTHLY, QUATERLY, ANNUALLY or AT_MATURITY
 *           enum: [MONTHLY, QUATERLY, ANNUALLY, AT_MATURITY]
 *       - in: query
 *         name: yield
 *         example: RE_INVEST
 *         schema:
 *           type: string
 *           description: Specify the interest payment type. Allowed values are RE_INVEST or INCOME_STREAM
 *           enum: [RE_INVEST, INCOME_STREAM]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     finalBalance:
 *                       type: number
 *                       example: 10330
 *       4XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "One or more of the following values cannot be converted to number: 'amount', 'rate', 'term'"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Function not implemented"
 */
router.get('/term-deposits', getTermDepositFinalBalance);

/**
 * @openapi
 * /api/calculators/term-deposits:
 *   post:
 *     description: Calculates final balance of term deposits
 *     summary: Generate term deposit final balance
 *     operationId: generateTermDepositFinalBalance
 *     tags:
 *       - Term deposits
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 10000
 *               rate:
 *                 type: number
 *                 example: 1.1
 *               term:
 *                 type: number
 *                 example: 36
 *               compound:
 *                 type: string
 *                 example: AT_MATURITY
 *               yield:
 *                 type: string
 *                 example: RE_INVEST
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     finalBalance:
 *                       type: number
 *                       example: 10330
 *       4XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "One or more of the following values cannot be converted to number: 'amount', 'rate', 'term'"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Function not implemented"
 */
router.post('/term-deposits', generateTermDepositFinalBalance);

router.post('/cash-deposits', calculateCashDeposit);

export { router };
