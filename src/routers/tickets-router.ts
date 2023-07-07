import { Router } from 'express';
import { getTicketTypes, getUserTickets, postUserTicket } from '../controllers';
import { authenticateToken, validateBody } from '../middlewares';
import { ticketsSchema } from '../schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken) // aplica verificação para todas as rotas
  .get('/types', getTicketTypes)
  .get('/', getUserTickets)
  .post('/', validateBody(ticketsSchema), postUserTicket);

export { ticketsRouter };
