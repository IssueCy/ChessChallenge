import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

// Hole die Webhook-URL sicher aus der .env-Datei
const webhookUrl = import.meta.env.VITE_DISCORD_CONTACT_WEBHOOK;

function Footer() {

  function fireContactForm() {
    Swal.fire({
      title: 'Contact Us',
      html: `
        <form id="contactForm" style="display: flex; flex-direction: column; gap: 10px;">
          <label for="reason">What is your issue?</label>
          <select id="reason" name="reason" class="swal-field" required>
            <option value="">-- Please select --</option>
            <option value="Bug">Submit a bug</option>
            <option value="False puzzle">Submit a false puzzle tip/solution</option>
            <option value="Other">Other</option>
          </select>

          <label for="details">Describe the issue:</label>
          <textarea id="details" name="details" rows="4" placeholder="Write your message here..." class="swal-field" required></textarea>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      preConfirm: () => {
        const reason = document.getElementById('reason').value;
        const details = document.getElementById('details').value;

        if (!reason || !details) {
          Swal.showValidationMessage('Please fill out all fields.');
          return false;
        }

        return { reason, details };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { reason, details } = result.value;

        fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: `@everyone\n\n📨 New Contact Request\n\n**Reason:** ${reason}\n**Details:**\n${details}`
          }),
        })
        .then((response) => {
          if (response.ok) {
            Swal.fire('Thank you!', 'We received your message.', 'success');
          } else {
            Swal.fire('Error', 'Failed to send your message. Try again later.', 'error');
          }
        })
        .catch((error) => {
          console.error('Error sending to Discord webhook:', error);
          Swal.fire('Error', 'An error occurred. Please try again.', 'error');
        });
      }
    });
  }

  return (
    <>
      <br />
      <br />
      <div className="footer">
        <div className="side-section">
          <img className="footer-icon" src="/icon.png" alt="icon" />
          <p>© 2025 - {new Date().getFullYear()} ChessChallenge</p>
        </div>

        <div className="side-section">
          <Link to="/privacy">Privacy</Link>
          <button onClick={fireContactForm} className="button-as-link">Contact</button>
        </div>
      </div>
    </>
  );
}

export default Footer;