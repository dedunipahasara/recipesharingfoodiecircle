import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/layouts/Navbar';
import Sidebar from './components/layouts/Sidebar';
import AppRoutes from './routes/AppRoutes';
import useUIStore from './store/useUiStore';

const App = () => {
  const { isSidebarOpen } = useUIStore();

  return (
    <Router>
      <div className="min-h-screen bg-base-200/30 font-sans text-base-content">
        <Navbar />

        <div className="flex max-w-[1600px] mx-auto relative">
          <Sidebar />

          <main
            className={`flex-1 p-4 md:p-8 transition-all duration-300 ${
              isSidebarOpen ? 'md:ml-64' : 'ml-0'
            }`}
          >
            <AppRoutes />
          </main>
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          theme="colored"
        />
      </div>
    </Router>
  );
};

export default App;