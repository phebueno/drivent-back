import { Router } from 'express';
import { authenticateToken, validateBody } from '../middlewares';
import { getTicketPayment, postTicketPayment } from '../controllers';
import { paymentsSchema } from '../schemas/payments-schemas';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken) // aplica verificação para todas as rotas
  .get('', getTicketPayment)
  .post('/process', validateBody(paymentsSchema), postTicketPayment);

export { paymentsRouter };
