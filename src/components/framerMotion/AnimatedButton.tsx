"use client"
import { motion } from "framer-motion";
import { IChildren } from "@/src/types";

interface IProps extends IChildren{
    scaleValue?: number;
}

const AnimatedButton = ({ children, scaleValue = 1.1 }: IProps) => {
    return (
        <motion.div
            className="box cursor-pointer"
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            whileHover={{ scale: scaleValue }}
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedButton;