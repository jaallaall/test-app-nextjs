import { useState } from "react";

export function useModal() {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  // const [open, setOpen] = useState<boolean>(false);
  const [itemId, setItemId] = useState<number[]>([]);

  const handleClickOpen = (id: number) => {
    const arr = [];
    arr.push(id);
    setItemId(arr);
    toggle();
  };

  const toggle = (): void => {
    setIsShowing(!isShowing);
  };

  return {
    isShowing,
    toggle,
    handleClickOpen,
    itemId,
  };
}
