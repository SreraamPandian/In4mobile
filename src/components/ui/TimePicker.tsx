import React, { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimePickerProps {
    label: string;
    value: string; // HH:mm format (24h)
    onChange: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ label, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Parse value to 12h format for selection
    const parseTime = (val: string) => {
        if (!val) return { hour: '12', minute: '00', ampm: 'AM' };
        const [h, m] = val.split(':');
        let hour = parseInt(h);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12; // the hour '0' should be '12'
        return {
            hour: hour.toString().padStart(2, '0'),
            minute: m,
            ampm
        };
    };

    const [selection, setSelection] = useState(parseTime(value));

    useEffect(() => {
        setSelection(parseTime(value));
    }, [value]);

    useEffect(() => {
        // Convert selection back to 24h string for onChange
        let h = parseInt(selection.hour);
        if (selection.ampm === 'PM' && h !== 12) h += 12;
        if (selection.ampm === 'AM' && h === 12) h = 0;
        const timeString = `${h.toString().padStart(2, '0')}:${selection.minute}`;
        if (timeString !== value) {
            // Only fire if changed? No, we wait for confirm or auto-fire?
            // Let's fire immediately for responsiveness
            onChange(timeString);
        }
    }, [selection]); // This might cause loop if not careful, but value update resets selection. 
    // Actually, distinct separation is better. Let's just update on click.

    const updateSelection = (part: 'hour' | 'minute' | 'ampm', val: string) => {
        const newSel = { ...selection, [part]: val };
        setSelection(newSel);

        let h = parseInt(newSel.hour);
        if (newSel.ampm === 'PM' && h !== 12) h += 12;
        if (newSel.ampm === 'AM' && h === 12) h = 0;
        const timeString = `${h.toString().padStart(2, '0')}:${newSel.minute}`;
        onChange(timeString);
    };


    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')); // 5 min steps? User might want precise. Let's do 5 min steps for better UX or full?
    // Let's do 5 min steps for cleaner UI, standard for attendance often. 
    // Actually standard picker allows any. Let's stick to 5 for now, or 1? 
    // 60 items is a long scroll. Let's do 00, 05, ... 55.
    const minutesStep = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

    return (
        <div className="relative" ref={containerRef}>
            {/* Input Trigger */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-50 rounded-2xl p-4 transition-colors hover:bg-gray-100/80 group cursor-pointer flex items-center justify-between"
            >
                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 group-hover:text-gray-500 transition-colors pointer-events-none">
                        {label}
                    </label>
                    <span className="text-xl font-bold text-gray-900 font-sans tracking-tight">
                        {value ? `${selection.hour}:${selection.minute} ${selection.ampm}` : '-- : -- --'}
                    </span>
                </div>
                <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm transition-colors ${isOpen ? 'text-primary' : 'group-hover:text-primary'}`}>
                    <Clock size={18} />
                </div>
            </div>

            {/* Time Picker Popover */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 p-4"
                    >
                        <div className="flex justify-center space-x-2 h-40">
                            {/* Hours */}
                            <div className="flex flex-col overflow-y-auto no-scrollbar w-16 text-center space-y-1 snap-y snap-mandatory bg-gray-50 rounded-lg py-2">
                                {hours.map(h => (
                                    <button
                                        key={h}
                                        onClick={(e) => { e.preventDefault(); updateSelection('hour', h); }}
                                        className={`snap-center py-1 text-sm font-bold flex-shrink-0 transition-colors ${selection.hour === h ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        {h}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col justify-center font-bold text-gray-300">:</div>

                            {/* Minutes */}
                            <div className="flex flex-col overflow-y-auto no-scrollbar w-16 text-center space-y-1 snap-y snap-mandatory bg-gray-50 rounded-lg py-2">
                                {minutesStep.map(m => (
                                    <button
                                        key={m}
                                        onClick={(e) => { e.preventDefault(); updateSelection('minute', m); }}
                                        className={`snap-center py-1 text-sm font-bold flex-shrink-0 transition-colors ${selection.minute === m ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>

                            {/* AM/PM */}
                            <div className="flex flex-col justify-center space-y-2 ml-2">
                                <button
                                    onClick={(e) => { e.preventDefault(); updateSelection('ampm', 'AM'); }}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${selection.ampm === 'AM' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}
                                >
                                    AM
                                </button>
                                <button
                                    onClick={(e) => { e.preventDefault(); updateSelection('ampm', 'PM'); }}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${selection.ampm === 'PM' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}
                                >
                                    PM
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hidden Input for Form Submission if needed */}
            <input type="hidden" name={label} value={value} />
        </div>
    );
};

export default TimePicker;
