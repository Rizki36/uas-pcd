"use client";
import useTheme from "@/hooks/useTheme";
import dynamic from "next/dynamic";
import { FC } from "react";

const ThemeWrapper: FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { value: theme } = useTheme();

  return (
    <div data-theme={theme} className={className}>
      {children}
    </div>
  );
};

export default dynamic(() => Promise.resolve(ThemeWrapper), {
  ssr: false,
});
