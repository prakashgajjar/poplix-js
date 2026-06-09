'use client'
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { handleSignup } from '../actions/auth/signup';
import { handleLogin } from '../actions/auth/login';
import { handleOtp } from '../actions/auth/otpverification';
import { checkAuth } from '../actions/auth/auth';
import { checkusername } from '../actions/auth/ckeckusername';
import toast from 'react-hot-toast';

import Loader from '../components/Loader';

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [isOtpVisible, setIsOtpVisible] = useState(false)
  const [ckeckusernameData, setCkeckusernameData] = useState(null);
  const [otp, setOtp] = useState('')
  const [data, setData] = useState({
    email: '',
    password: '',
    fullname: '',
    username: ''
  })

  const [loading, setLoading] = useState(false); // loader state

  useEffect(() => {
    setShow(true)
  }, [])

  async function verifyAuth() {
    const response = await checkAuth();
    if (response) {
      const hasReloaded = localStorage.getItem("hasReloaded");

      if (!hasReloaded) {
        localStorage.setItem("hasReloaded", "true");
        router.replace("/home");
        window.location.reload();
      }
    }
  }

  useEffect(() => {
    verifyAuth();
  }, [router]);

  // ===== Signup =====
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await handleSignup(e, data);
      if (success.status === 201) {
        setIsOtpVisible(true);
      }
      if (success.status === 409) {
        toast.error("Oops! This email is already registered. Try logging in?");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ===== Login =====
  const onSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await handleLogin(e, data);
      if (success) {
        router.push('/home');
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ===== OTP Verification =====
  const onOtpverification = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await handleOtp(e, data, otp);
      if (success) {
        router.push('/home');
      }
    } catch (err) {
      console.error(err);
      toast.error("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-gray-800 text-white px-4 relative">
      {loading && <Loader />} {/* show loader overlay */}

      <div className="max-w-6xl w-full md:grid-cols-2 gap-8 items-center py-10">
        {/* Left: Animated Image */}

        {/* Right: Auth Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-zinc-900 rounded-2xl p-8 w-full max-w-md mx-auto shadow-2xl border border-zinc-700"
        >
          <h2 className="text-4xl font-extrabold tracking-wide text-center mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            {isLogin ? 'Welcome back to Poplix' : 'Join the Poplix Revolution'}
          </h2>

          {/* Show Login / Signup form */}
          {isLogin ? (
            <form className="space-y-4" onSubmit={onSubmitLogin}>
              <input
                type="text"
                placeholder="Email or username"
                className="input-style"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="input-style"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <button
                type="submit"
                className="btn-style bg-blue-600 hover:bg-blue-700"
              >
                Log In
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={onSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="input-style"
              />
              {!data.email.endsWith("@gmail.com") && data.email.length > 0 && (
                <p className="text-yellow-400 text-xs">Only Gmail allowed</p>
              )}

              <input
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="input-style"
              />
              {data.password.length > 0 && data.password.length < 6 && (
                <p className="text-yellow-400 text-xs">Min 6 characters required</p>
              )}

              <input
                type="text"
                placeholder="Full Name"
                value={data.fullname}
                onChange={(e) => setData({ ...data, fullname: e.target.value })}
                className="input-style"
              />
              {!/^[a-zA-Z\s]+$/.test(data.fullname) && data.fullname.length > 0 && (
                <p className="text-yellow-400 text-xs">No numbers allowed in name</p>
              )}

              <input
                type="text"
                placeholder="Username"
                value={data.username}
                onChange={(e) => {
                  const newUsername = e.target.value;
                  setData({ ...data, username: newUsername });

                  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9._]{5,}$/;
                  if (usernameRegex.test(newUsername)) {
                    (async () => {
                      const check = await checkusername(newUsername);
                      setCkeckusernameData(check.username);
                    })();
                  } else {
                    setCkeckusernameData(null);
                  }
                }}
                className="input-style"
              />
              <div className="text-xs">
                {!/^[a-zA-Z]/.test(data.username) && data.username.length > 0 ? (
                  <p className="text-yellow-400">Start with a letter</p>
                ) : /[^a-zA-Z0-9._]/.test(data.username) ? (
                  <p className="text-yellow-400">Only letters, numbers, `.` and `_` allowed</p>
                ) : data.username.includes(" ") ? (
                  <p className="text-yellow-400">No spaces allowed</p>
                ) : data.username.length > 0 && data.username.length < 6 ? (
                  <p className="text-yellow-400">Min 6 characters</p>
                ) : ckeckusernameData === false ? (
                  <p className="text-red-500">Username taken</p>
                ) : ckeckusernameData === true ? (
                  <p className="text-green-400">Username available</p>
                ) : null}
              </div>

              {(() => {
                const valid = data.email.endsWith("@gmail.com") &&
                  data.password.length >= 6 &&
                  /^[a-zA-Z\s]+$/.test(data.fullname) &&
                  /^[a-zA-Z][a-zA-Z0-9._]{5,}$/.test(data.username) &&
                  ckeckusernameData === true;

                return (
                  <button
                    type="submit"
                    disabled={!valid}

                    className={`btn-style ${valid ? "bg-green-600 hover:bg-green-700" : "bg-zinc-700 cursor-not-allowed"}`}
                  >
                    Sign Up
                  </button>
                );
              })()}
            </form>
          )}

          {/* OTP Box */}
          {isOtpVisible && (
            <div className="mt-5 space-y-3">
              <input
                type="text"
                placeholder="Enter OTP"
                className="input-style"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={onOtpverification}
                className="btn-style bg-blue-600 hover:bg-blue-700"
              >
                Verify OTP
              </button>
            </div>
          )}

          {/* Toggle login/signup */}
          <div className="text-center text-sm text-zinc-400 mt-6">
            {isLogin ? (
              <>
                Don’t have an account?{' '}
                <button
                  onClick={() => {
                    setIsLogin(false)
                    setData({ email: '', password: '', fullname: '', username: '' });
                  }
                  }
                  className="text-green-400 hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setData({ email: '', password: '', fullname: '', username: '' });
                    setIsLogin(true);
                    setIsOtpVisible(false);
                  }}
                  className="text-blue-400 hover:underline"
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
