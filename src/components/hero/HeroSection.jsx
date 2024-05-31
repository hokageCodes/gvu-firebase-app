import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Aos from "aos";
import 'aos/dist/aos.css';
import backgroundImg from '../../assets/he-ro.jpg';

export default function HeroSection() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    const handleGetStarted = () => {
        if (currentUser) {
            navigate('/past-questions');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="relative">
            {/* For mobile */}
            <div className="md:hidden">
                <div className="bg-white p-6 rounded-lg max-w-md md:max-w-lg lg:max-w-2xl">
                    <div className="flex flex-col gap-4" data-aos="fade-right">
                        <h1 className="uppercase font-bold text-2xl md:text-4xl">
                            Your Quest <span className="text-slate-900"> For </span>
                        </h1>
                        <h2 className="uppercase font-bold text-2xl md:text-4xl text-slate-900" data-aos-delay="100">
                            <span className="text-yellow-400">knowledge </span>Brought You <span className="text-yellow-400">Here</span> 
                        </h2>
                        <p className="font-semibold text-lg md:text-xl text-slate-700" data-aos="fade-up" data-aos-delay="200">
                            Glorious Vision University, Ogwa, Edo State.
                        </p>
                        <p className="text-sm md:text-base text-slate-700" data-aos="fade-up" data-aos-delay="300">
                            Your Gateway to success, Access a wealth of past questions on our platform. Elevate your preparation with proven exam insights, topic guidance, and time management practice. Empowering students to excel in exams and embrace a brighter academic future.
                        </p>
                        <button
                            onClick={handleGetStarted}
                            className="bg-slate-900 hover:bg-slate-700 text-white rounded py-2 px-4 text-sm md:text-lg font-semibold"
                        >
                            Get started
                        </button>
                    </div>
                </div>
                <div className="mt-4 flex justify-center">
                    <img src={backgroundImg} alt="hero image" className="max-w-full h-auto" />
                </div>
            </div>

            {/* For desktop */}
            <div className="hidden md:block bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImg})`, height: '100vh', paddingTop: '200px' }}>
                <div className="bg-white p-6 rounded-lg max-w-md md:max-w-lg lg:max-w-2xl" style={{ backdropFilter: 'blur(10px)' }}>
                    <div className="flex flex-col gap-4 md:gap-6" data-aos="fade-right">
                        <h1 className="uppercase font-bold text-2xl md:text-4xl">
                            Your Quest <span className="text-slate-900"> For </span>
                        </h1>
                        <h2 className="uppercase font-bold text-slate-900 text-2xl md:text-4xl" data-aos-delay="100">
                            <span className="text-yellow-400">knowledge </span>Brought You <span className="text-yellow-400">Here</span> 
                        </h2>
                        <p className="font-semibold text-lg md:text-xl text-slate-700" data-aos="fade-up" data-aos-delay="200">
                            Glorious Vision University, Ogwa, Edo State.
                        </p>
                        <p className="text-sm md:text-base text-slate-700" data-aos="fade-up" data-aos-delay="300">
                            Your Gateway to success, Access a wealth of past questions on our platform. Elevate your preparation with proven exam insights, topic guidance, and time management practice. Empowering students to excel in exams and embrace a brighter academic future.
                        </p>
                        <button
                            onClick={handleGetStarted}
                            className="bg-slate-900 w-36 hover:bg-slate-700 text-white rounded py-2 px-4 text-sm md:text-lg font-semibold"
                        >
                            Get started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
