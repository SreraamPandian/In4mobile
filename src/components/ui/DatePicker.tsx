import React, { useState, useRef, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, startOfWeek, endOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DatePickerProps {
    label: string;
    value: string;
    onChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date(value || new Date()));
    const containerRef = useRef<HTMLDivElement>(null);

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

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const goToToday = () => {
        const today = new Date();
        setCurrentMonth(today);
        onChange(format(today, 'yyyy-MM-dd'));
        setIsOpen(false);
    };
    const clearDate = () => {
        onChange('');
        setIsOpen(false);
    };

    const handleDayClick = (day: Date) => {
        onChange(format(day, 'yyyy-MM-dd'));
        setIsOpen(false);
    };

    const days = eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentMonth)),
        end: endOfWeek(endOfMonth(currentMonth))
    });

    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
        <div className="relative" ref={containerRef}>
            {/* Input Trigger */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-50 rounded-2xl p-4 transition-colors hover:bg-gray-100/80 group cursor-pointer"
            >
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 group-hover:text-gray-500 transition-colors pointer-events-none">
                    {label}
                </label>
                <div className="flex items-center justify-between pointer-events-none">
                    <span className="text-xl font-bold text-gray-900 font-sans tracking-tight">
                        {value ? format(new Date(value), 'MM/dd/yyyy') : 'Select Date'}
                    </span>
                    <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm transition-colors ${isOpen ? 'text-primary' : 'group-hover:text-primary'}`}>
                        <CalendarIcon size={18} />
                    </div>
                </div>
            </div>

            {/* Calendar Popover */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 p-4"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-bold text-gray-900">{format(currentMonth, 'MMMM yyyy')}</span>
                            <div className="flex items-center space-x-1">
                                <button onClick={(e) => { e.stopPropagation(); prevMonth(); }} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                    <ChevronLeft size={20} className="text-gray-500" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); nextMonth(); }} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                    <ChevronRight size={20} className="text-gray-500" />
                                </button>
                            </div>
                        </div>

                        {/* Week Days */}
                        <div className="grid grid-cols-7 mb-2">
                            {weekDays.map(day => (
                                <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-y-1">
                            {days.map((day, idx) => {
                                const isSelected = value && isSameDay(new Date(value), day);
                                const isCurrentMonth = isSameMonth(day, currentMonth);
                                const isTodayDate = isToday(day);

                                return (
                                    <button
                                        key={day.toString()}
                                        onClick={(e) => { e.stopPropagation(); handleDayClick(day); }}
                                        className={`
                                            h-8 w-8 mx-auto rounded-lg flex items-center justify-center text-sm transition-all
                                            ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                                            ${isSelected ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-200' : 'hover:bg-gray-100'}
                                            ${isTodayDate && !isSelected ? 'border border-blue-600 text-blue-600 font-medium' : ''}
                                        `}
                                    >
                                        {format(day, 'd')}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <button
                                onClick={(e) => { e.stopPropagation(); clearDate(); }}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                            >
                                Clear
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); goToToday(); }}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                            >
                                Today
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DatePicker;
