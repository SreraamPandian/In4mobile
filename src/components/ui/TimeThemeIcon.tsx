import React from 'react';
import { motion } from 'framer-motion';

interface TimeThemeIconProps {
    hour: number;
}

const TimeThemeIcon: React.FC<TimeThemeIconProps> = ({ hour }) => {
    // Helper for 3D Sphere styling
    const Sphere = ({ color, shadow, children }: { color: string, shadow: string, children?: React.ReactNode }) => (
        <div
            className="w-10 h-10 rounded-full relative z-10"
            style={{
                background: color,
                boxShadow: shadow
            }}
        >
            {/* Specular Highlight for 3D effect */}
            <div className="absolute top-2 left-2 w-3 h-2 bg-white/60 rounded-[50%] blur-[1px] rotate-[-45deg]"></div>
            {children}
        </div>
    );

    // 6am - 12pm: Morning (Soft Orange Sun with gentle glow)
    if (hour >= 6 && hour < 12) {
        return (
            <div className="relative w-16 h-16 flex items-center justify-center">
                {/* Back Glow */}
                <div className="absolute inset-0 bg-orange-200/40 blur-xl rounded-full"></div>

                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Sphere
                        color="radial-gradient(circle at 30% 30%, #fdba74, #f97316)"
                        shadow="inset -2px -2px 6px rgba(194, 65, 12, 0.5), inset 2px 2px 6px rgba(255,255,255,0.7), 0 4px 10px rgba(251, 146, 60, 0.4)"
                    />
                </motion.div>
            </div>
        );
    }

    // 12pm - 5pm: Noon (Bright Golden Sun with Rays)
    if (hour >= 12 && hour < 17) {
        return (
            <div className="relative w-16 h-16 flex items-center justify-center">
                {/* Rotating Rays */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-3 bg-yellow-400 rounded-full"
                            style={{
                                transform: `rotate(${i * 45}deg) translateY(-22px)`,
                                boxShadow: '0 0 4px rgba(250, 204, 21, 0.6)'
                            }}
                        />
                    ))}
                </motion.div>

                <Sphere
                    color="radial-gradient(circle at 30% 30%, #fef08a, #eab308)"
                    shadow="inset -2px -2px 6px rgba(161, 98, 7, 0.3), inset 2px 2px 6px rgba(255,255,255,0.8), 0 0 15px rgba(250, 204, 21, 0.5)"
                />
            </div>
        );
    }

    // 5pm - 8pm: Evening (Golden Hour / Sunset)
    if (hour >= 17 && hour < 20) {
        return (
            <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 bg-rose-400/20 blur-xl rounded-full"></div>
                <Sphere
                    color="radial-gradient(circle at 30% 30%, #fcd34d, #f472b6, #7e22ce)"
                    shadow="inset -2px -2px 6px rgba(88, 28, 135, 0.4), inset 2px 2px 6px rgba(255,255,255,0.5), 0 4px 10px rgba(192, 38, 211, 0.4)"
                >
                    {/* Horizon Reflection Line */}
                    <div className="absolute bottom-2 w-full h-[1px] bg-white/30 blur-[0.5px]"></div>
                </Sphere>
            </div>
        );
    }

    // 8pm - 6am: Night (Moon sphere with craters)
    return (
        <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Stars */}
            <div className="absolute top-2 right-3 w-0.5 h-0.5 bg-white rounded-full animate-ping"></div>
            <div className="absolute bottom-3 left-2 w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse"></div>

            <motion.div
                animate={{ rotate: [-10, 0, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <div
                    className="w-10 h-10 rounded-full relative z-10 overflow-hidden"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, #e0e7ff, #6366f1, #312e81)',
                        boxShadow: 'inset -3px -3px 8px rgba(0,0,0,0.5), inset 2px 2px 6px rgba(255,255,255,0.4), 0 4px 12px rgba(79, 70, 229, 0.3)'
                    }}
                >
                    {/* Craters */}
                    <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-indigo-900/10 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"></div>
                    <div className="absolute bottom-2 left-3 w-1.5 h-1.5 rounded-full bg-indigo-900/10 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"></div>
                    <div className="absolute top-5 left-1 w-1 h-1 rounded-full bg-indigo-900/10 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default TimeThemeIcon;
