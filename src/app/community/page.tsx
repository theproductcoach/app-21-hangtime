"use client";

import { useState } from "react";

export default function Community() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("posts")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            activeTab === "posts"
              ? "bg-primary text-white"
              : "bg-white text-text-muted hover:text-text-dark"
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab("meetups")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            activeTab === "meetups"
              ? "bg-primary text-white"
              : "bg-white text-text-muted hover:text-text-dark"
          }`}
        >
          Meetups
        </button>
      </div>

      {activeTab === "posts" ? (
        <div className="space-y-4">
          {[1, 2, 3].map((post) => (
            <div key={post} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="ml-3">
                  <p className="font-medium text-text-dark">Alex Climber</p>
                  <p className="text-sm text-text-muted">2 hours ago</p>
                </div>
              </div>
              <p className="text-text-dark mb-3">
                Just sent my first V6! 🎉 Anyone want to join for a session this
                weekend?
              </p>
              <div className="flex items-center text-sm text-text-muted">
                <button className="flex items-center space-x-1 hover:text-accent">
                  <span>❤️</span>
                  <span>{post * 5}</span>
                </button>
                <span className="mx-2">•</span>
                <button className="flex items-center space-x-1 hover:text-primary">
                  <span>💬</span>
                  <span>{post * 2}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {[1, 2, 3].map((meetup) => (
            <div key={meetup} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-text-dark">
                  Weekend Bouldering Session
                </h3>
                <span className="text-sm text-accent">2 spots left</span>
              </div>
              <p className="text-text-muted text-sm mb-3">
                Saturday, March {meetup + 15}th • 2:00 PM
              </p>
              <p className="text-text-dark mb-4">
                Looking for climbing partners for a fun bouldering session! All
                levels welcome.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((avatar) => (
                    <div
                      key={avatar}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"
                    />
                  ))}
                </div>
                <button className="px-4 py-2 bg-accent text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
