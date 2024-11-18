import { ownerDataSchema } from "@/lib/OwnerSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers'

// const DATABASE = "mongodb://127.0.0.1:27017/nextjs-gymgrow"
const DATABASE = "mongodb+srv://sourabh:sourabh@cluster0.konmz.mongodb.net/gymmmm?retryWrites=true&w=majority&appName=Cluster0"

const SECRETKEY = "HELLOMYNAMEISSOURABHTHAKURFROMHARYANA"


export async function GET(req, res) {
    return NextResponse.json("Hello")
}

export async function POST(req, res) {
    await mongoose.connect(DATABASE)
    let data = await req.json();
    let result;
    let success = false

    if (data.login) {
        console.log("login attemp");
        const { email, password } = data
        try {
            const alreadyUser = await ownerDataSchema.findOne({ email });
            if (alreadyUser) {
                const validPass = await bcrypt.compare(password, alreadyUser.password);
                if (validPass) {
                    const token = jwt.sign({
                        _id: alreadyUser._id
                    }, SECRETKEY)
                    // console.log(token);
                    cookies().set("jstoken", token)
                    result = "Login Success"
                    success = true
                    return NextResponse.json({ result, success })
                }
            }
            else {
                result = "Invalid User and Password"
                return NextResponse.json({ result, success })
            }
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error, success })
        }

        return NextResponse.json({ result, success })
    }
    else {
        const { email, phone, password, gymname, name } = data
        result = await ownerDataSchema.findOne({ email, phone, gymname })
        if (result) {
            success = false
        }
        else {
            const securePass = await bcrypt.hash(password, 10)

            let resisterowner = await new ownerDataSchema({ email, phone, password: securePass, gymname, name })
            result = await resisterowner.save();
            console.log(result);
            if (result) {
                const token = jwt.sign({
                    _id: result._id
                }, SECRETKEY)
                // console.log(token);
                cookies().set("jstoken", token)
                success = true;
            }
        }
    }
    return NextResponse.json({ result, success })
}