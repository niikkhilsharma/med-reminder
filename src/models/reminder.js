import mongoose from "mongoose";

const reminder = new mongoose.Schema({
	patientEmail: { type: String, required: true },
	caretakerEmail: { type: String, required: true },
	timeOne: { type: String, required: true },
	timeTwo: { type: String, required: true },
	timeThree: { type: String, required: true },
	tillDate: { type: String, required: true },
});

const reminderSchema = mongoose.models.reminder || mongoose.model("reminder", reminder);
export default reminderSchema;
