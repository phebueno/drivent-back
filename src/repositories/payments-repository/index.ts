import { prisma } from "../../config";
import { PaymentModel } from "../../services";

async function getTicketPaymentDB() {
  return 'ticket';
}

async function postTicketPaymentDB(paymentInfo: PaymentModel) {
  return prisma.payment.create({
    data: paymentInfo
  })
}

const paymentsRepository = { getTicketPaymentDB, postTicketPaymentDB };

export default paymentsRepository;
