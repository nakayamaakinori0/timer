import React from "react";

export default function NotificationButton() {
  const clickHandler = () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission == "granted") {
          // 許可
          const title = "timer";
          new Notification(title, {
            body: "notification",
            icon: "vercel.svg",
            tag: "",
            data: {
              xxx: "any data",
            },
          });
          console.log("accept");
        } else if (permission == "denied") {
          // 拒否
          console.log("denied");
        } else if (permission == "default") {
          // 無視
          console.log("ignored");
        }
      });
    } else {
      console.log("not supported");
    }
  };
  return (
    <>
      <button onClick={clickHandler}>通知を表示</button>
    </>
  );
}
