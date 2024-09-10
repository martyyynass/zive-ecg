import { Flex, Text } from "@chakra-ui/react";
import React, { Dispatch, FC, SetStateAction, useEffect } from "react";

type TTimerProps = {
  isTimerRunning: boolean;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
};

const Timer: FC<TTimerProps> = ({ isTimerRunning, time, setTime }) => {
  // state to check stopwatch running or not
  //   const [isRunning, setIsRunning] = useState(isTimerRunning);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isTimerRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isTimerRunning, time, setTime]);

  return (
    <Flex
      gap={2}
      background="white"
      h="40px"
      alignItems="center"
      borderRadius="lg"
      pl={3}
    >
      <Text fontSize="md">Duration:</Text>
      <Flex width="100px" color="gray.600">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </Flex>
    </Flex>
  );
};

export default Timer;
