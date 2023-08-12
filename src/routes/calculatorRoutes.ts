import express from 'express';
import {
  calculateTermDeposit,
  calculateCashDeposit,
} from '../controllers/calculatorController.js';

const router = express.Router();

/**
 * @openapi
 * /api/calculators/term-deposits:
 *   post:
 *     description: Calculates final balance of term deposits
 *     summary: Get term deposit final balance
 *     operationId: calculateTermDeposit
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
router.post('/term-deposits', calculateTermDeposit);

router.post('/cash-deposits', calculateCashDeposit);

export { router };
