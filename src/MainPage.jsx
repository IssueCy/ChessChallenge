import Navbar from "./Navbar";
import SelectTypeSection from "./SelectTypeSection";
import Footer from "./Footer";

function MainPage() {

    return(
        <div className="wrapper gradient">
            <Navbar />
            <div className="content">
                <SelectTypeSection />
            </div>
            <Footer />
        </div>
        
    );
}

export default MainPage;