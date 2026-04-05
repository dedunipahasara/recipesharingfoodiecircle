import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiOutlineCamera } from "react-icons/hi";
import { HiOutlineSparkles, HiOutlineArrowRight } from "react-icons/hi2";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import useAuthStore from "../../store/useAuthStore";
import { notify } from "../../utils/helpers";

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [profilePreview, setProfilePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    if (data.password.length < 6) {
      return notify.error("Password must be at least 6 characters");
    }

    const newUser = {
      ...data,
      id: Date.now().toString(),
      profilePhoto:
        profilePreview ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`,
      followersCount: 0,
      followingCount: 0,
      recipesCreated: 0,
      favorites: [],
    };

    const existingUsers = JSON.parse(localStorage.getItem("all_users") || "[]");

    if (existingUsers.find((u) => u.username === newUser.username)) {
      return notify.error("Username already taken!");
    }

    existingUsers.push(newUser);
    localStorage.setItem("all_users", JSON.stringify(existingUsers));

    login(newUser);
    notify.success(`Welcome to the circle, ${newUser.fullName}! 🍳`);
    navigate("/");
  };

  return (
    /* fixed inset-0 and z-[100] ensures the sidebar/navbar are completely hidden */
    <div className="fixed inset-0 z-[100] bg-[#FAFAFA] flex items-center justify-center p-6 overflow-y-auto">
      
      {/* ARTISTIC BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
      </div>
      <div className="absolute top-[-5%] right-[-5%] w-[45%] h-[45%] bg-primary/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[45%] h-[45%] bg-orange-400/5 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-[480px] relative z-10 py-10 animate-fadeIn">

        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-100 rounded-full shadow-sm text-primary text-[9px] font-black uppercase tracking-[0.3em] mb-6">
            <HiOutlineSparkles size={12} className="animate-pulse" />
            Join the Circle
          </div>
          <h1 className="text-5xl font-serif italic text-gray-900 leading-tight">
            Create <span className="font-black not-italic text-primary">Account</span>
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-3">
            Your journey to culinary mastery starts here
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white">

          <form onSubmit={handleSignup} className="space-y-5">

            {/* PROFILE IMAGE UPLOAD */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-28 h-28 rounded-full ring-8 ring-gray-50 overflow-hidden shadow-inner bg-white">
                  <img
                    src={profilePreview || "https://api.dicebear.com/7.x/avataaars/svg?seed=new"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt="Profile Preview"
                  />
                </div>
                <label className="absolute bottom-0 right-0 bg-primary text-white p-2.5 rounded-xl shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all border-4 border-white">
                  <HiOutlineCamera size={18} />
                  <input type="file" hidden onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
              <p className="text-[8px] uppercase font-black text-gray-300 tracking-[0.3em] mt-4">Chef Portrait</p>
            </div>

            {/* INPUT FIELDS */}
            <div className="grid gap-4">
              <Input 
                label="Full Name" 
                name="fullName" 
                placeholder="e.g. Gordon Ramsay"
                required 
                className="!bg-white !border-gray-100 !rounded-2xl !py-3.5 !text-sm shadow-sm focus:!border-primary/30 transition-all"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Username" 
                  name="username" 
                  placeholder="chef_123"
                  required 
                  className="!bg-white !border-gray-100 !rounded-2xl !py-3.5 !text-sm shadow-sm"
                />
                <Input 
                  label="Email" 
                  name="email" 
                  type="email" 
                  placeholder="chef@foodie.com"
                  required 
                  className="!bg-white !border-gray-100 !rounded-2xl !py-3.5 !text-sm shadow-sm"
                />
              </div>
              <Input 
                label="Password" 
                name="password" 
                type="password" 
                placeholder="••••••••"
                required 
                className="!bg-white !border-gray-100 !rounded-2xl !py-3.5 !text-sm shadow-sm"
              />
            </div>

            <Button type="submit" className="group w-full mt-4 !rounded-2xl !py-4 font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all bg-primary text-white flex items-center justify-center gap-2">
              Start Cooking <HiOutlineArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Button>

          </form>

          {/* FOOTER LINK */}
          <div className="relative mt-10 pt-6 border-t border-gray-50 text-center">
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">
              Already a member?
            </p>
            <Link to="/login" className="text-primary font-black text-[12px] uppercase tracking-widest border-b-2 border-primary/10 hover:border-primary transition-all">
              Login to Kitchen
            </Link>
          </div>
        </div>
        
        <p className="text-center mt-10 text-[9px] text-gray-300 uppercase tracking-[0.4em]">
          Studio Protocol © 2026
        </p>
      </div>
    </div>
  );
};

export default SignUp;