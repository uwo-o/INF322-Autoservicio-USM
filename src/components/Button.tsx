import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

function Button({
  onClick,
  children,
  disabled = false,
  className = '',
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-usm-blue text-white px-4 py-2 rounded transition
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export { Button };
