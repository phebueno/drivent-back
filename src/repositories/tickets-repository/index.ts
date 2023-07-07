import { prisma } from '@/config';

async function getTicketTypesDB() {
  return prisma.ticketType.findMany();
}

async function postTicketDB(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: { ticketTypeId, enrollmentId, status: 'RESERVED', createdAt: new Date() },
  });
}

async function getTicketTypeByIdDB(ticketTypeId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId,
    },
  });
}

async function getUserTicketsDB(enrollmentId: number) {
  return prisma.ticket.findMany({
    include: { TicketType: true },
    where: {
      enrollmentId,
    },
  });
}

const ticketsRepository = { getTicketTypesDB, postTicketDB, getTicketTypeByIdDB, getUserTicketsDB };

export default ticketsRepository;
