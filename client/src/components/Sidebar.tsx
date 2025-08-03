import { ArrowUpRight, Github, Home, LinkIcon, LogOut, Search, Twitter, X, Youtube, Menu } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isMobileMenuOpen: boolean; // Added prop
    setIsMobileMenuOpen: (isOpen: boolean) => void; // Added prop
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const tabs = [
        { id: "all", name: "All Content", icon: <Home className="w-5 h-5" /> },
        { id: "search", name: "Search", icon: <Search className="h-5 w-5" /> },
        { id: "youtube", name: "YouTube", icon: <Youtube className="w-5 h-5" /> },
        { id: "twitter", name: "Twitter", icon: <Twitter className="w-5 h-5" /> },
        { id: "url", name: "URLs", icon: <LinkIcon className="w-5 h-5" /> }
    ];

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // This function now just sets the state passed from the parent (Dashboard)
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    return (
        <>
            {/* REMOVED: The fixed mobile menu button is no longer here.
                        It is now located in Dashboard.tsx to allow for better layout control
                        with the main content header.
            */}

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-[#3B73ED] lg:pt-6 lg:shadow-lg lg:shadow-black/20 rounded-r-xl border-r-4 border-black">
                <div className="flex items-center justify-center px-6">
                    <h1 className="font-gold ml-2 text-xl font-bold text-white">SecondBrain</h1>
                </div>

                <nav className="mt-8 flex-1 flex flex-col overflow-y-auto px-4 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                                activeTab === tab.id
                                    ? "bg-white text-black"
                                    : "text-white/80 hover:bg-blue-400 hover:text-white"
                            }`}
                        >
                            {tab.icon}
                            <span className="ml-3">{tab.name}</span>
                        </button>
                    ))}
                </nav>

                <div className="px-4 mt-6 mb-6">
                    <button
                        onClick={() => window.open("https://github.com", '_blank')}
                        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-xl text-white hover:bg-green-500 transition-colors mb-2"
                    >
                        <div className="flex items-center">
                            <Github className="w-5 h-5" />
                            <span className="ml-3">Open Github</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 opacity-70" />
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl text-white hover:bg-red-500 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="ml-3">Log Out</span> {/* Added missing text for logout */}
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                // Overlay to close sidebar when clicking outside
                <div className="fixed inset-0 z-50 bg-black/50" onClick={toggleMobileMenu}>
                    <div
                        // Actual sidebar content
                        className={`absolute inset-y-0 left-0 w-64 bg-white p-6 transform transition-transform duration-500 ease-in-out flex flex-col justify-between
                            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
                        `}
                        onClick={(e) => e.stopPropagation()} // Prevent clicks inside sidebar from closing it
                    >
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold text-[#3b73ed] font-gold">SecondBrain</h1>
                            <button className="text-gray-500 hover:text-gray-700 p-2 rounded-md" onClick={toggleMobileMenu} aria-label="Close mobile menu">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <nav className="mt-8 space-y-2 flex-grow"> {/* Use flex-grow to push content below */}
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setIsMobileMenuOpen(false); // Close menu when a tab is selected
                                    }}
                                    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                                        activeTab === tab.id ? "bg-blue-100 text-[#3b73ed]" : "text-black/80 hover:bg-blue-50"
                                    }`}
                                >
                                    {tab.icon}
                                    <span className="ml-3"> {tab.name}</span>
                                </button>
                            ))}
                        </nav>

                        {/* Push Github/Logout to bottom */}
                        <div className="mt-auto py-4">
                            <button className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-md text-gray-800 hover:bg-green-100 transition-colors"
                                onClick={() => {
                                    window.open("https://github.com", "_blank");
                                    setIsMobileMenuOpen(false); // Close menu
                                }}
                            >
                                <div className="flex items-center">
                                    <Github className="w-5 h-5" />
                                    <span className="ml-3"> Open Github</span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 opacity-70" />
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full mt-2 px-4 py-3 text-sm font-medium rounded-md text-red-500 hover:bg-red-100 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="ml-3">Log Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;