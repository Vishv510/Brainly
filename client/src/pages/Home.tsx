import Footer from "../components/Footer";
import Header from "../components/Header"
import Hero from "../components/Hero";

function Home(){
    return <div className=" w-full max-w-screen mx-auto bg-slate-200 dark:bg-slate-900">
        <Header></Header>
        <Hero />
        <Footer />
    </div>
}

export default Home;