"use client";

import { useEffect, useState } from "react";

/** `true`, если устройство без fine pointer / без hover (сенсор в приоритете). */
export function useTouchPrimary() {
  const [touchPrimary, setTouchPrimary] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const sync = () => setTouchPrimary(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return touchPrimary;
}
