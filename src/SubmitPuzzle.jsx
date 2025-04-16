import Navbar from "./Navbar";
import Footer from "./Footer";

function SubmitPuzzle() {
    return(
        <div className="wrapper">
            <Navbar headline="Submit your own puzzle!" />
            <div className="content">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae nihil aut delectus, dolor odit non tempora nobis iure quibusdam sit?</p>
            </div>
            <Footer />
        </div>


    );
}

export default SubmitPuzzle;