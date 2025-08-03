import { Copy, Edit, ExternalLink, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

interface ContentCardProps {
    id: string,
    title: string,
    link: string,
    type?: string,
    description: string,
    onDelete? : (id: string) => void
}

function ContentCard({id , title, link, type, description, onDelete} : ContentCardProps){
    const [copied, setCopied] = useState(false);
    const twitterRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    
    const handleCopyLink = () => {
        navigator.clipboard.writeText(link)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDelete = () => {
        if(onDelete){
            onDelete(id)
        };
        setShowConfirmModal(false);
    }

    useEffect(() => {
        if(type === "twitter" && (window as any).twttr?.widgets && twitterRef.current){
            setIsLoading(true);
            (window as any).twttr.widgets.load(twitterRef.current).then(() => {
                setIsLoading(false)
            }).catch(() => {
                setIsLoading(false);
            })
        }
    }, [type, link])
    
    const embed = useMemo(() => {
        if(type === 'youtube') {
            try {
                const url = new URL(link);
                const videoId = url.searchParams.get("v") || url.pathname.split("/").pop();

                if(videoId) {
                    return (
                        <div className="aspect-w-16 aspect-h-8 mb-2 pt-2">
                            <iframe 
                                src = { `https://www.youtube.com/embed/${videoId}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-52 sm:h-72 rounded-xl"
                            ></iframe>
                        </div>
                    )
                }
            }catch(error){
                console.error("Invalid Youtube URL", error);
            }
        }else if(type === "twitter"){
            return (
                <div ref={twitterRef} className="mb-1 sm:mb-4 rounded-xl overflow-x-auto -m-2 scrollbar-hidden max-h-80">
                    {isLoading && <div className="flex justify-center items-center">Loading.....</div>}
                    <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com", "twitter.com")}></a>
                    </blockquote>
                </div>
            )
        }
        
        return (
            <div className="mb-4">
                <div className="flex items-center p-3 rounded-xl border border-gray-300 bg-gray-50 hover:shadow-sm transition-all">
                    <ExternalLink className="w-4 h-4 mr-2 text-[#3b73ed] flex-shrink-0" />
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-[#3b73ed] hover:underline overflow-auto font-inter break-words text-sm sm:text-xs"> 
                        {link}
                    </a>
                </div>
                {description && (
                    <div className="mt-4 p-3 sm:p-4 bg-white border border-gray-200 rounded-lg shadow-sm text-sm text-gray-700 overflow-y-auto scrollbar-hidden max-h-96 sm:max-h-64">
                        <div className="flex justify-between items-center mb-2">
                            <h1 className="text-black font-semibold">Description</h1>
                            {!isEditing && (
                                <button 
                                    className="text-gray-500 hover:text-black transition"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        {isEditing ? (
                            <>
                                <textarea value={description}
                                    onChange={(e) => {
                                        console.log("Edited desc: ", e.target.value);
                                    }}
                                    className="w-full mt-2 border border-gray-300 rounded-md p-2 text-sm"
                                />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-3 py-1 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                        }}
                                        className="px-3 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </>
                        ) : (
                             <p className="mt-2 sm:text-xs break-words">{description}</p>
                        )}
                    </div>
                )}
            </div>
        )
    }, [type, link, isLoading]);

    return (
        <div className="w-full h-auto sm:h-[470px] shadow-black/20 hover:shadow-lg hover:shadow-black/70 transition-all bg-[#f0f0f0] border-2 border-black rounded-2xl flex flex-col justify-between rounded-xl border shadow">
            <div className="pb-2 pt-4 px-6 flex justify-between items-start">
                <div className="font-satoshi text-black text-lg sm:text-lg font-semibold leading-none tracking-tight">
                    {title}
                </div>
            </div>

            <div className="flex-1 overflow-hidden p-6 pt-0">
                {embed}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2 border-t sm:gap-0 pb-4 pt-4">
                <button
                    onClick={handleCopyLink}
                    className="w-full sm:w-auto text-black/80 bg-blue-200 hover:text-[#3b73ed] hover:bg-blue-100 flex items-center px-4 py-2 rounded-xl justify-center gap-2 transition max-w-98 sm:ml-3 font-medium"
                >
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy Link"}
                </button>
                
                {onDelete && (
                    <button 
                        onClick={() => {
                            setShowConfirmModal(true)
                            handleDelete();
                        }}
                        className="w-full sm:w-auto text-500 bg-red-100 hover:text-red-700 hover:bg-red-200 flex items-center justify-center px-4 py-2 border rounded-xl gap-2 max-w-98 font-medium sm:mr-3"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                )}
            </div>
        </div>
    )
}

export default ContentCard;