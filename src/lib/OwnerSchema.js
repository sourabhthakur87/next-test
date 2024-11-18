import mongoose from "mongoose";

const ownerModel = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String,
    gymname: String,
    gymDetails: {
        morningOpening: String,
        morningClosing: String,
        eveningOpening: String,
        eveningClosing: String,
        gymAddress: String,
    },
});

export const ownerDataSchema = mongoose.models.ownerdata || mongoose.model("ownerdata", ownerModel)