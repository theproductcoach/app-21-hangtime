"use client";

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  icon?: string;
}

export default function FilterChip({
  label,
  isSelected,
  onClick,
  icon,
}: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
        transition-all duration-200 hover:scale-105
        ${
          isSelected
            ? "bg-accent text-white"
            : "bg-background-soft border border-accent/20 text-text-dark hover:border-accent/50"
        }
      `}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
}
