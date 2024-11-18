// route.js

import mongoose from "mongoose";
import { ownerDataSchema } from "@/lib/OwnerSchema"; // Check the correct path to your schema file
import { NextResponse } from "next/server";

// const DATABASE = "mongodb://127.0.0.1:27017/nextjs-gymgrow";
const DATABASE = "mongodb+srv://sourabh:sourabh@cluster0.konmz.mongodb.net/gymmmm?retryWrites=true&w=majority&appName=Cluster0"

// Connect to MongoDB
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your POST handler
export async function POST(req, res) {
  try {
    // Parse incoming JSON data
    const data = await req.json();
    const {
      _id,
      morningOpening,
      morningClosing,
      eveningOpening,
      eveningClosing,
      gymAddress,
    } = data;

    // Find the owner by _id
    const owner = await ownerDataSchema.findById(_id);

    if (!owner) {
      return NextResponse.json({ result: "Owner Not Found", success: false });
    }

    // Update gymDetails fields
    owner.gymDetails.morningOpening = morningOpening;
    owner.gymDetails.morningClosing = morningClosing;
    owner.gymDetails.eveningOpening = eveningOpening;
    owner.gymDetails.eveningClosing = eveningClosing;
    owner.gymDetails.gymAddress = gymAddress;

    // Save the updated owner data
    await owner.save();

    return NextResponse.json({ result: owner, success: true });
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json({ result: error.message, success: false });
  }
}
