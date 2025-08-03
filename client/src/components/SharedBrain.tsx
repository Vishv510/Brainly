import axios from "axios";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import {motion} from "framer-motion";
import ContentCard from "./ContentCard";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className = "", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={
      `inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground ${className}`
    }
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className = "", ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={
      `inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow ${className}`
    }
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className = "", ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={
      `mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`
    }
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;


const containerVariants = {
    hidden: { opacity: 1},
    visiable: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0 , y:20},
    visible: { opacity: 1, y: 0}
}

interface Content {
    _id: string;
    title: string;
    link: string;
    type: string;
    description?: string;
    userId: string;
    tags: string[]
}

interface SharedBrainData {
    username: string;
    content: Content[];
}

const SharedBrain = () => {
    const { shareLink } = useParams();
    const [ username, setUsername ] = useState("");
    const [ contents, setContents ] = useState<Content[]> ([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState("");
    const [ activeTab, setActiveTab ] = useState("all");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSharedContent = async () => {
            try {
                setIsLoading(true);
                setError("");

                const response = await axios.get<SharedBrainData>(
                    `http://localhost:3000/api/v1/brain/${shareLink}`
                );

                if(!response) 
                    throw new Error("Failed to fetch shared content.");

                const data = await response.data;
                setUsername(data.username);
                setContents(data.content);
            }catch(err){
                setError(
                    err instanceof Error ? err.message : "Failed to fetch shared content"
                );
            } finally {
                setIsLoading(false);
            }
        };

        if(shareLink) fetchSharedContent();
    }, [shareLink]);

    const filteredContents = (activeTab === "all" ? contents : contents.filter((c) => c.type === activeTab));

    return (
        <div className="min-h-screen bg-gray-100 py-8 sm:px-6 lg:px-8 font-inter">
            <div className="max-w-7xl mx-auto">
                <div className="mb-4">
                    <button 
                        onClick={() => navigate("/dashboard")}
                        className="inline-flex items-center text-blue-400 hover:text-blue-700 p-0"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Dashboard
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
                    </div>
                ) : error ? (
                    <div className="bg-whiet rounded-2xl shadow-md p-6 text-center border-2 border-black">
                        <h3 className="text-lg font-medium text-red-600 mb-2 font-satoshi"> 
                            Error
                        </h3>
                        <p className="text-black/80"> {error} </p>
                    </div>
                ) : (
                    <div>
                        <div className="bg-white rounded-xl p-5 mb-6 border border-black">
                            <h1 className="text-xl font-bold text-black font-satoshi"> 
                                { username}'s Brain
                            </h1>
                            <p className="text-black/60 text-sm mt-1">
                                Viewing {username}'s shared resources
                            </p>
                        </div>

                        <Tabs 
                            defaultValue="all"
                            value = {activeTab}
                            onValueChange={setActiveTab}
                            className="mb-8"
                        >
                            <TabsList className="mb-2 px-auto py-6 gap-2 bg-white border-2 border-black">
                                {["all", "youtube", "twitter", "url"].map((tab) => (
                                    <TabsTrigger 
                                        key={tab}
                                        value={tab}
                                        className={`px-4 py-2 font-medium text-sm rounded-lg border-2 border-black transition-colors duration-200 data-[state=active]:bg-blue-400 data-[state=active]:text-white data-[state=inactive]:bg-[#a6b4e7] data-[state=inactive]:text-black hover:bg-[#e2e6f4]`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <TabsContent value={activeTab}>
                                { filteredContents.length === 0 ? (
                                    <div className="bg-white rounded-2xl shadow-md p-6 text-center border-2 border-black">
                                        <h3 className="text-lg font-medium text-black mb-2 font-satoshi">
                                            No content found
                                        </h3>
                                        <p className="text-black/80">
                                            {
                                                activeTab === "all" 
                                                    ? `${username} hasn't added any content yet.`
                                                    : `${username} hasn't added any ${activeTab} content yet.`
                                            }
                                        </p>
                                    </div>
                                ): (
                                    <motion.div 
                                        key={activeTab}
                                        className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
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
                                                    id= {content._id}
                                                    title= {content.title}
                                                    link = {content.link}
                                                    type ={content.type}
                                                    description={content.description || ""}
                                                />
                                            </motion.div> 
                                        ))}
                                    </motion.div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                )}  
            </div>
        </div>
    );
};

export default SharedBrain;