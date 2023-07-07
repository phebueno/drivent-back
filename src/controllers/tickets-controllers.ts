import { Request, Response } from 'express';
import ticketsService from '../services/ticket-service';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '../middlewares';
import { TicketTypeId } from '../schemas/tickets-schemas';

export async function getTicketTypes(_req: AuthenticatedRequest, res: Response) {
  const ticketTypes = await ticketsService.getTicketTypes();
  res.status(httpStatus.OK).send(ticketTypes);
}

export async function getUserTickets(req: AuthenticatedRequest, res: Response) {
  const ticket = await ticketsService.getUserTickets();
  res.send('retorna tickets');
}

export async function postUserTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body as Record<string, number>;
  await ticketsService.postUserTicket(req.userId, ticketTypeId);
  res.send('posta tickets');
}
