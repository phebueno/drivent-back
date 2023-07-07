import { Request, Response } from "express";
import ticketsService from "../services/ticket-service";
import httpStatus from "http-status";

export async function getTicketTypes(_req:Request, res: Response){
    const ticketTypes = await ticketsService.getTicketTypes();
    res.status(httpStatus.OK).send(ticketTypes);
}

export async function getUserTickets(req:Request, res: Response){
    const ticket = await ticketsService.getUserTickets();
    res.send('retorna tickets');
}

export async function postUserTicket(req:Request, res: Response){
    await ticketsService.postUserTicket();
    res.send('posta tickets');
}

