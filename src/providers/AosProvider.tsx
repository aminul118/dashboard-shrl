import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export type Children = {
  children: React.ReactNode;
};

const AosProvider = ({ children }: Children) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return <div className="overflow-x-hidden">{children}</div>;
};

export default AosProvider;
