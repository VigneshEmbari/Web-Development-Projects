export function showNotification(message, type = "info") {
  let notification = document.getElementById("notification");

  if (!notification) {
    notification = document.createElement("div");
    notification.id = "notification";
    notification.className = "notification";
    document.body.appendChild(notification);
  }

  notification.textContent = message;

  notification.classList.remove("info", "success", "error", "warning");
  notification.classList.add(type);

  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}
