import React from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import useAuthStore from '../../store/useAuthStore';
import { notify } from '../../utils/helpers';
import { HiOutlineShieldCheck, HiOutlineLockClosed } from 'react-icons/hi2';

const Settings = () => {
  const { user, updateUser } = useAuthStore();

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { currentPass, newPass, confirmPass } = Object.fromEntries(formData);

    if (currentPass !== user.password) {
      return notify.error("Current password incorrect!");
    }
    if (newPass !== confirmPass) {
      return notify.error("New passwords do not match!");
    }

    updateUser({ password: newPass });
    notify.success("Password updated successfully!");
    e.target.reset();
  };

  return (
    <div className="xl:ml-72 min-h-screen bg-[#FAFAFA] px-6 md:px-10 py-12 animate-fadeIn">
      
      {/* CENTERED CONTAINER */}
      <div className="max-w-2xl mx-auto space-y-10">
        
        {/* HEADER */}
        <header className="border-b border-gray-100 pb-8">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3 block">
            Account Security
          </span>
          <h1 className="text-4xl font-serif italic text-gray-900 flex items-center gap-4">
            Security <span className="not-italic font-black">Settings</span>
            <HiOutlineShieldCheck className="text-primary opacity-50" size={28} />
          </h1>
          <p className="text-sm text-gray-400 font-light mt-2">
            Manage your credentials and keep your culinary studio secure.
          </p>
        </header>

        {/* PASSWORD CARD */}
        <div className="bg-white rounded-[3rem] border border-gray-50 p-10 shadow-sm relative overflow-hidden group">
          {/* Decorative Background Icon */}
          <HiOutlineLockClosed className="absolute -right-6 -bottom-6 text-gray-50 size-48 -rotate-12 pointer-events-none transition-transform group-hover:scale-110 duration-700" />

          <div className="relative z-10">
            <h2 className="text-xl font-serif italic text-gray-800 mb-8 border-l-4 border-primary pl-4">
              Update <span className="not-italic font-black">Password</span>
            </h2>

            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div className="grid gap-6">
                <Input 
                  label="Current Password" 
                  name="currentPass" 
                  type="password" 
                  required 
                  className="!bg-gray-50/50 !border-gray-100 !rounded-2xl focus:!bg-white transition-all"
                />
                
                <div className="h-[1px] bg-gray-100/50 my-2" />

                <Input 
                  label="New Password" 
                  name="newPass" 
                  type="password" 
                  required 
                  className="!bg-gray-50/50 !border-gray-100 !rounded-2xl focus:!bg-white transition-all"
                />
                <Input 
                  label="Confirm New Password" 
                  name="confirmPass" 
                  type="password" 
                  required 
                  className="!bg-gray-50/50 !border-gray-100 !rounded-2xl focus:!bg-white transition-all"
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full !rounded-2xl !py-4 font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Save New Credentials
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* FOOTER NOTE */}
        <p className="text-center text-[10px] text-gray-300 font-medium uppercase tracking-widest">
          Last updated: {new Date().toLocaleDateString()} • Studio Secure v3.0
        </p>
      </div>
    </div>
  );
};

export default Settings;