"use client";

import React from "react";

interface RatingDisplayProps {
  rating: number;
}

export const RatingDisplay = ({ rating }: RatingDisplayProps) => {
  let badgeClasses = "px-3 py-1 rounded-full text-sm ";
  if (rating < 0.8) {
    badgeClasses += "bg-red-900 text-white font-normal";
  } else if (rating < 1.0) {
    badgeClasses += "bg-red-300 text-red-900 font-normal";
  } else if (rating < 1.2) {
    badgeClasses += "bg-green-300 text-green-900 font-normal";
  } else {
    badgeClasses += "bg-green-700 text-white font-bold";
  }

  return (
    <div className="flex items-center">
      <span className={badgeClasses}>Rating: {rating.toFixed(2)}</span>
    </div>
  );
};
