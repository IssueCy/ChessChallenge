import Swal from "sweetalert2";
import { useAuth } from "./auth";
import { auth } from "./firebase";

const webhookUrl = import.meta.env.VITE_DISCORD_CONTACT_WEBHOOK;
const user = auth.currentUser;

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
            <option value="Account problems">Account / Password problems</option>
            <option value="Other">Other</option>
          </select>

          <label for="details">Describe the issue:</label>
          <textarea id="details" name="details" rows="4" placeholder="Write your message here..." class="swal-field" required></textarea>
          <p style="font-style: italic; font-size: small;">If, for some reason, this contact field does not work for you, you can still contact us through this email adress: <strong>simtecapplications@web.de</strong> <br />But please note that email support is not as fast as direct form support.</p>
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
            content: `@everyone\n\n📨 New Contact Request\n\n**Reason:** ${reason}\n**Details:**\n${details}\n\n**Report sent by:** ${user?.email}`
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

  export default fireContactForm;