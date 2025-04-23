"use client";

import { useState } from "react";

const perks = [
  {
    emoji: "🎟️",
    title: "Free Day Pass",
    description: "One free visit per month to partner gyms",
  },
  {
    emoji: "☕",
    title: "Free Coffee or Snack",
    description: "Monthly treat from gym cafes or partners",
  },
  {
    emoji: "🧗",
    title: "Discounted Coaching",
    description: "Save up to 25% on private coaching sessions",
  },
  {
    emoji: "📚",
    title: "Course Discounts",
    description: "Reduced pricing on beginner, lead, and bouldering courses",
  },
  {
    emoji: "📊",
    title: "Advanced Stats",
    description: "Access to streaks, climb trends, and more",
  },
  {
    emoji: "🏅",
    title: "Custom Profile & Badge",
    description: "Stand out on the leaderboard and profile",
  },
  {
    emoji: "🚀",
    title: "Priority Access",
    description: "Try new features and join invite-only events first",
  },
];

export default function PerksPage() {
  const [isYearly, setIsYearly] = useState(false);
  const monthlyPrice = 4.99;
  const yearlyPrice = 49.99;
  const currentPrice = isYearly ? yearlyPrice : monthlyPrice;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-8 text-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-200/20 via-transparent to-transparent" />
        </div>
        <div className="relative">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Get Hangtime+
          </h1>
          <p className="mx-auto max-w-xl text-lg text-gray-600 mb-8">
            Climb more. Pay less. Unlock exclusive rewards.
          </p>

          {/* Pricing Section */}
          <div className="mx-auto max-w-lg">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
              {/* Monthly/Yearly Toggle */}
              <div className="inline-flex rounded-full bg-gray-100 p-1">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    !isYearly
                      ? "bg-white text-gray-900 shadow"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isYearly
                      ? "bg-white text-gray-900 shadow"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Yearly
                  {isYearly && (
                    <span className="ml-1.5 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                      Save 17%
                    </span>
                  )}
                </button>
              </div>

              {/* Price Display */}
              <div className="inline-flex items-baseline gap-1 bg-accent/5 px-6 py-3 rounded-full">
                <span className="text-4xl font-bold text-accent">
                  ${currentPrice}
                </span>
                <span className="text-lg text-gray-600">
                  per {isYearly ? "year" : "month"}
                </span>
              </div>

              {/* CTA Button */}
              <div className="space-y-2">
                <button className="inline-flex items-center justify-center px-4 py-2 text-sm rounded-md hover:bg-accent/90 transition-colors font-medium whitespace-nowrap bg-accent text-white">
                  Start 7-Day Free Trial
                </button>
                <p className="text-sm text-gray-600">
                  Cancel anytime. Instant access to all perks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks Grid */}
      <section className="px-4 pt-8">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk) => (
            <div
              key={perk.title}
              className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-md border border-gray-200 transition hover:shadow-lg"
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-pink-100 opacity-50 transition-transform group-hover:scale-150" />
              <div className="relative">
                <span className="mb-2 block text-3xl">{perk.emoji}</span>
                <h3 className="mb-2 text-lg font-semibold">{perk.title}</h3>
                <p className="text-sm text-gray-600">{perk.description}</p>
                <div className="mt-4">
                  <span className="inline-flex items-center rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800">
                    Included in Plus
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
