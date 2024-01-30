import { useState, useEffect } from "react";

type notificationInfo = {
  title: string;
  body: string;
};

export default function useNotification() {
  const [permission, setPermission] = useState<any>(null);

  useEffect(() => {
    const requestPermission = async () => {
      if (typeof window !== "undefined" && "Notification" in window) {
        const permission = await Notification.requestPermission();
        setPermission(permission);
      }
    };
    requestPermission();
  }, []);

  const showNotification = ({ title, body }: notificationInfo) => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (permission === "granted") {
        new Notification(title, {
          body: body,
          icon: "/assets/images/favicon.svg",
          badge: "/assets/images/favicon.svg",
          image: "/assets/images/favicon.svg",
          tag: "timer",
        });
      } else if (permission === "denied") {
        console.log("denied");
      } else if (permission === "default") {
        console.log("ignored");
      }
    } else {
      console.log("not supported");
    }
  };
  return { showNotification };
}
