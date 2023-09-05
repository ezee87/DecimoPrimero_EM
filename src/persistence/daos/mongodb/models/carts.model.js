import mongoose from "mongoose";

const CartSchema = new mongoose.Schema ({
    products: [ 
        { type: mongoose.Schema.Types.ObjectId, 
          required: true, ref:'products', 
          quantity: { type: Number, default: 1 }
        }
    ]
});

CartSchema.pre('find', function(){
    this.populate('products')
})

export const CartModel = mongoose.model(
    'carts',
    CartSchema
);