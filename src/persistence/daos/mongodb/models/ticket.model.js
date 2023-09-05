import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema ({
    code: { type: String, required: true },
    purchase_datetime: { type: Date, required: true },
    amount: { type: Number, required: true },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts'},
    purchaser: { type: String, required: true}
});

export const ticketModel = mongoose.model (
    'ticket',
    TicketSchema
);