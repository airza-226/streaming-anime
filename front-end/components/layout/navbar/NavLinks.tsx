"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/anime", label: "Anime" },
  { href: "/genre", label: "Genre" },
  { href: "/schedule", label: "Jadwal" },
];

type NavLinksProps = {
  onLinkClick?: () => void;
};

export function NavLinks({ onLinkClick }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-1">
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onLinkClick}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-foreground/10 hover:text-foreground",
                isActive && "bg-foreground/10 text-foreground",
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
