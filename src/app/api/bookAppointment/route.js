import mongoose from "mongoose";
import dbConnect from "@/utilities/mongoose";
import { NextResponse } from "next/server";
const schedule = require("node-schedule");
import nodemailer from "nodemailer";
import reminderSchema from "@/models/reminder";

export async function POST(request) {
	await dbConnect();
	const res = await request.json();
	const { patientEmail, caretakerEmail, timeOne, timeTwo, timeThree, tillDate } = res;

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.GMAIL,
			pass: process.env.GMAIL_PASS,
		},
	});

	const mailOptions = {
		from: process.env.GMAIL,
		to: [patientEmail, caretakerEmail],
		subject: "Take Medicine 💊",
		text: "It's time to take medicine! 🥳",
	};

	const rule = new schedule.RecurrenceRule();
	rule.hour = parseInt(timeOne.split(":")[0], 10);
	rule.minute = parseInt(timeOne.split(":")[1], 10);

	const jobOne = schedule.scheduleJob(rule, function () {
		console.log("Time for tea!");
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.error("Error sending email:", error);
			} else {
				console.log("Email sent:", info.response);
			}
		});
	});

	rule.hour = parseInt(timeTwo.split(":")[0], 10);
	rule.minute = parseInt(timeTwo.split(":")[1], 10);

	const jobTwo = schedule.scheduleJob(rule, function () {
		console.log("Time for tea!");
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.error("Error sending email:", error);
			} else {
				console.log("Email sent:", info.response);
			}
		});
	});

	rule.hour = parseInt(timeThree.split(":")[0], 10);
	rule.minute = parseInt(timeThree.split(":")[1], 10);

	const jobThree = schedule.scheduleJob(rule, function () {
		console.log("Time for tea!");
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.error("Error sending email:", error);
			} else {
				console.log("Email sent:", info.response);
			}
		});
	});

	//Cancel all the mailing function if the last Remind date has passed
	const endDate = new Date(tillDate);
	if (endDate < new Date()) {
		jobOne.cancel();
		jobTwo.cancel();
		jobThree.cancel();
	}

	console.log("running");
	try {
		await reminderSchema.create({ patientEmail, caretakerEmail, timeOne, timeTwo, timeThree, tillDate });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ success: false, message: "Appointment Not Booked" }, { status: 400 });
	}

	return NextResponse.json({ success: true, message: "Appointment Booked" }, { status: 200 });
}
