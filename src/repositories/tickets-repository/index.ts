import { prisma } from '@/config';

async function getTicketTypesDB() {
  return prisma.ticketType.findMany();
}

const ticketsRepository = { getTicketTypesDB };

export default ticketsRepository;
