import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { UserProfile } from "@/utils/userProfile";

const AVATAR_OPTIONS = ["🧗", "🧗‍♂️", "🧗‍♀️", "🏔️", "⛰️", "🌄", "🎯", "💪", "🏆"];

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (updates: Partial<UserProfile>) => void;
  gyms?: Array<{ id: string; name: string; location: string }>;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  profile,
  onSave,
  gyms = [],
}: EditProfileModalProps) {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar);
  const [selectedGymId, setSelectedGymId] = useState(profile.homeGymId);

  useEffect(() => {
    if (isOpen) {
      setDisplayName(profile.displayName);
      setSelectedAvatar(profile.avatar);
      setSelectedGymId(profile.homeGymId);
    }
  }, [isOpen, profile]);

  const handleSave = () => {
    onSave({
      displayName,
      avatar: selectedAvatar,
      homeGymId: selectedGymId,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="Enter your display name"
            />
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choose Avatar
            </label>
            <div className="grid grid-cols-5 gap-2">
              {AVATAR_OPTIONS.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`text-2xl p-2 rounded-lg ${
                    selectedAvatar === avatar
                      ? "bg-accent/10 ring-2 ring-accent"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          {/* Home Gym Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Home Gym
            </label>
            <select
              value={selectedGymId || ""}
              onChange={(e) => setSelectedGymId(e.target.value || null)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
            >
              <option value="">Select a home gym</option>
              {gyms.map((gym) => (
                <option key={gym.id} value={gym.id}>
                  {gym.name} - {gym.location}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent/90 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
