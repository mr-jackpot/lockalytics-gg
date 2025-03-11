"use client";
import React, { useEffect, useState } from "react";
import { SignInWithSteam } from "@/components/SignInWithSteam";

interface User {
  displayName: string;
  photos?: { value: string }[];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow">
        <div className="max-w-3xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="custom-font-header text-5xl text-gray-800">
            Lockalytics
          </h1>
          <nav>{/* Optional navigation items can go here */}</nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to Lockalytics
          </h2>
          <p className="text-gray-600 mb-6">
            Track your Deadlock stats and performance!
          </p>
          <SignInWithSteam />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white shadow">
        <div className="max-w-3xl mx-auto px-4 py-4 text-center text-gray-600">
          &copy; {new Date().getFullYear()} Lockalytics. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
