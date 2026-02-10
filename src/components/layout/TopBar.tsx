import { useNavigate } from 'react-router-dom';
import logo from '../../assets/iproat_logo.png';

const TopBar = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 left-0 right-0 z-30 bg-surface/95 backdrop-blur-md border-b border-border px-6 py-5 max-w-md mx-auto h-[115px]">
            <div className="flex w-full h-full items-center">
                {/* Left Side: Contents (More space to reduce congestion) */}
                <div className="flex-[1.5] flex items-center space-x-4 min-w-0">
                    <button onClick={() => navigate('/profile')} className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-purple-400 p-[3px] shrink-0 shadow-md transition-transform active:scale-95">
                        <img
                            src="https://i.pinimg.com/736x/25/d7/5e/25d75ef265bfb76b2f2a5b32fe915b32.jpg"
                            alt="Profile"
                            className="w-full h-full rounded-full border-2 border-white object-cover"
                        />
                    </button>
                    <div className="min-w-0 flex flex-col justify-center">
                        <p className="text-[10px] font-bold text-text-secondary leading-none uppercase tracking-[0.1em]">
                            {(() => {
                                const hour = new Date().getHours();
                                if (hour >= 5 && hour < 12) return 'Good Morning';
                                if (hour >= 12 && hour < 17) return 'Good Afternoon';
                                if (hour >= 17 && hour < 22) return 'Good Evening';
                                return 'Good Night';
                            })()}
                        </p>
                        <h2 className="text-[18px] font-bold text-text-main leading-tight mt-1 whitespace-nowrap">
                            Sriram!
                        </h2>
                        <div className="flex flex-col mt-1.5 space-y-0.5">
                            <p className="text-[12px] text-text-secondary font-semibold whitespace-nowrap opacity-80 leading-tight">Product Manager</p>
                            <p className="text-[12px] text-text-secondary font-semibold whitespace-nowrap opacity-80 leading-tight">ID: EMP001</p>
                            <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1 leading-none">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                        </div>
                    </div>
                </div>

                {/* Right Half: Only Logo */}
                <div className="flex-1 flex justify-end items-center">
                    <div className="bg-white/50 p-2 rounded-2xl backdrop-blur-sm border border-white/20">
                        <img src={logo} alt="IPROAT" className="h-10 w-auto object-contain" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
