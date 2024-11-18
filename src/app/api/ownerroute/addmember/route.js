import mongoose from "mongoose";
import { memberDataSchema } from "@/lib/MemberSchema";
import { NextResponse } from "next/server";

// const DATABASE = "mongodb://127.0.0.1:27017/nextjs-gymgrow";
const DATABASE = "mongodb+srv://sourabh:sourabh@cluster0.konmz.mongodb.net/gymmmm?retryWrites=true&w=majority&appName=Cluster0"

export async function POST(req, res) {
    await mongoose.connect(DATABASE);
    let data = await req.json();

    // console.log("Received data:", data); // Debugging

    const { userName, name, address, phone, amount, feeDuration, planeType, gymname, registerdate, owner_id, morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress } = data;

    let result;
    let success = false;

    try {
        const alreadyMember = await memberDataSchema.findOne({ userName });
        if (alreadyMember) {
            result = "Member already exists";
        } else {
            const addMember = new memberDataSchema({
                userName, name, address, phone, amount, feeDuration, planeType, registerdate, owner_id, gymname,
                gymDetails: {
                    morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress
                }
            });

            // console.log("Member to add:", addMember); // Debugging

            result = await addMember.save();
            // console.log("Save result:", result); // Debugging

            if (result) {
                success = true;
            }
        }
    } catch (error) {
        console.error("Error adding member:", error); // Debugging
        result = error.message;
    }

    return NextResponse.json({ result, success });
}
