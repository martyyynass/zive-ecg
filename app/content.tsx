"use client";

import SoldierCard from "@/shared/SoldierCard";
import Timer from "@/shared/Timer";
import { generateSoldierData } from "@/utils/soldiersData";
import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const DashboardContent = () => {
  const [soldiers] = useState(generateSoldierData());

  const [isTracking, setIsTracking] = useState(false);

  const handleMonitoring = () => {
    setIsTracking(!isTracking);
  };

  return (
    <Flex direction="column" gap={6} w="full">
      <Flex align="center" w="full" mt={4} justify="space-between">
        <Box
          background="white"
          borderRadius="lg"
          p={5}
          boxShadow="rgba(149, 157, 165, 0.15) 0px 8px 24px"
        >
          Stats and controls row
        </Box>

        <Flex gap={3} align="center">
          <Flex
            gap={2}
            background="white"
            h="40px"
            alignItems="center"
            borderRadius="lg"
            pl={3}
          >
            <Text fontSize="md">Duration:</Text>
            <Timer isTimerRunning={isTracking} />
          </Flex>
          <Button
            colorScheme={isTracking ? "red" : "green"}
            onClick={handleMonitoring}
            flexShrink={0}
            w="70px"
          >
            {isTracking ? "Stop" : "Start"}
          </Button>
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
