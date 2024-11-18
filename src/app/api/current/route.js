import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ownerDataSchema } from "@/lib/OwnerSchema";

const SECRETKEY = "HELLOMYNAMEISSOURABHTHAKURFROMHARYANA"

export async function GET(req, res) {
    const authtoken = req.cookies.get("jstoken")?.value;
    // console.log(authtoken);
    let result;
    let success = false
    if (authtoken) {
        const data = jwt.verify(authtoken, SECRETKEY)
        // console.log(data);
        const ownerData = await ownerDataSchema.findById(data._id).select("-password")
        if (ownerData) {
            result = ownerData;
            success = true
        }
    }


    return NextResponse.json({ result, success })
}