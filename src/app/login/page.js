"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Login({ setUser }) {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleChange = e => {
		if (e.target.name === "email") {
			setEmail(e.target.value);
		} else if (e.target.name === "password") {
			setPassword(e.target.value);
		}
	};

	useEffect(() => {
		if (localStorage.getItem("token")) {
			router.push("/");
		}
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		const login = await axios.post("/api/login", { email, password });
		if (login.data.success) {
			localStorage.setItem("token", login.data.token);
			setUser({ value: login.data.token });
			toast.success("Successfully loged in", {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			setTimeout(() => {
				router.push("/");
			}, 2000);
		} else {
			toast.error(`${login.data.message}`, {
				position: "top-right",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};
	return (
		<div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<Image className='mx-auto h-10 w-auto' src='/user.webp' alt='logo' width={100} height={140} />
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
					Sign in to your account
				</h2>
			</div>
			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form className='space-y-6' method='POST' onSubmit={handleSubmit}>
					<div>
						<label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
							Email address
						</label>
						<div className='mt-2'>
							<input
								onChange={handleChange}
								value={email}
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								required=''
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>
					<div>
						<div className='flex items-center justify-between'>
							<label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
								Password
							</label>
							<div className='text-sm'>
								<Link href='/forgot' className='font-semibold text-pink-600 hover:text-pink-500'>
									Forgot password?
								</Link>
							</div>
						</div>
						<div className='mt-2'>
							<input
								onChange={handleChange}
								value={password}
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								required=''
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>
					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600'>
							Sign in
						</button>
					</div>
				</form>
				<p className='mt-10 text-center text-sm text-gray-500'>
					Not a member?
					<Link href='/signup' className='font-semibold leading-6 text-pink-600 hover:text-pink-500'>
						&nbsp;SignUP
					</Link>
				</p>
			</div>
		</div>
	);
}
