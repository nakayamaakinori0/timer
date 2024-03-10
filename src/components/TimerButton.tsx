import StartButton from "@/components/StartButton";
import StopButton from "@/components/StopButton";

export default function TimerButton({
  isActive,
  stopHandler,
  startHandler,
}: {
  isActive: boolean;
  stopHandler: any;
  startHandler: any;
}) {
  return (
    <>
      {isActive ? (
        <StopButton stopHandler={stopHandler}></StopButton>
      ) : (
        <StartButton startHandler={startHandler}></StartButton>
      )}
    </>
  );
}
