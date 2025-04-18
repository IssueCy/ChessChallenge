import { useAuth } from "./auth";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Swal from "sweetalert2";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";

function AccountSection() {
    const auth = getAuth();
    const user = auth.currentUser;
    const { logout } = useAuth();

    function reauthenticateAndDelete(password) {
        Swal.fire({
            title: 'Are you sure you want to delete your account?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, do it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                if (user) {
                    const credential = EmailAuthProvider.credential(user.email, password);

                    reauthenticateWithCredential(user, credential)
                        .then(() => {
                            deleteUser(user)
                                .then(() => {
                                    console.log('User deleted after reauthentication.');
                                    Swal.fire(
                                        'Succes',
                                        'Successfully deleted account!',
                                        'success'
                                    );
                                })
                                .catch((error) => {
                                    console.error('Error deleting user after reauthentication:', error);
                                    Swal.fire(
                                        'Error',
                                        'An Error occured, try again later.',
                                        'error'
                                    );
                                });
                        })
                        .catch((error) => {
                            console.error('Error reauthenticating:', error);
                            Swal.fire(
                                'Error',
                                'An Error occured, try again later.',
                                'error'
                            );
                        });
                }
            }
        });

    }

    function confirmDeleteAccount() {
        Swal.fire({
            title: 'Are you sure you want to delete your account?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, do it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                if (user) {
                    deleteUser(user)
                        .then(() => {
                            Swal.fire(
                                'Done!',
                                'Your action was successful.',
                                'success'
                            );
                        }).catch((err) => {
                            console.log(err);
                            Swal.fire(
                                'Error',
                                'An Error occured, please try again later.',
                                'error'
                            );
                        })
                }
            }
        });
    }

    return (
        <div className="wrapper">
            <Navbar />
            <div className="content">
                <div className="account-section">
                    <h2>Manage your account</h2>
                    <br />
                    <p style={{ fontStyle: "italic" }}>{user?.email}</p>
                    <br />
                    <br />
                    <div className="button-container">
                        <button onClick={logout} className="logout-button">Logout</button>
                        <button onClick={confirmDeleteAccount} className="delete-button">Delete your account</button>
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