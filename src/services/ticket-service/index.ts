import { TicketType } from '@prisma/client';
import ticketsRepository from '../../repositories/tickets-repository';
import enrollmentsService from '../enrollments-service';

async function getTicketTypes(): Promise<TicketType[]> {
  const result = await ticketsRepository.getTicketTypesDB();
  return result;
}

async function getUserTickets() {
  return;
}

async function postUserTicket(userId: number, ticketTypeId: number) {
  const { id } = await enrollmentsService.getOneWithAddressByUserId(userId);//Emite erro 404 se n houver enrollment
  return await ticketsRepository.postTicketDB(id, ticketTypeId);
}

const ticketsService = { getTicketTypes, getUserTickets, postUserTicket };

export default ticketsService;
