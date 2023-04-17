import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

import { Footer } from '@/components/Footer';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { signUpWithEmail } from '@/api/supabaseAuth';

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    // This is a simple password validation, customize it as per your requirements
    return password.length >= 8;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email.');
      return;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters.');
      return;
    } else {
      setPasswordError('');
    }

    signUpWithEmail(email, password).then((_) => {
      router.push('/workouts');
    });
  };

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center text-center'>
            <div className='flex w-full flex-row justify-between self-start px-6'>
              <button type='button' onClick={() => router.back()}>
                {`< Go Back`}
              </button>
              <div className='text-5xl'>∞</div>
            </div>
            <div className='flex h-[80vh] flex-col items-center justify-center'>
              <div className='m-8 flex flex-col font-serif'>
                <div className='m-2'>Just here for a demo?</div>
                <div className='m-2'>
                  <Link className='underline' href='/sign-in'>
                    Sign in
                  </Link>{' '}
                  with these credentials
                </div>
                <div className='m-2'>username: supabase@rocksmysocks.com</div>
                <div className='m-2'>password: forrealforreal</div>
              </div>
              <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                <input
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='rounded border border-gray-400 p-2'
                  required
                />
                {emailError && (
                  <p className='text-sm text-red-500'>{emailError}</p>
                )}
                <input
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='rounded border border-gray-400 p-2'
                  required
                />
                {passwordError && (
                  <p className='text-sm text-red-500'>{passwordError}</p>
                )}
                <button
                  type='submit'
                  className='rounded bg-blue-500 p-2 text-white hover:bg-blue-700'
                >
                  Sign Up
                </button>
              </form>
            </div>
            <Footer />
          </div>
        </section>
      </main>
    </Layout>
  );
}
