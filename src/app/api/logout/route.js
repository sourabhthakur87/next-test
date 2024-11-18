import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET(req, res) {
    let result;
    let success = false
    try {
        cookies().delete('jstoken')
        success = true
    } catch (error) {
        result = error
    }
    return NextResponse.json({ result, success })
}