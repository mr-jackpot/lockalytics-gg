"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MostRecentMatchCard from "../../components/MostRecentMatchCard";

interface User {
  displayName: string;
  photos?: { value: string }[];
  _json: { steamid: string };
}

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch session data with credentials
    fetch("/api/auth/session", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          router.push("/");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Session fetch error:", err);
        router.push("/");
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow">
        <div className="max-w-3xl mx-auto px-4 py-6 flex justify-between">
          <h1 className="custom-font-header text-5xl text-gray-800">
            Lockalytics
          </h1>
          <a
            href="/api/auth/logout"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Logout
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-3xl mx-auto p-4">
        {user ? (
          <>
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <div className="flex items-center space-x-4">
                {user.photos && user.photos[0] && (
                  <img
                    src={user.photos[0].value}
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full"
                  />
                )}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {user.displayName}
                  </h2>
                  <p className="text-gray-500">Welcome to your profile page!</p>
                </div>
              </div>
            </div>

            {/* Most Recent Match Card */}
            <div className="mt-8">
              <MostRecentMatchCard steamId64={user.id} />
            </div>
          </>
        ) : (
          <div>Redirecting...</div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-white shadow mt-6">
        <div className="max-w-3xl mx-auto px-4 py-4 text-center text-gray-600">
          &copy; {new Date().getFullYear()} Lockalytics. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
