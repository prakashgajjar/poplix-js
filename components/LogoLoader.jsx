"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const letters = "Poplix".split("");

const LogoLoader = () => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timeout = setTimeout(() => setShow(false), 1800); // Show for 1.8s
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black z-[9999] flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          <div className="text-[4rem] md:text-[6rem] font-extrabold text-white flex space-x-2 tracking-wide">
            {letters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ color: "#ffffff" }}
                animate={{
                  color: [
                    "#ffffff",
                    "#ffffff",
                    "#facc15", // yellow-400
                    "#ffffff",
                    "#ffffff",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoLoader;
