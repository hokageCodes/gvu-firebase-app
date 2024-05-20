"use client"
import React, { useState, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function FaqSection() {
  // State to manage which accordion item is open
  const [open, setOpen] = useState(null);

  // Function to toggle accordion items
  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });  // Initializes and sets duration of animations
  }, []);

  const faqs = [
    { question: "When was GVU PQS Created?", answer: "GVU PQS was created in 2023." },
    { question: "Who is the founder of GVU PQS?", answer: "GVU PQS was founded by Jeffery Ken Ogida (400lvl)." },
    { question: "Why was GVU PQS created?", answer: "GVU PQS was created to help students of Glorious Vision University access past questions easily." },
    { question: "How fast do we reply to messages?", answer: "Our teams are always on ground to assist you, so we reply in less than 1 hour." },
    { question: "What if I don't see the question I want?", answer: "Click on the contact section and send us detailed information about the past question you need." },
    { question: "Can I download images?", answer: "All images (past questions) are downloadable to help you study while you are offline." }
  ];

  return (
    <section id='faqs' className="mt-24 flex justify-center">
      <div className="w-full max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold text-center" data-aos="fade-up">Frequently asked questions</h2>

        <div id="accordionFlushExample">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-none border border-t-0 border-l-0 border-r-0 border-neutral-200">
              <h2 className="mb-0">
                <button
                  className="group relative flex w-full items-center rounded-none border-0 py-4 px-5 text-left text-base font-bold transition hover:z-[2] focus:z-[3] focus:outline-none"
                  type="button" onClick={() => toggle(index)}
                  aria-expanded={open === index ? "true" : "false"}
                  aria-controls={`flush-collapse${index}`}>
                  {faq.question}
                  <span
                    className={`ml-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out ${open === index ? "rotate-0" : "rotate-[-180deg]"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                      <path fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1 -.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </span>
                </button>
              </h2>
              <div id={`flush-collapse${index}`} className={`border-0 ${open === index ? "block" : "hidden"}`}
                aria-labelledby={`flush-heading${index}`}>
                <div className="py-4 px-5 text-neutral-500">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
