import { useState } from "react";

export const usePortal = () => {
  const [isOpen, setOpen] = useState(false);

  const openPortal = () => setOpen(true);
  const closePortal = () => setOpen(false);

  return { isOpen, openPortal, closePortal };
};
