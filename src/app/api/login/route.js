import { NextResponse } from "next/server";
import dbConnect from "@/utilities/mongoose";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import User from "@/models/user";

export async function POST(request) {
	const { searchParams } = new URL(request.url);
	const email = searchParams.get("email");
	const password = searchParams.get("password");

	await dbConnect();

	try {
		const user = await User.findOne({ email });
		if (user) {
			if (password === CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8)) {
				const token = jwt.sign({ user }, process.env.JWT_SECRET);
				return NextResponse.json({ success: true, token }, { status: 200 });
			} else {
				return NextResponse.json({ success: false, message: "Invalid Credentials" }, { status: 200 });
			}
		} else {
			return NextResponse.json({ success: false, message: "Invalid Credentials" }, { status: 200 });
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
	}
}
