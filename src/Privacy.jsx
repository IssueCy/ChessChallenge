import CustomNavbar from "./CustomNavbar";
import Footer from "./Footer";

function Privacy() {
    return (
        <div className="wrapper">
            <CustomNavbar />
            <div className="content">
                <br />
                <br />
                <div className="privacy_content">
                    <h2>Chess Challenge - Privacy</h2>
                    <p><strong>Date changed:</strong> June 7, 2025</p>
                    <br /><br />
                    <p>
                        ChessChallenge takes your privacy seriously. This Privacy Policy outlines how we handle your data when using our platform.
                    </p>
                    <br />

                    <h2>1. Data Collection</h2>
                    <p>
                        We only collect the following information when you register for an account:
                    </p>
                    <ul>
                        <li>Email address</li>
                        <li>Encrypted password</li>
                    </ul>
                    <p>
                        No additional personal data is collected while using the app.
                    </p>
                    <br />
                    <h2>2. Data Storage</h2>
                    <p>
                        Your account information is stored securely in an encrypted and protected database. We do not share or sell your information to third parties.
                        <br />
                        The data you generate within this app, e.g. your saved puzzles, is only stored localy on your device. We do not have acces to it.
                    </p>
                    <br />
                    <h2>3. Account Deletion</h2>
                    <p>
                        You may delete your account at any time. Once deleted, all your data is permanently removed from our system with no backups retained.
                    </p>
                    <br />
                    <h2>4. Contact</h2>
                    <p>
                        If you have any questions about this Privacy Policy, feel free to contact us via the "Contact" Link in the footer.
                    </p>
                    <br /><br />
                    <p>
                        Thank you for using ChessChallenge.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Privacy;