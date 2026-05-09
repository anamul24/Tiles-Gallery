"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleLoginFunc = async (data) => {
    console.log(data, "data");

    const { data: res, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password, 
      rememberMe: true,
      callbackURL: "/",
    });

    console.log(res, error);
    if (error) {
      alert(error.message);
    }
    if (res) {
      alert("Signin successful");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-violet-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Login to your TileStadia account</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(handleLoginFunc)}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-violet-500 transition"
              {...register("email", {
                required: "Email field is required",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full h-12 px-4 pr-12 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-violet-500 transition"
                {...register("password", {
                  required: "Password field is required",
                })}
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" onClick={() =>
                  setIsShowPassword(!isShowPassword)
                }
              >
                {isShowPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>{errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-700 transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-violet-300">Login</button>
        </form>
        <p className="text-center text-slate-600 mt-6">Don't have an account?{" "}
          <Link
            href="/register"
            className="text-violet-600 font-semibold hover:underline"
          >Register
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;