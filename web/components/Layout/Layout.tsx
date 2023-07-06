import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"

export default function({children}: {children: JSX.Element}){
    return(
        <main className="min-h-screen">
            <Navbar />
            <>
                <section className="">
                    {children}
                </section>
            </>
            <Footer />
        </main>
    )
}