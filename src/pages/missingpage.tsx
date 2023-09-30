import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

export function MissingPage() {
    return (
        <>
        <header>
            <Navbar />
        </header>
        <h2>This page does not exist</h2>
        <Footer />
        </>
    );
}