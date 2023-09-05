import mongoose from "mongoose";

const productSchemaFake = new mongoose.Schema ({
    title: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    code: { type: String, required: true },
    status: { type: String, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: { type: String, required: true },
    owner: { type: String, required: true, default: 'admin' }
});

export const ProductsModelFake =  mongoose.model(
    'productsfake',
    productSchemaFake
);