import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Loader2, Menu, Plus, Search, Share, X } from "lucide-react";
import ContentCard from "../components/ContentCard";
import AddContentModal from "../components/AddContentModal";
import ShareBrainModal from "../components/SharedBrainModal";

interface Content {
    _id: string;
    title: string;
    link: string;
    type: string;
    description: string;
    userId: string;
    tags: string[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const fetchContents = async (activeTab: string, searchQuery: string): Promise<Content[]> => {
    const params: Record<string, string> = {};
    const token = localStorage.getItem("authorization");
    console.log(token);
    if (!token) {
        throw new Error("No auth token found");
    }

    if (activeTab !== "all" && activeTab !== "search") {
        params.type = activeTab;
    }

    if (activeTab === "search" && searchQuery) {
        params.search = searchQuery;
    }

    try {
        const response = await axios.get("http://localhost:3000/api/v1/content", {
            params,
            headers: {
                'authorization': token,
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            },
        });
        return response.data.content as Content[];
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.response?.data?.message || "Failed to fetch content");
        } else if (err instanceof Error) {
            throw new Error(err.message || "An unknown error occurred.");
        } else {
            throw new Error("An unexpected error occurred during content fetch.");
        }
    }
};

function Dashboard() {
    const [activeTab, setActiveTab] = useState("all");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isShareModalOpen, setSharedModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to control mobile sidebar visibility

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const handleStorage = () => {
            if (!localStorage.getItem("authorization")) {
                navigate("/");
                console.log("User logged out successfully");
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, [navigate]);

    const queryClient = useQueryClient();

    const { data: contents, isLoading, error } = useQuery<Content[], Error>({ // Added type arguments for clarity
        queryKey: ['contents', activeTab, searchQuery],
        queryFn: () => fetchContents(activeTab, searchQuery),
    });

    const deleteContent = async (id: string): Promise<void> => {
        const token = localStorage.getItem("authorization");
        if (!token) {
            throw new Error("No auth token found");
        }

        await axios.delete("http://localhost:3000/api/v1/content", {
            headers: {
                'authorization': token,
            },
            data: { Id: id },
        });

        queryClient.invalidateQueries({ queryKey: ['contents'] });
    };

    const getFilteredContents = () => {
        const currentContents = contents || [];
        if (activeTab === "search") {
            return currentContents?.filter((content) =>
                content.title.toLowerCase().includes(searchQuery.toLowerCase()) || content.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            ) || [];
        } else if (activeTab === 'all') {
            return currentContents || [];
        } else {
            return currentContents?.filter((content) => content.type === activeTab) || [];
        }
    };

    const filteredContents = getFilteredContents();

    return (
        <div className="min-h-screen bg-[#F6F7EE] font-inter">
            {/* Pass mobile menu state and setter to Sidebar */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <div className="lg:pl-64">
                <div className="min-h-screen sm:mx-2 sm:my-1 rounded-lg sm:rounded-3xl border-2 border-black px-6 sm:px-6 py-14 sm:py-6 bg-[#F6F7EE]">
                    {/* Header - Now a flex container for the menu button and title */}
                    <div className="flex justify-between items-center gap-4 mb-8"> {/* Changed to flex, items-center */}
                        {/* New container for the mobile menu button and the H1 */}
                        <div className="flex items-center gap-3"> {/* Use gap-3 for spacing between icon and text */}
                            {/* Mobile menu button - Only visible on small screens (lg:hidden) */}
                            <button
                                onClick={toggleMobileMenu}
                                className="lg:hidden p-2 rounded-md text-black/80 hover:bg-gray-200 transition-colors"
                                aria-label="Toggle mobile menu" // Added for accessibility
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="w-6 h-6" />}
                            </button>

                            <h1 className="text-2xl font-bold font-satoshi text-black">
                                {activeTab === "search"
                                    ? "Search Content"
                                    : activeTab === "all"
                                    ? "All Content"
                                    : activeTab === "youTube"
                                    ? "YouTube Videos"
                                    : activeTab === "twitter"
                                    ? "X / Twitter Posts"
                                    : "URLs"
                                }
                            </h1>
                        </div>

                        <div className="hidden sm:flex flex-col sm:items-center sm:flex-row sm:justify-end gap-2 px-1 sm:gap-4 sm:w-auto"> {/* Removed w-full to prevent buttons from stretching */}
                            <button
                                onClick={() => setSharedModalOpen(true)}
                                className="flex items-center justify-center gap-2 border border-black rounded-xl px-4 py-2 text-sm font-medium hover:bg-black hover:text-white duration-300"
                            >
                                <Share className="h-4 w-4" />
                                <span>Share Brain</span>
                            </button>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="bg-[#3b73ed] hover:bg-[#2a5cc9] flex items-center justify-center gap-2 text-white rounded-xl px-4 py-2 text-sm font-medium"
                            >
                                <Plus className="w-4 h-4" />
                                <span> Add Content</span>
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    {activeTab === "search" && (
                        <div className="mb-6 w-full relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/60 w-5 h-5" />
                            <input type="text"
                                placeholder="Search by title or tags..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-black rounded-lg text-black bg-white placeholder:text-black/60 focus:outline-none focus:ring-2 focus:ring-[#3b73ed]"
                            />
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 bg-red-100 border-l-4 border-red-500 p-4 text-red-700 rounded-md"> {/* Corrected border-1-4 to border-l-4 */}
                            <p>{(error as Error).message}</p>
                        </div>
                    )}

                    {/* Loading or Content */}
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-16 w-16 animate-spin text-[#3b73ed]" />
                        </div>
                    ) : filteredContents.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                            <h3 className="text-lg font-medium font-satoshi text-black mb-2">
                                {activeTab === "search" ? "No matching results found" : "No content found"}
                            </h3>
                            <p className="text-black/80 mb-4">
                                {activeTab === "search"
                                    ? "Try searching with different keywords or tags."
                                    : activeTab === "all"
                                    ? "You haven't added any content yet."
                                    : `You haven't added any ${activeTab} content yet.`
                                }
                            </p>
                            {activeTab !== "search" && (
                                <button
                                    onClick={() => { setIsAddModalOpen(true); }}
                                    className="bg-[#3b73ed] hover:bg-[#2a5cc9] flex items-center gap-2 text-white rounded-xl px-4 py-2 text-sm font-medium"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Your First Content
                                </button>
                            )}
                        </div>
                    ) : (
                        <motion.div
                            key={activeTab}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {filteredContents.map((content) => (
                                <motion.div
                                    key={content._id}
                                    variants={cardVariants}
                                >
                                    <ContentCard
                                        id={content._id}
                                        title={content.title}
                                        link={content.link}
                                        type={content.type}
                                        description={content.description}
                                        onDelete={deleteContent}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>


            <div className="fixed bottom-0 left-0 w-full z-50 border-t border-gray-300 flex justify-around px-4 py-3 sm:hidden shadow-md">
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-400 hover:bg-blue-600 text-white rounded-xl px-4 py-2 w-1/2 mx-1 text-sm font-medium flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add
                </button>
                <button 
                    onClick={() => setSharedModalOpen(true)}
                    className="bg-gray-100 text-black hover:bg-gray-200 rounded-xl px-4 py-2 w-1/2 mx-1 text-sm font-medium flex items-center justify-center gap-2"
                >
                    <Share className="w-4 h-4" />
                    Share
                </button>
            </div>
            
            <AddContentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            <ShareBrainModal isOpen={isShareModalOpen} onClose={() => setSharedModalOpen(false)} />
        </div>
    );
}

export default Dashboard;