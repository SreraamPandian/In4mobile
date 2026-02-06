import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sunrise, Sunset } from 'lucide-react';

interface TimeThemeIconProps {
    hour: number;
}

const TimeThemeIcon: React.FC<TimeThemeIconProps> = ({ hour }) => {
    // 6am - 12pm: Sunrise
    if (hour >= 6 && hour < 12) {
        return (
            <div className="relative group p-2">
                <div className="absolute inset-0 bg-orange-100/50 blur-xl rounded-full scale-110"></div>
                <motion.div
                    animate={{ y: [2, -2, 2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative text-orange-500"
                >
                    <Sunrise size={32} strokeWidth={2} />
                </motion.div>
            </div>
        );
    }

    // 12pm - 5pm: Day (Sun)
    if (hour >= 12 && hour < 17) {
        return (
            <div className="relative group p-2">
                <div className="absolute inset-0 bg-yellow-100/50 blur-xl rounded-full scale-125"></div>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="relative text-yellow-500"
                >
                    <Sun size={32} strokeWidth={2} fill="rgba(234, 179, 8, 0.2)" />
                </motion.div>
            </div>
        );
    }

    // 5pm - 8pm: Sunset
    if (hour >= 17 && hour < 20) {
        return (
            <div className="relative group p-2">
                <div className="absolute inset-0 bg-red-100/50 blur-xl rounded-full scale-110"></div>
                <motion.div
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative text-orange-600"
                >
                    <Sunset size={32} strokeWidth={2} />
                </motion.div>
            </div>
        );
    }

    // 8pm - 6am: Night (Moon)
    return (
        <div className="relative group p-2">
            <div className="absolute inset-0 bg-indigo-100/50 blur-xl rounded-full scale-110"></div>
            <motion.div
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative text-indigo-500"
            >
                <Moon size={30} strokeWidth={2} fill="rgba(99, 102, 241, 0.2)" />
            </motion.div>
        </div>
    );
};

export default TimeThemeIcon;
