"use client";

import { Toaster, toast, resolveValue } from "react-hot-toast";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import clsx from "clsx";

const CustomToast = ({ t, visible }: { t: any; visible: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -10 }}
            exit={{ opacity: 0, y: -10 }}
            className={clsx(
                "flex items-center gap-3 p-4 rounded-xl shadow-lg border w-[300px]",
                t.type === "success" ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500"
            )}
        >
            {t.type === "success" ? (
                <CheckCircle className="text-green-600" size={24} />
            ) : (
                <AlertCircle className="text-red-600" size={24} />
            )}
            <span className="text-gray-800 text-sm">{resolveValue(t.message, t)}</span>
            <button onClick={() => toast.dismiss(t.id)} className="ml-auto">
                <X size={18} className="text-gray-500 hover:text-gray-700" />
            </button>
        </motion.div>
    );
};

const Toasted = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 3000,
            }}
        >
            {(t) => <CustomToast t={t} visible={t.visible} />}
        </Toaster>
    );
};

export const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
        toast.success(message);
    } else {
        toast.error(message);
    }
};


export default Toasted;
