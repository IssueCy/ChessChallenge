function Navbar() {
    return(
        <div className="navbar">
            <h1>ChessChallenge</h1>

            <div className="nav-left-section">
                <a href="#">Home</a>
                <button>Submit your Puzzle</button>
                <button>Account</button>
            </div>
        </div>
    );
}

export default Navbar;