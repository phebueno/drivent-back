import { Ticket, TicketType } from '@prisma/client';
import ticketsRepository from '../../repositories/tickets-repository';
import enrollmentsService from '../enrollments-service';
import { notFoundError } from '../../errors';

async function getTicketTypes(): Promise<TicketType[]> {
  const result = await ticketsRepository.getTicketTypesDB();
  return result;
}

async function getUserTickets(userId: number): Promise<Ticket> {
    const { id } = await enrollmentsService.getOneWithAddressByUserId(userId); //Emite erro 404 se n houver enrollment
    const result = await ticketsRepository.getUserTicketsDB(id);
    if(result.length===0) throw notFoundError();
  return result[0];
}

async function postUserTicket(userId: number, ticketTypeId: number) {
  const { id } = await enrollmentsService.getOneWithAddressByUserId(userId); //Emite erro 404 se n houver enrollment
  const newTicket = await ticketsRepository.postTicketDB(id, ticketTypeId);
  const ticketInfo = await getTicketTypeById(ticketTypeId);
  return { ...newTicket, TicketType: ticketInfo };
}

async function getTicketTypeById(ticketTypeId: number) {
  return await ticketsRepository.getTicketTypeByIdDB(ticketTypeId);
}

const ticketsService = { getTicketTypes, getUserTickets, postUserTicket };

export default ticketsService;
