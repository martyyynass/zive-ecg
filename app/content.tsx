"use client";

import SoldierCard from "@/shared/SoldierCard";
import StatisticsTile from "@/shared/StatisticsTile";
import Timer from "@/shared/Timer";
import { generateSoldierData } from "@/utils/soldiersData";
import { Button, Flex, Grid, Spinner } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";

const DashboardContent = () => {
  const [soldiers] = useState(generateSoldierData());

  const [isTracking, setIsTracking] = useState(false);
  const [time, setTime] = useState(0);

  const handleMonitoring = useCallback(() => {
    setIsTracking((prev) => !prev);
  }, []);

  const handleResetTracking = useCallback(() => {
    setIsTracking(false);
    setTime(0);
  }, []);

  if (!soldiers) {
    return <Spinner />;
  }

  return (
    <Flex direction="column" gap={6} w="full">
      <Flex align="center" w="full" mt={4} justify="space-between">
        <Flex gap={4}>
          {/* <StatisticsTile title="Total:" value={soldiers.length} />

          <StatisticsTile
            title="Warning:"
            valueColor="orange"
            value={
              soldiers.filter((soldier) => soldier.status === "Warning").length
            }
          />

          <StatisticsTile
            title="Alarm:"
            valueColor="red"
            value={
              soldiers.filter((soldier) => soldier.status === "Alarm").length
            }
          /> */}
        </Flex>

        <Flex gap={3} align="center">
          <Timer isTimerRunning={isTracking} time={time} setTime={setTime} />

          <Button
            colorScheme={isTracking ? "red" : "green"}
            onClick={handleMonitoring}
            flexShrink={0}
            w="70px"
          >
            {isTracking ? "Stop" : "Start"}
          </Button>

          {time !== 0 && (
            <Button colorScheme="orange" onClick={handleResetTracking}>
              Reset
            </Button>
          )}
        </Flex>
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          "2xl": "repeat(5, 1fr)",
        }}
        gap={6}
        pb={10}
        w="full"
      >
        {soldiers.map((soldier) => (
          <SoldierCard
            key={soldier.id}
            soldierData={soldier}
            isTracking={isTracking}
          />
        ))}
      </Grid>
    </Flex>
  );
};

export default DashboardContent;
