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

const paymentsRepository = { getTicketPaymentDB, postTicketPaymentDB };

export default paymentsRepository;
