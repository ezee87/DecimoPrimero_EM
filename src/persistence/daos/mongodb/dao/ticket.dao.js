import { ticketModel } from "../models/ticket.model.js";
import { loggerDev } from "../../../../utils/logger.js"

export default class TicketDao {
    
    async createTicket (ticketData) {
        try {
            const data = await ticketModel.create ({
                ...ticketData,
                purchase_datetime: new Date ()
        });
            return data

        } catch (error) {
            loggerDev.error(error.message)
            throw new Error(error)
        }
    }
};