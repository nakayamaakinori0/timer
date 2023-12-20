export default function Nortification() {
  const clickHandler = () => {
    const title = "timer";
    const n = new Notification(title, {
      body: "nortification",
      icon: "vercel.svg",
      tag: "",
      data: {
        xxx: "any data",
      },
    });
  };

  if (!("Nortification" in window)) {
    alert("未対応のブラウザです");
  } else {
    Nortification.requestPermission().then((permission) => {
      if (permission == "granted") {
        // 許可
        console.log("accept");
      } else if (permission == "denied") {
        // 拒否
        console.log("denied");
      } else if (permission == "default") {
        // 無視
        console.log("ignored");
      }
    });
  }
  return (
    <>
      <button onClick={clickHandler}>nortification</button>
    </>
  );
}
