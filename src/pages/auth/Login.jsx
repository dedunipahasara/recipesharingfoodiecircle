import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useAuthStore from '../../store/useAuthStore';
import { notify } from '../../utils/helpers';
import { HiOutlineSparkles, HiOutlineArrowRight } from "react-icons/hi2";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = Object.fromEntries(new FormData(e.target));
    const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
    const user = allUsers.find(u => u.username === username && u.password === password);

    if (user) {
      login(user);
      notify.success(`Welcome back, ${user.fullName}!`);
      navigate('/');
    } else {
      notify.error("Invalid username or password");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#FAFAFA] flex items-center justify-center p-6 overflow-y-auto">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, size: '30px 30px' }}>
      </div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-400/5 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-[440px] relative z-10 animate-fadeIn">
        
        {/* LOGO AREA */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-100 rounded-full shadow-sm text-primary text-[9px] font-black uppercase tracking-[0.3em] mb-6">
            <HiOutlineSparkles size={12} className="animate-pulse" />
            The Culinary Studio
          </div>
          <h1 className="text-5xl md:text-6xl font-serif italic text-gray-900 leading-tight mb-2">
            Foodie<span className="not-italic font-black text-primary">Circle</span>
          </h1>
          <div className="h-1 w-12 bg-primary mx-auto rounded-full opacity-20 mb-4"></div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            Authentic Taste • Local Passion • Since 2026
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white/80 backdrop-blur-xl p-10 md:p-12 rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white">
          <div className="mb-8">
            <h2 className="text-2xl font-serif italic text-gray-800">Welcome <span className="not-italic font-black">Back</span></h2>
            <p className="text-xs text-gray-400 mt-1">Please enter your kitchen credentials</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <Input 
                label="Username" 
                name="username" 
                placeholder="chef_identity" 
                required 
                className="!bg-white !border-gray-100 !rounded-2xl !py-4 focus:!border-primary/30 transition-all !text-sm shadow-sm"
              />
            </div>
            <div className="space-y-1">
              <Input 
                label="Password" 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                className="!bg-white !border-gray-100 !rounded-2xl !py-4 focus:!border-primary/30 transition-all !text-sm shadow-sm"
              />
            </div>
            
            <div className="flex justify-end">
              <button type="button" className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">
                Recover Access?
              </button>
            </div>

            <Button type="submit" className="group w-full !rounded-2xl !py-4 font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all bg-primary text-white flex items-center justify-center gap-2">
              Unlock Kitchen <HiOutlineArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {/* DIVIDER */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100"></span>
            </div>
            <div className="relative flex justify-center text-[9px] uppercase font-black tracking-[0.3em] text-gray-300">
              <span className="bg-[#fff] px-4">New Chapter</span>
            </div>
          </div>

          {/* SIGNUP LINK */}
          <div className="text-center">
            <Link to="/signup" className="group inline-flex flex-col items-center gap-1">
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Don't have an account?</span>
              <span className="text-primary font-black text-[12px] uppercase tracking-widest border-b-2 border-primary/10 group-hover:border-primary transition-all">
                Join the Circle
              </span>
            </Link>
          </div>
        </div>
        
        {/* FOOTER */}
        <footer className="text-center mt-12">
          <p className="text-[9px] text-gray-300 uppercase tracking-[0.5em] font-medium">
            Standard Studio Protocol © 2026
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;