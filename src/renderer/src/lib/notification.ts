export function createNotify() {
  const NOTIFICATION_TITLE = "Alarm Stopped";
  const NOTIFICATION_BODY = "Time is completed";

  new window.Notification(NOTIFICATION_TITLE, {
    body: NOTIFICATION_BODY,
  });
}
