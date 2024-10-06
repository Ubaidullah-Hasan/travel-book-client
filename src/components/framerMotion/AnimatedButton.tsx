"use client"
import { motion } from "framer-motion";
import { TChildren } from "@/src/types";

const AnimatedButton = ({ children }: TChildren) => {
    return (
        <motion.div
            className="box cursor-pointer"
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedButton;