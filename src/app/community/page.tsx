"use client";

import { UsersIcon } from "@heroicons/react/24/outline";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">
            Coming Soon
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            The community features are under development.
          </p>
        </div>
      </div>
    </div>
  );
}
