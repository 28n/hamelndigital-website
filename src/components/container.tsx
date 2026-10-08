import type { ReactNode } from "react";

export function Container({
  children,
  size = "default",
  className = "",
}: {
  children: ReactNode;
  size?: "default" | "narrow";
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full px-6 md:px-10 ${
        size === "narrow" ? "max-w-3xl" : "max-w-6xl"
      } ${className}`}
    >
      {children}
    </div>
  );
}
