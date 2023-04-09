import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"

export default function({children}: {children: JSX.Element}){
    return(
    <main className="bg-GhostWhite text-Black min-h-screen">
        <Navbar />
        <>
            <section className="min-h-80vh mx-auto w-9/12 p-2 lg:px-6">
                {children}
            </section>
        </>
        <Footer />
    </main>
    )
}