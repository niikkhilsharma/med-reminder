import Link from "next/link";

export default async function Page() {
	const res = await fetch(`${process.env.PUBLIC_URL}/api/getReminders`, { cache: "no-store" });
	const allReminders = await res.json();

	return (
		<main>
			<div className='w-full h-screen flex flex-col justify-center items-center'>
				<div>
					<h1 className='text-4xl font-bold text-center mb-4'>Welcome to the Medicine Reminder App</h1>
					<h2 className='text-2xl font-bold text-center mb-4 underline uppercase'>
						You have <span className='text-red-500'>{allReminders.length}</span> reminders
					</h2>
					<div className='text-center my-10 animate-bounce'>
						<Link
							href={"/booking"}
							className='border-2 hover:cursor-pointer p-4 rounded-md font-bold font-mono hover:text-xl uppercase'>
							Schedule Medicine
						</Link>
					</div>
					<div className='flex justify-center items-center flex-wrap gap-4 m-10'>
						{allReminders.map((reminder, index) => {
							return (
								<div className='border-2 border-black p-4 rounded-md mb-4' key={index}>
									<h3 className='text-xl font-bold text-center mb-4'>
										PatientEmail:{" "}
										<span className='underline px-4 text-blue-500'>
											<Link href={`mailto:${reminder.patientEmail}`}>{reminder.patientEmail}</Link>
										</span>
									</h3>
									<h3 className='text-xl font-bold text-center mb-4'>
										CareTakerEmail:{" "}
										<span className='underline px-4 text-blue-500'>
											<Link href={`mailto:${reminder.caretakerEmail}`}>{reminder.caretakerEmail}</Link>
										</span>
									</h3>
									<div className='flex justify-center items-center space-x-4'>
										<div className='bg-sky-500 hover:bg-sky-700 p-4 rounded-full font-bold hover:cursor-pointer'>
											{reminder.timeOne}
										</div>
										<div className='bg-sky-500 hover:bg-sky-700 p-4 rounded-full font-bold hover:cursor-pointer'>
											{reminder.timeTwo}
										</div>
										<div className='bg-sky-500 hover:bg-sky-700 p-4 rounded-full font-bold hover:cursor-pointer'>
											{reminder.timeThree}
										</div>
									</div>
									<div className='text-center m-4'>
										The Medicine reminder will stop on <span className='underline font-bold'>{reminder.tillDate}</span>
									</div>
									{/* <div className='flex justify-center items-center'>
                        <Calendar value={reminder.tillDate} defaultValue={reminder.tillDate} />
                    </div> */}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</main>
	);
}
