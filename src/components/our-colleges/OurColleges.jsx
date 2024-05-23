import React, { useEffect } from 'react';
import Aos from "aos";
import 'aos/dist/aos.css'; // Don't forget to import AOS CSS
import Sciences from '../../assets/COBAS.jpg'; // Adjust the path to your image
import Arts from '../../assets/COMAS.jpg';
import Law from '../../assets/COLAW.jpg';
import Humanities from '../../assets/COHUM.jpg';

export default function OurColleges() {
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <div>
            <div className="text-center p-10" data-aos="fade-up">
                <h2 className="font-bold text-4xl mb-4">Our <span className='text-yellow-400'>Esteemed</span> Colleges</h2>
                <h3 className="text-xl">These are the colleges available in Glorius Vision University</h3>
            </div>

            {/* Grid Section - Starts Here */}
            <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                {/* Product card 1 - Starts Here */}
                <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" data-aos="fade-up" data-aos-delay="100">
                    <a href="#">
                        <img src={Sciences} alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                        <div className="px-4 py-3 w-72">
                            <span className="text-gray-400 mr-3 uppercase text-xs">College OF</span>
                            <p className="text-lg font-black text-black truncate block capitalize">Basic & <br/>Applied Sciences</p>
                            <div className="flex items-center">
                                <p className="text-lg font-semibold text-black cursor-auto my-3">MPS, Chemical science, Biological Sciences.</p>
                                <div className="ml-auto">
                                    {/* Icons and links can also be animated but are kept static here */}
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Product card 2 - Starts Here */}
                <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" data-aos="fade-up" data-aos-delay="200">
                    <a href="#">
                        <img src={Arts} alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                        <div className="px-4 py-3 w-72">
                            <span className="text-gray-400 mr-3 uppercase text-xs">COLLEGE OF</span>
                            <p className="text-lg font-black text-black truncate block capitalize">Management &<br/> Social Sciences</p>
                            <div className="flex items-center">
                                <p className="text-lg font-semibold text-black cursor-auto my-3">Mass comm., public admin., business admin., economics, accounting.</p>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Product card 3 - Starts Here */}
                <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" data-aos="fade-up" data-aos-delay="300">
                    <a href="#">
                        <img src={Humanities} alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                        <div className="px-4 py-3 w-72">
                            <span className="text-gray-400 mr-3 uppercase text-xs">COLLEGE OF</span>
                            <p className="text-lg font-black text-black truncate block capitalize">Humanities</p>
                            <div className="flex items-center">
                                <p className="text-lg font-semibold text-black cursor-auto my-3">History, Languages, Philosophy, Religious study.</p>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Product card 4 - Starts Here */}
                <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" data-aos="fade-up" data-aos-delay="400">
                    <a href="#">
                        <img src={Law} alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                        <div className="px-4 py-3 w-72">
                            <span className="text-gray-400 mr-3 uppercase text-xs">COLLEGE OF</span>
                            <p className="text-lg font-black text-black truncate block capitalize">Law</p>
                            <div className="flex items-center">
                                <p className="text-lg font-semibold text-black cursor-auto my-3">Law</p>
                            </div>
                        </div>
                    </a>
                </div>
            </section>
        </div>
    );
}
