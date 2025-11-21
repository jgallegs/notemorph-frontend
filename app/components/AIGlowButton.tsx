"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface AIGlowButtonProps {
  href: string;
  children: ReactNode;
}

export default function AiGlowButton({ href, children }: AIGlowButtonProps) {
  return (
    <Link href={href} className="ai-glow-wrapper">
      <span className="ai-glow-inner text-sm md:text-base font-medium">
        {children}
      </span>
    </Link>
  );
}
