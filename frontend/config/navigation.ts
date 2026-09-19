export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Research", href: "/research" },
  { label: "Journey", href: "/journey" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];
