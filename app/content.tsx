"use client";

import Footer from "@/shared/Footer";
import FullScreenButton from "@/shared/FullScreenButton";
import SoldierCard from "@/shared/SoldierCard";
import Timer from "@/shared/Timer";
import { generateSoldierData } from "@/utils/soldiersData";
import { Button, Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

const DashboardContent = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [soldiers] = useState(generateSoldierData());

  const [isTracking, setIsTracking] = useState(false);
  const [time, setTime] = useState(0);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleMonitoring = useCallback(() => {
    setIsTracking((prev) => !prev);
  }, []);

  const handleResetTracking = useCallback(() => {
    setIsTracking(false);
    setTime(0);
  }, []);

  const handleFullscreenChange = () => {
    setIsFullscreen(document.fullscreenElement !== null);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  if (!soldiers) {
    return <Spinner />;
  }

  return (
    <Flex
      direction="column"
      gap={8}
      w="full"
      ref={pageRef}
      backgroundColor="#eff3f4"
      px={{ base: 5, lg: 10 }}
    >
      <Flex
        align="center"
        w="full"
        mt={4}
        justify="space-between"
        backgroundColor="white"
        px={4}
        borderRadius="lg"
        py={2}
      >
        <Flex gap={2} align="center" alignItems="center">
          <Image
            src="/assets/images/logo.png"
            objectFit="contain"
            width={60}
            height={40}
            alt="logo"
          />
          <Text textTransform="uppercase" fontWeight="600" fontSize="md">
            Duai
          </Text>
        </Flex>

        <Flex gap={3} align="center">
          <FullScreenButton ref={pageRef} isFullscreen={isFullscreen} />
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
