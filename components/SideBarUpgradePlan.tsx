"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineShoppingCart } from "react-icons/ai";

const SideBarUpgradePlan = ({ toggle }: { toggle: boolean }) => {
  const [isShow, setIsShow] = useState(true);
  return (
    <>
      {isShow && (
        <motion.div
          initial={{
            opacity: toggle ? 0 : 1,
          }}
          animate={{
            opacity: toggle ? 0 : 1,
          }}
          transition={{ delay: toggle ? 0 : 0.3, duration: 1 }}
          className={`bg-gray-100 p-4 flex flex-col gap-y-4 ${
            toggle && "hidden"
          }`}
        >
          <AiOutlineShoppingCart size={18} />
          <div>
            <p className="mb-2 text-[#454547] font-medium">
              Unlock Unlimited Access
            </p>
            <p className="text-[#454547CC]">
              Free NFC with a yearly subscription
            </p>
          </div>
          <div className="flex justify-between items-center mr-4">
            <button
              onClick={() => setIsShow(false)}
              className="font-medium text-[#68686A]"
            >
              Dismiss
            </button>
            <button className="font-semibold text-[#8A2BE2]">
              Upgrade Plan
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SideBarUpgradePlan;
