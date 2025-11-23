import Link from "next/link";
import Image from "next/image";
import logo from "@/public/icon-512.png";

type AppLogoProps = {
  href?: string;
  className?: string;
  size?: number;
  variant?: "gradient" | "solid" | "soft" | "neon";
};

export default function AppLogo({
  href = "/",
  className = "",
  size = 32,
  variant = "gradient",
}: AppLogoProps) {
  let titleClass = "notemorph-title notemorph-title--gradient-lg";

  if (variant === "solid") {
    titleClass = "notemorph-title notemorph-title--solid";
  } else if (variant === "soft") {
    titleClass = "notemorph-title notemorph-title--soft-uppercase";
  } else if (variant === "neon") {
    titleClass = "notemorph-title notemorph-title--neon";
  }

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 select-none ${className}`}
    >
      <Image
        src={logo}
        alt="NoteMorph logo"
        width={size}
        height={size}
        className="rounded-md"
      />
      <span className={titleClass}>NoteMorph</span>
    </Link>
  );
}
