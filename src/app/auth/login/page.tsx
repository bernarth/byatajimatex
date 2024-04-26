"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form"

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const router = useRouter();
  const [ error, setError ] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/admin");
      router.refresh();
    }
  });

  return (
    <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
      <form onSubmit={onSubmit} className='w-1/4'>

        {error && (
          <p className='bg-red-500 text-lg text-white p-3 rounded mb-2'>{error}</p>
        )}

        <h1 className='text-slate-900 font-bold text-4xl mb-4'>
          Login
        </h1>
        <label htmlFor='email' className='text-slate-500 mb-2 block text-sm'>
          Email:
        </label>
        <input type='email'
          {...(register('email', {
            required: {
              value: true,
              message: 'Email is required'
            }
          }))}
          className='p-3 rounded block mb-2 bg-slate-200 text-slate-900 w-full'
          placeholder='youremail@email.com'
        />
        {errors.email && (
          <span className='text-red-500 text-xs'>{errors.email.message}</span>
        )}
        
        <label htmlFor='password' className='text-slate-500 mb-2 block text-sm'>
          Password:
        </label>
        <input type='password'
          {...(register('password', {
            required: {
              value: true,
              message: 'Password is required'
            }
          }))}
          className='p-3 rounded block mb-2 bg-slate-200 text-slate-900 w-full'
          placeholder='********'
        />
        {errors.password && (
          <span className='text-red-500 text-xs'>{errors.password.message}</span>
        )}

        <button
          className='w-full bg-blue-500 text-white p-3 rounded-lg mt-2'
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;