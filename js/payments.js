
function makePayment() {
  const methods = document.getElementsByName("payment");
  let selectedMethod = null;

  for (let method of methods) {
    if (method.checked) {
      selectedMethod = method.value;
      break;
    }
  }

  const status = document.getElementById("status");

  if (!selectedMethod) {
    status.style.color = "red";
    status.innerText = "❌ Please select a payment method.";
    return;
  }

  // Simulate payment success
  localStorage.setItem("web_dev_course_paid", "true");
  localStorage.setItem("payment_method", selectedMethod);

  status.style.color = "green";
  status.innerText = "✅ Payment successful! You are enrolled.";

  // optional redirect later
  // window.location.href = "dashboard.html";
}