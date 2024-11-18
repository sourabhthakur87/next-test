import { memberDataSchema } from "@/lib/MemberSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// const DATABASE = "mongodb://127.0.0.1:27017/nextjs-gymgrow";
const DATABASE = "mongodb+srv://sourabh:sourabh@cluster0.konmz.mongodb.net/gymmmm?retryWrites=true&w=majority&appName=Cluster0"

export async function GET(req, res) {
    let _id = res.params.id
    let result;
    let success = false;
    await mongoose.connect(DATABASE);
    try {
        let memberData = await memberDataSchema.find({ owner_id: _id });
        if (memberData.length > 0) {
            result = memberData;
            success = true;
        } else {
            result = "Member Not Found / Add Member";
        }
    } catch (error) {
        result = error.message;
    }
    return NextResponse.json({ result, success });
}

export async function POST(req, res) {
    await mongoose.connect(DATABASE);
    let _id = res.params.id
    let data = await req.json();
    let result;
    let success = false;

    try {
        let memberData = await memberDataSchema.findById({ _id });
        if (memberData) {
            const { amount, remark, feeDuration, planeType, registerdate } = data;
            console.log(amount, remark, feeDuration, planeType, registerdate);

            // Initialize feeHistory if it is undefined
            // if (!Array.isArray(memberData.feeHistory)) {
            //     memberData.feeHistory = [];
            // }

            let newFeeHistory = memberData.feeHistory.push({ amount, remark, feeDuration, planeType, registerdate });
            await memberData.save();
            result = memberData;
            success = true;
        } else {
            result = "Member Not Found";
        }
    } catch (error) {
        result = error.message;
    }

    return NextResponse.json({ result, success });
}



export async function DELETE(req, res) {
    await mongoose.connect(DATABASE);
    const _id = res.params.id
    console.log(_id);

    let result;
    let success = false;

    const deletemember = await memberDataSchema.deleteOne({ _id })
    if (deletemember) {
        result = "Member Deleted Success"
        success = true
    }
    else {
        result = "Something went wrong"
    }
    return NextResponse.json({ result, success });
}