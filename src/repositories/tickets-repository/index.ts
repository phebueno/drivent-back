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

async function getTicketById(id: number) {
  return prisma.ticket.findFirst({
    where: {
      id,
    },
  });
}

async function getTicketByIdAndUserIdDB(id: number, userId: number) {
  return prisma.ticket.findFirst({
    where: {
      id,
      Enrollment: { userId },
    },
  });
}

const ticketsRepository = {
  getTicketTypesDB,
  postTicketDB,
  getTicketTypeByIdDB,
  getUserTicketsDB,
  getTicketById,
  getTicketByIdAndUserIdDB,
};

export default ticketsRepository;
