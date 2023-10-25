import { NextResponse } from "next/server";
import reminderSchema from "@/models/reminder";
import dbConnect from "@/utilities/mongoose";

export async function GET(request) {
	await dbConnect();
	const allReminders = await reminderSchema.find();
	console.log(allReminders);

	return NextResponse.json(allReminders, { status: 200 });
}
