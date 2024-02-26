// Bookmark.js
import React from "react";

const Bookmark = ({ name, link }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-2">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          <a href={link} target="_blank" rel="noopener noreferrer">
            Visit Link
          </a>
        </p>
      </div>
    </div>
  );
};

export default Bookmark;
