// Replace this with the Production URL of your n8n Webhook node.
const N8N_WEBHOOK_URL = "https://mubashirjel420.app.n8n.cloud/webhook/lead-capture";

const form = document.getElementById("leadForm");
const submitBtn = document.getElementById("submitBtn");
const statusEl = document.getElementById("status");

function showStatus(message, type = "") {
  statusEl.textContent = message;
  statusEl.className = `status ${type}`.trim();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  showStatus("");

  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const lead = Object.fromEntries(formData.entries());

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead)
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result.message || "The workflow could not process the lead.");
    }

    showStatus(result.message || "Lead submitted successfully.", "success");
    form.reset();
  } catch (error) {
    console.error(error);
    showStatus(error.message || "Submission failed. Please try again.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Lead";
  }
});
