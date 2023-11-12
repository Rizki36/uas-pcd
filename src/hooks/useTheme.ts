import { useLocalStorage } from "usehooks-ts";

const useTheme = () => {
  const [value, setValue] = useLocalStorage<"dark" | "light">("theme", "dark");

  return {
    value,
    setValue,
  };
};

export default useTheme;
