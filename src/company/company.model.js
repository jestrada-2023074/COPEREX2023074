//Model of Company
import mongoose from "mongoose"

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLength: [25, `Can't be overcome 25 characters`]
    },
    impactLevel:{
        type: String,
        enunm:['High', 'Half', 'Low'],
        required: [true, 'Impact level is required']
    },
    yearsOfExperience: {
        type: Number,
        required: [true, 'Years of Experience is required'],
    },
    category: {
        type: String,
        enum: ['Technology', 'Manufacture', 'Services', 'Trade', 'Others'],
        required:  [true, 'Category is required'],
    },
    Email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        minLength: [8, `Can't be overcome 16 characters`],
        maxLength: [15, 'Phone must be 15 numbers'],
    },
    address: {
        type: String,
        required: true,
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
})
export default mongoose.model("Company",companySchema)