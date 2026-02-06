import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';

const TopBar = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 left-0 right-0 z-30 bg-surface/95 backdrop-blur-md border-b border-border px-6 py-6 flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center space-x-4">
                <button onClick={() => navigate('/profile')} className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-purple-400 p-[3px]">
                    <img
                        src="https://i.pinimg.com/736x/25/d7/5e/25d75ef265bfb76b2f2a5b32fe915b32.jpg"
                        alt="Profile"
                        className="w-full h-full rounded-full border-2 border-white object-cover"
                    />
                </button>
                <div>
                    <h2 className="text-xl font-bold text-text-main leading-none">
                        {(() => {
                            const hour = new Date().getHours();
                            if (hour >= 5 && hour < 12) return 'Good Morning,';
                            if (hour >= 12 && hour < 17) return 'Good Afternoon,';
                            if (hour >= 17 && hour < 22) return 'Good Evening,';
                            return 'Good Night,';
                        })()} Sriram!
                    </h2>
                    <p className="text-sm text-text-secondary mt-1">Product Manager | ID: EMP001</p>
                    <p className="text-xs text-text-muted mt-0.5">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                </div>
            </div>

        </div>
    );
};

export default TopBar;
