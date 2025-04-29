"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  pendingText,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  pendingText: string;
  className?: string;
  [key: string]: any;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      disabled={pending}
      className={`${className} ${
        pending ? "opacity-70 cursor-not-allowed" : ""
      }`}
      aria-disabled={pending}
    >
      {pending ? pendingText : children}
    </button>
  );
}
