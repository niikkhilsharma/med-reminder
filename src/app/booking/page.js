"use client";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
	const [patientEmail, setPatientEmail] = useState("");
	const [caretakerEmail, setCaretakerEmail] = useState("");
	const [timeOne, setTimeOne] = useState("10:00");
	const [timeTwo, setTimeTwo] = useState("15:00");
	const [timeThree, setTimeThree] = useState("20:00");
	const [tillDate, setTillDate] = useState(new Date());

	const handleSubmit = async e => {
		e.preventDefault();

		const res = await fetch("api/bookAppointment", {
			body: JSON.stringify({
				patientEmail,
				caretakerEmail,
				timeOne,
				timeTwo,
				timeThree,
				tillDate,
			}),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});

		const result = await res.json();
		// console.log(result);

		// console.log(patientEmail, caretakerEmail, timeOne, timeTwo, timeThree, tillDate);
	};

	return (
		<div className='w-full'>
			<section className='main m-auto flex justify-center items-center h-screen'>
				<div className='container m-auto'>
					<div className='flex border-2 w-max m-auto'>
						<div>
							<Image
								src='https://i.ibb.co/vZpZWs1/Screenshot-from-2020-06-12-11-53-06.png'
								alt=''
								className='w-full h-full'
								width={450}
								height={450}
								style={{ width: "auto", height: "auto" }}
							/>
						</div>
						<div>
							<form
								className='text-left p-5 h-full flex flex-col justify-between items-center'
								action='#'
								onSubmit={handleSubmit}>
								<p className='text-2xl mb-5 font-exo text-center'>Schedule Booking</p>
								<div>
									<div className='mb-5'>
										<label htmlFor='patientEmail' className='font-bold mr-5'>
											Patient Email
										</label>
										<input
											type='email'
											name='patientEmail'
											id='patientEmail'
											className='form-input rounded-md p-2'
											placeholder='Patient Email'
											required
											value={patientEmail}
											onChange={e => setPatientEmail(e.target.value)}
										/>
									</div>
									<div className='mb-5'>
										<label htmlFor='caretakerEmail' className='font-bold mr-5'>
											Caretaker Email
										</label>
										<input
											type='email'
											id='caretakerEmail'
											name='caretakerEmail'
											className='form-input rounded-md p-2'
											placeholder='Caretaker Email'
											required
											value={caretakerEmail}
											onChange={e => setCaretakerEmail(e.target.value)}
										/>
									</div>
									<div className='mb-5'>
										<label htmlFor='tillDate' className='font-bold mr-5'>
											Date
										</label>
										<input
											type='date'
											id='tillDate'
											name='tillDate'
											className='form-input rounded-md p-2'
											value={tillDate}
											onChange={e => setTillDate(e.target.value)}
										/>
									</div>
									<div className='mb-5'>
										<label htmlFor='time1' className='font-bold mr-5'>
											Select a time:
										</label>
										<div className='grid grid-cols-2 gap-4 mt-4'>
											<input
												type='time'
												name='time'
												value={timeOne}
												className='form-input rounded-md p-2'
												onChange={e => {
													console.log(e.target.value);
													setTimeOne(e.target.value);
												}}
											/>
											<input
												type='time'
												name='time'
												value={timeTwo}
												className='rounded-md p-2'
												onChange={e => {
													console.log(e.target.value);
													setTimeTwo(e.target.value);
												}}
											/>
											<input
												type='time'
												name='time'
												className='rounded-md p-2'
												value={timeThree}
												onChange={e => {
													console.log(e.target.value);
													setTimeThree(e.target.value);
												}}
											/>
										</div>
									</div>
								</div>
								<div className='text-center'>
									<input
										type='submit'
										value='Create Booking'
										className='border-2 p-3 rounded-md hover:bg-red-300 hover:cursor-pointer'
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
