"use client"
import React, { useState, useEffect } from "react";
import { customerReviews } from "./testimonial";
import "./testimonial.css";

function AboutTestimonials() {
  const [review, setReview] = useState(0);
  const [currentReview, setCurrentReview] = useState(customerReviews[review]);

  useEffect(() => {
    setCurrentReview(customerReviews[review]);
    // Adding a fade-in effect
    const reviewContainer = document.querySelector('.rw-text-format');
    if (reviewContainer) {
      reviewContainer.style.opacity = 0;
      setTimeout(() => {
        reviewContainer.style.opacity = 1;
      }, 100); // brief delay to fade in
    }
  }, [review]);

  // Go to the previous review
  const backBtnClick = () => {
    setReview(review <= 0 ? customerReviews.length - 1 : review - 1);
  };

  // Go to the next review
  const frontBtnClick = () => {
    setReview(review >= customerReviews.length - 1 ? 0 : review + 1);
  };

  return (
    <div className="review-section" id="reviews">
      <div className="rw-text-content">
        <p className="rw-text-title">
          More over <span className="rw-text-num">1500+ Customers</span>
        </p>

        <p className="rw-text-desc">Don&#39;t believe us, Check clients word</p>

        <p className="rw-text-format">
          <span className="rw-text-quote1">&#39;&#39;</span>
          <span className="rw-review">{currentReview.message}</span>
          <span className="rw-text-quote2">&#39;&#39;</span>
        </p>

        <div className="rw-authors">
          <div className="rw-names">
            <p className="rw-reviewer-name">{currentReview.name}</p>
            <p className="rw-reviewer-place">{currentReview.location}</p>
          </div>

          <div className="rw-btns">
            <button className="rw-next-btn" type="button" onClick={backBtnClick}>
              ←
            </button>
            <button className="rw-next-btn" type="button" onClick={frontBtnClick}>
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutTestimonials;
