import { Router } from 'express';
import { getTicketTypes, getUserTickets, postUserTicket } from '../controllers';
import { authenticateToken } from '../middlewares';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken) // aplica verificação para todas as rotas
  .get('/types', getTicketTypes)
  .get('/', getUserTickets)
  .post('/', postUserTicket);

export { ticketsRouter };
