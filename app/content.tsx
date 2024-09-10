"use client";

import Footer from "@/shared/Footer";
import SoldierCard from "@/shared/SoldierCard";
import Timer from "@/shared/Timer";
import { generateSoldierData } from "@/utils/soldiersData";
import {
  Button,
  Flex,
  Grid,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useRef, useState } from "react";
import { GoScreenFull } from "react-icons/go";

const DashboardContent = () => {
  const pageRef = useRef<HTMLDivElement>(null);
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

  const handleFullScreen = () => {
    if (pageRef.current) {
      if (pageRef.current.requestFullscreen) {
        pageRef.current.requestFullscreen();
      }
    }
  };

  return (
    <Flex direction="column" gap={6} w="full" ref={pageRef}>
      <Flex align="center" w="full" mt={4} justify="space-between">
        <Flex
          gap={4}
          align="center"
          bg="white"
          px={4}
          borderRadius="lg"
          boxShadow="rgba(149, 157, 165, 0.15) 0px 8px 24px"
        >
          <Text textTransform="uppercase" fontWeight="600" fontSize="xl">
            Duai
          </Text>
        </Flex>

        <Flex gap={3} align="center">
          <IconButton
            icon={<GoScreenFull />}
            aria-label="full screen"
            onClick={handleFullScreen}
            backgroundColor="white"
            borderRadius="lg"
          />
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

      <Footer />
    </Flex>
  );
};

export default DashboardContent;
