"use client";

import Link from "next/link";
import React from "react";

export const SignInWithSteam = () => {
  return (
    <Link href="/api/auth/steam">
      <p className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200">
        {/* Replace this SVG with the official Steam logo if available */}
        <svg
          className="w-6 h-6 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path d="M496 256c0 136.967-111.033 248-248 248S0 392.967 0 256 111.033 8 248 8s248 111.033 248 248zm-248 128c70.692 0 128-57.308 128-128s-57.308-128-128-128-128 57.308-128 128 57.308 128 128 128z" />
        </svg>
        Sign in with Steam
      </p>
    </Link>
  );
};
