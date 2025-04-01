function Navbar() {
    return(
        <div className="navbar">
            <h1>ChessChallenge</h1>

            <div className="nav-left-section">
                <button>Home</button>
                <button>Submit your Puzzle</button>
                <button className="nav-account-button"><img className="nav-account-icon" src="icon.png" alt="account icon" /></button> {/*placeholder icon for account's icon*/}
            </div>
        </div>
    );
}

export default Navbar;