import {Schema, model, InferSchemaType} from "mongoose"; 
export const purchaseSchema = new Schema<PurchaseItem>({
    title: {
        type: String, 
        required:true
    }, 
    category:{
        type: String, 
        required:true 
    }, 
    store:{
        type: String, 
        required:true
    }, 
    price:{ 
        type: Number, 
        required: true, 
    }, 
    cashOnHand:{ 
        type:Number, 
        required:true
    }
}); 
export const PurchaseItem = mongoose.model('PurchaseItem', purchaseSchema); 
