import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header(){
    const [mode, setMode] = useState("dark");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => { // use in get theme form localstorage on component 
        const savedTheme = localStorage.getItem("theme");
        if(savedTheme === 'dark'){
            document.documentElement.classList.add('dark');
            setMode('dark');
        }else{
            document.documentElement.classList.add('light');
        }
    }, []);

    function changeMode(){
        document.documentElement.classList.toggle('dark');

        const isDark = document.documentElement.classList.contains('dark');
        // console.log(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if(isDark){
            setMode('dark');
        }else{
            setMode('light');
        }

        // this is done in upper useeffect logic
        // window.onload = () => {
        //     const saved = localStorage.getItem('theme');
        //     if (saved === 'dark') {
        //         document.documentElement.classList.add('dark');
        //     }
        // }
    }

    return (
        <div className="w-full h-14 sm:h-18 md:h-22 flex justify-between items-center backdrop-blur-lg bg-white/40 rounded px-4 py-2">
            <h1 className="font-gold sm:text-4xl text-lg text-blue-800 dark:text-blue-400 max-w-[60%] overflow-hidden whitespace-nowrap">
                SecondBrain
            </h1>

            <div className="sm:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-full hover:bg-gray-200 dark: hover:bg-gray-700 text-gray-800 dark:text-white"
                >
                    {isMenuOpen ? <X size={24}/> : <Menu size={24} />}
                </button>
            </div>

            <div className="hidden sm:flex flex items-center gap-2 text-sm">
                <button onClick={changeMode} className="p-1 rounded-full hover:bg-gray-200">
                    {mode === "dark" &&
                        <Sun  className="dark:text-white"/>
                    }
                    {mode !== "dark" &&
                        <Moon />
                    }
                </button>
                <button className="bg-blue-600 text-sm rounded-full px-3 py-1 text-white whitespace-nowrap" onClick={()=> navigate("/signup")}>
                    Register
                </button>
            </div>

            {isMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 sm:hidden z-10">
                    <button
                        onClick={() => {
                            changeMode();
                            setIsMenuOpen(false); // close menu after any button press
                        }}
                        className="w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    > 
                    <p className="text-blue px-2">Change Theme</p>
                        {mode === 'dark' ? (
                            <Sun size={20} />
                        ) : (
                            <Moon size={20}/>
                        )}
                    </button>
                    <hr ></hr>
                    <button
                        className="w-full text-left px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {
                            navigate("/signup");
                            setIsMenuOpen(false);
                        }}
                    >
                        Register
                    </button>
                </div>
            )}
        </div>
    )
}

export default Header;