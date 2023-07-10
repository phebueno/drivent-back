import { Response } from 'express';
import ticketsService from '../services/tickets-service';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '../middlewares';

export async function getTicketTypes(_req: AuthenticatedRequest, res: Response) {
  const ticketTypes = await ticketsService.getTicketTypes();
  res.status(httpStatus.OK).send(ticketTypes);
}

export async function getUserTickets(req: AuthenticatedRequest, res: Response) {
  const tickets = await ticketsService.getUserTickets(req.userId);
  res.send(tickets);
}

export async function postUserTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body as Record<string, number>;
  const newTicketInfo = await ticketsService.postUserTicket(req.userId, ticketTypeId);
  res.status(httpStatus.CREATED).send(newTicketInfo);
}
