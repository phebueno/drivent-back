import { prisma } from '@/config';

async function getTicketTypesDB() {
  return prisma.ticketType.findMany();
}

async function postTicketDB(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: { ticketTypeId, enrollmentId, status: 'RESERVED', createdAt: new Date() },
  });
}

const ticketsRepository = { getTicketTypesDB, postTicketDB };

export default ticketsRepository;
