import { prisma } from '../../config';
import { PaymentModel } from '../../services';

async function getTicketPaymentDB(ticketId: number, userId: number) {
  return prisma.payment.findFirst({
    where: { ticketId, Ticket: { Enrollment: { userId } } },
  });
}

async function postTicketPaymentDB(paymentInfo: PaymentModel) {
  return prisma.payment.create({
    data: paymentInfo,
  });
}

async function updateTicketPaidStatusDB(id: number){
  return prisma.ticket.update({
    data:{
      status: 'PAID'
    },
    where: {
      id,
    },
  });
}

const paymentsRepository = { getTicketPaymentDB, postTicketPaymentDB, updateTicketPaidStatusDB };

export default paymentsRepository;
