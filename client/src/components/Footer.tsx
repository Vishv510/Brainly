import { Brain } from "lucide-react"

function Footer() {
    return (<div className="pt-16 pb-8 px-4 text-black dark:text-white">
        <div className="max-w-6xl mx-auto boeder-white/20 pt-20 mt-20">
            <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-5xl mb-2 text-white">
                    Store All Your Knowledge,
                    <br />
                    <span className="inline-block">In One Place</span>
                </h2>
                <p className="max-w-2xl mx-auto text-black/80 mb-8 dark:text-white">
                    Organize your thoughts, links, and resources with a second brain that helps you stay productive.
                </p>
                <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-white hover:text-black trasition-colors w-full md:w-auto font-semibold">
                    Get Started Free
                </button>
            </div>  
        </div>
        <div className="grid md:grid-cols-5 gap-8 py-8 border-t border-white/20">
            <div className="md:col-span-2">  
                <div className="flex items-center text-white font-bold text-xl mb-4">
                    <span> <Brain /> </span>
                    <p className="ml-4"> Second Brain </p>
                </div>
                <p className="text-black/80 nb-4 dark:text-white"> Keep all your links, notes, and resources connected in one space to boost your productivity.</p>
            </div>
            <nav>
                <h4 className="font-semibold mb-4 text-blue-700">Product</h4>
                <ul className="space-y-2 text-black dark:text-white">
                    <li> <a href="#" className="hover:text-white block">Features</a></li>
                    <li> <a href="#" className="hover:text-white block">Integrations</a></li>
                    <li> <a href="#" className="hover:text-white block">Pricing</a></li>
                </ul>
            </nav> 
            <nav>
                <h4 className="font-semibold mb-4 text-blue-700">Company</h4>
                <ul className="space-y-2 text-black dark:text-white">
                    <li> <a href="#" className="hover:text-white block">About Us</a></li>
                    <li> <a href="#" className="hover:text-white block">Careers</a></li>
                </ul>
            </nav> 
            <nav>
                <h4 className="font-semibold mb-4 text-blue-700">Resources</h4>
                <ul className="space-y-2 text-black dark:text-white">
                    <li> <a href="#" className="hover:text-white block">Documentation</a></li>
                    <li> <a href="#" className="hover:text-white block">Help Center</a></li>
                </ul>
            </nav> 
        </div>
    </div>
    )
}

export default Footer