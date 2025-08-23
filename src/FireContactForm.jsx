import Swal from "sweetalert2";
import { auth } from "./firebase";

const webhookUrl = import.meta.env.VITE_DISCORD_CONTACT_WEBHOOK;

function fireContactForm() {
  Swal.fire({
    title: 'Contact Us',
    html: `
      <p style="font-style: italic; font-size: small; margin-bottom: 12px;"> 
        Please note that by sending this report, you agree that we may contact you back over your account email.
      </p>
      <form id="contactForm" style="display: flex; flex-direction: column; gap: 10px;">
        <label for="reason">What is your issue?</label>
        <select id="reason" name="reason" class="swal-field" required>
          <option value="">-- Please select --</option>
          <option value="Bug">Submit a bug</option>
          <option value="False puzzle">Submit a false puzzle tip/solution</option>
          <option value="Account problems">Account / Password problems</option>
          <option value="Other">Other</option>
        </select>

        <div id="puzzleIdWrapper" style="display: none; flex-direction: column;">
          <label for="puzzleId">#Puzzle-ID:</label>
          <input type="text" id="puzzleId" name="puzzleId" placeholder="Enter puzzle ID..." class="swal-field"/>
        </div>

        <label for="details">Describe the issue:</label>
        <textarea maxlength="400" id="details" name="details" rows="4" placeholder="Write your message here..." class="swal-field" required></textarea>
        
        <p style="font-style: italic; font-size: small;">
          Use this email if this form does not work: <strong>simtecapplications@web.de</strong>
        </p>
      </form>
    `,
    showCancelButton: true,
    confirmButtonText: 'Submit',
    didOpen: () => {
      const reasonSelect = document.getElementById("reason");
      const puzzleIdWrapper = document.getElementById("puzzleIdWrapper");

      reasonSelect.addEventListener("change", () => {
        if (reasonSelect.value === "False puzzle") {
          puzzleIdWrapper.style.display = "flex";
        } else {
          puzzleIdWrapper.style.display = "none";
        }
      });
    },
    preConfirm: () => {
      const reason = document.getElementById("reason").value;
      const details = document.getElementById("details").value;
      const puzzleId = document.getElementById("puzzleId").value;

      if (!reason || !details) {
        Swal.showValidationMessage("Please fill out all fields.");
        return false;
      }

      if (reason === "False puzzle" && !puzzleId) {
        Swal.showValidationMessage("Please enter the Puzzle ID.");
        return false;
      }

      return { reason, details, puzzleId };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const { reason, details, puzzleId } = result.value;
      const user = auth.currentUser;
      const email = user?.email ?? "undefined";

      fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: `@everyone\n\n📨 New Contact Request\n\n**Reason:** ${reason}\n**Details:**\n${details}\n${reason === "False puzzle" ? `**Puzzle ID:** ${puzzleId}\n` : ""}\n**Report sent by: ** ${email}`
        }),
      })
        .then((response) => {
          if (response.ok) {
            Swal.fire("Thank you!", "We received your message.", "success");
          } else {
            Swal.fire("Error", "Failed to send your message. Try again later.", "error");
          }
        })
        .catch((error) => {
          console.error("Error sending to Discord webhook:", error);
          Swal.fire("Error", "An error occurred. Please try again.", "error");
        });
    }
  });
}

export default fireContactForm;
