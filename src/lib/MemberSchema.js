import mongoose from "mongoose";


const gymDetailsSchema = new mongoose.Schema({
    morningOpening: String,
    morningClosing: String,
    eveningOpening: String,
    eveningClosing: String,
    gymAddress: String,
}, { _id: false });

const MemberModel = new mongoose.Schema({
    userName: String,
    name: String,
    address: String,
    phone: Number,
    amount: Number,
    feeDuration: String,
    planeType: String,
    registerdate: String,
    gymname: String,
    owner_id: mongoose.Schema.Types.ObjectId,
    gymDetails: gymDetailsSchema,
    feeHistory: [{
        registerdate: Date,
        feeDuration: Date,
        planeType: String,
        amount: Number,
        remark: String
    }]
});

export const memberDataSchema = mongoose.models.memberdata || mongoose.model("memberdata", MemberModel)