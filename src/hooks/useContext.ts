import { ColorModeContext } from "context";
import { useContext } from "react";

export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a Provider");
  }
  return context;
}
