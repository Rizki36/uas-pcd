"use client";

import Logo from "../../../public/logo.svg";
import { usePathname } from "next/navigation";

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
    <div className="bg-base-200 mb-3">
      <div className="mx-auto text-center my-2">
        <a
          href="https://devfitra.com"
          className="btn btn-ghost normal-case text-xl"
          target="_blank"
        >
          <img height={32} width="auto" className="h-8 w-auto" src={Logo.src} />
          DevFitra
        </a>
      </div>
      <ul className="menu menu-md w-full md:w-56">
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
    </div>
  );
};

export default Sidebar;
