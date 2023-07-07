import { TicketType } from "@prisma/client";
import ticketsRepository from "../../repositories/tickets-repository";

async function getTicketTypes(): Promise<TicketType[]> {
    const result = await ticketsRepository.getTicketTypesDB();
  return result;
}

async function getUserTickets() {
    return;
  }

  async function postUserTicket() {
    return;
  }

const ticketsService = { getTicketTypes, getUserTickets, postUserTicket };

export default ticketsService;
