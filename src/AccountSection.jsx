import { useAuth } from "./auth";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AccountSection() {
    const { user } = useAuth();

    return (
        <div className="wrapper">
            <Navbar />
            <div className="content">
                <div className="account-section">
                    <h2>Manage your account</h2>
                    <br />
                    <p style={{fontStyle: "italic"}}>{user?.email}</p>
                    <br />
                    <br />
                    <div className="button-container">
                        <button className="logout-button">Logout</button>
                        <button className="delete-button">Delete your account</button>
                        <br />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut laudantium ipsa dolores amet. Aspernatur quod veritatis nesciunt dolore tempore fuga.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );

}

export default AccountSection;