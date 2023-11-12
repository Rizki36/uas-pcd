"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const ToggleTheme = dynamic(() => import("@/app/Components/ToggleTheme"), {
  ssr: false,
});

const menuItems: {
  label: string;
  href: string;
}[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/to-negative",
    label: "To Negative",
  },
  {
    href: "/addition",
    label: "Addition",
  },
  {
    href: "/subtraction",
    label: "Subtraction",
  },
  {
    href: "/multiplication",
    label: "Multiplication",
  },
  {
    href: "/division",
    label: "Division",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-base-200 flex flex-col">
      <div className="mx-auto text-center my-2">
        <a
          href="https://devfitra.com"
          className="btn btn-ghost normal-case text-xl flex-col"
          target="_blank"
        >
          <Logo height={32} width={32} className="shrink-0 block" />
          <span className="shrink-0">DevFitra</span>
        </a>
      </div>
      <ul className="menu menu-md w-full md:w-56 flex-1">
        {menuItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              className={`menu-item ${pathname === item.href ? "active" : ""}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="md:flex hidden mb-4 items-center justify-center">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Sidebar;
