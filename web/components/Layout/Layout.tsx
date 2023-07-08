import Head from "next/head"
import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"

export default function({children}: {children: JSX.Element}){
    return(
        <>
         <Head>
            <title>Mwitu</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         
        <main className="min-h-screen">
            <Navbar />
            <>
                <section className="">
                    {children}
                </section>
            </>
            <Footer />
        </main>
        </>
    )
}