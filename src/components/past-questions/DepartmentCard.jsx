// DepartmentCard.js
import React from "react";
import { FaGraduationCap } from "react-icons/fa";

function DepartmentCard({ name, description, imageUrl, isCollege }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {isCollege ? (
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      ) : (
        <FaGraduationCap className="text-blue-500 text-6xl mx-auto mt-6" />
      )}
      <div className="p-6">
        <div className="flex items-center mb-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {description}
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          See more
        </button>
      </div>
    </div>
  );
}

export default DepartmentCard;
