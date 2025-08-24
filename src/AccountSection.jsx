import { useAuth } from "./auth";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Swal from "sweetalert2";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

function AccountSection() {
    const auth = getAuth();
    const user = auth.currentUser;
    const { logout } = useAuth();

    async function reauthenticateAndDelete(password) {
        if (!user) return;

        const credential = EmailAuthProvider.credential(user.email, password);

        try {
            await reauthenticateWithCredential(user, credential);
            await deleteDoc(doc(db, "users", user.uid));
            await deleteUser(user);

            Swal.fire(
                "Success",
                "Your account and all related data have been deleted!",
                "success"
            );
        } catch (error) {
            console.error("Error while deleting account:", error);
            Swal.fire(
                "Error",
                "An error occurred. Please try again later.",
                "error"
            );
        }
    }

    function confirmDeleteAccount() {
        if (!user) return;

        Swal.fire({
            title: "Enter your password to confirm",
            input: "password",
            inputPlaceholder: "Enter your password",
            inputAttributes: {
                autocapitalize: "off",
                autocorrect: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Delete Account",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            preConfirm: (password) => {
                if (!password) {
                    Swal.showValidationMessage("You need to enter your password!");
                    return false;
                }
                return reauthenticateAndDelete(password);
            }
        });
    }

    return (
        <div className="wrapper">
            <Navbar />
            <div className="content">
                <div className="account-section">
                    <h1>Manage your account:</h1>
                    <br />
                    <p style={{ fontStyle: "italic" }}>{user?.email}</p>
                    <br />
                    <div className="button-container">
                        <button onClick={logout} className="logout-button">⬅️ Logout</button>
                        <button onClick={confirmDeleteAccount} className="delete-button">🚮 Delete your account</button>
                        <br />
                        <p>
                            Read privacy note at the bottom of this page to find out how we handle your
                            personal data after account deletion.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AccountSection;
