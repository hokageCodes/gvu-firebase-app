import React from "react";

function DepartmentCard({ name, description, imageUrl }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {name}
        </h3>
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
