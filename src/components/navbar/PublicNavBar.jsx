import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const PublicNavBar = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <a href="/">
        <img src="/assets/logo.jpg" alt="Logo" className="h-10 w-10" />  
        </a>  
        <span className="text-lg">Glorius Vision University</span> 
      </div>
      <div className="md:flex hidden space-x-6">
        <Link to="/about">About</Link>
        {/* <Link to="/cgpa-calculator">CGPA Calculator</Link> */}
        <Link to="/past-questions">Past Questions</Link>
        <Link to="/faqs">FAQs</Link>
        <Link to="/contact-us">Contact</Link>
      </div>
      <div className="md:flex hidden space-x-4">
        <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</Link>
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={() => setNavOpen(!navOpen)}>
          {navOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>
      {navOpen && (
        <div className="fixed top-0 right-0 h-full bg-white w-64 shadow-lg z-50">
          <div className="flex justify-end py-4 px-4">
            <button onClick={() => setNavOpen(false)}>
              <AiOutlineClose size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-4 px-4">
            <Link to="/about" className="py-2" onClick={() => setNavOpen(false)}>About</Link>
            {/* <Link to="/cgpa-calculator" className="py-2" onClick={() => setNavOpen(false)}>CGPA Calculator</Link> */}
            <Link to="/past-questions" className="py-2" onClick={() => setNavOpen(false)}>Past Questions</Link>
            <Link to="/faqs" className="py-2" onClick={() => setNavOpen(false)}>FAQs</Link>
            <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setNavOpen(false)}>Sign Up</Link>
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setNavOpen(false)}>Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PublicNavBar;
