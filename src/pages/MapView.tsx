import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Navigation, Map as MapIcon, Layers, Search } from 'lucide-react';
import Button from '../components/ui/Button';

const MapView = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-border px-6 py-4 flex items-center space-x-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft size={24} className="text-text-main" />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-text-main leading-tight">Location View</h1>
                    <p className="text-xs text-text-muted">Office HQ, Chennai</p>
                </div>
            </div>

            {/* Map Area */}
            <div className="flex-1 relative bg-[#e5e7eb] overflow-hidden">
                {/* Stylized Map Grid/Background */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px), radial-gradient(#4f46e5 0.5px, #e5e7eb 0.5px)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 10px 10px'
                }}></div>

                {/* Simulated Map Features (Buildings/Parks) */}
                <div className="absolute top-[20%] left-[10%] w-40 h-60 bg-gray-300 rounded-lg shadow-inner"></div>
                <div className="absolute top-[40%] right-[15%] w-32 h-48 bg-gray-300 rounded-lg shadow-inner"></div>
                <div className="absolute bottom-[20%] left-[30%] w-64 h-32 bg-green-100/50 rounded-full blur-xl border border-green-200"></div>

                {/* Roads */}
                <div className="absolute top-[50%] left-0 w-full h-12 bg-gray-200 border-y border-gray-300"></div>
                <div className="absolute left-[50%] top-0 h-full w-12 bg-gray-200 border-x border-gray-300"></div>

                {/* Marker */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', delay: 0.5 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
                >

                    <div className="relative">
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 rounded-full blur-[2px]"></div>
                        <MapPin size={48} className="text-primary fill-primary/20" />
                    </div>
                </motion.div>

                {/* Map Controls */}
                <div className="absolute right-4 top-4 flex flex-col space-y-2">
                    <button className="p-3 bg-white rounded-xl shadow-lg text-text-secondary hover:text-primary transition-colors">
                        <Layers size={20} />
                    </button>
                    <button className="p-3 bg-white rounded-xl shadow-lg text-text-secondary hover:text-primary transition-colors">
                        <Search size={20} />
                    </button>
                </div>

                <div className="absolute right-4 bottom-[100px] flex flex-col space-y-2 text-primary">
                    <button className="p-3 bg-white rounded-xl shadow-lg border border-primary/10">
                        <Navigation size={24} className="fill-current" />
                    </button>
                </div>
            </div>


        </div>
    );
};

export default MapView;
