"use client";
import { TSoldier } from "@/utils/soldiersData";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

import { csvData } from "@/data/ecg1";

import { PiExport } from "react-icons/pi";
import LineChart from "../LineChart";
import Link from "next/link";

type TSoldierCardProps = {
  soldierData: TSoldier;
  isTracking: boolean;
};

const SoldierCard: FC<TSoldierCardProps> = ({ soldierData, isTracking }) => {
  const { name, status } = soldierData;
  const [chartData, setChartData] = useState<{ x: number; y: number }[]>([]);

  // Define the size of the sliding window and the increment
  const sliceSize = 200;
  const increment = 40;

  // Generate a random start index using uniqueId as a seed
  const getRandomStartIndex = () => {
    return Math.floor(Math.random() * (csvData.length - sliceSize));
  };

  // Keep track of the current index of the data
  const [startIndex, setStartIndex] = useState(getRandomStartIndex());

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Function to update the data
    const updateData = () => {
      // Calculate the new start index
      let newStartIndex = startIndex + increment;

      // If new start index exceeds data length, loop back to start
      if (newStartIndex + sliceSize > csvData.length) {
        newStartIndex = 0; // Reset to start if it exceeds the length
      }

      // Set the new chartData by slicing the next set of records
      setChartData(csvData.slice(newStartIndex, newStartIndex + sliceSize));

      // Update the start index for the next update
      setStartIndex(newStartIndex);
    };

    // Set up an interval to update the data every 3 seconds
    if (isTracking) {
      interval = setInterval(updateData, 2000);
    }

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [startIndex, isTracking]);

  const getStatusColor = (status: string) => {
    if (status === "Warning") {
      return "orange";
    }
    if (status === "Alarm") {
      return "red";
    }

    return "green";
  };

  return (
    <Card
      maxW="sm"
      maxWidth="full"
      borderRadius="lg"
      boxShadow="rgba(149, 157, 165, 0.15) 0px 8px 24px"
    >
      <CardBody>
        <Flex justify="center">
          <Image
            src="/assets/images/profile.webp"
            alt="soldier"
            priority
            objectFit="cover"
            width={200}
            height={200}
          />
        </Flex>

        <Stack mt="6" spacing="3">
          <Flex align="center" justifyContent="space-between" mb={2}>
            <Heading size="md">{name}</Heading>
            <Flex align="center">
              <Box
                w={3}
                height={3}
                borderRadius="full"
                bg={getStatusColor(status)}
              />
            </Flex>
          </Flex>

          <Box width="full" height={200}>
            <LineChart chartData={chartData} />
          </Box>
        </Stack>
      </CardBody>

      <CardFooter pt={0}>
        <Flex align="center" gap={2}>
          <IconButton
            borderRadius="full"
            aria-label="Export"
            icon={<PiExport />}
            as={Link}
            href="/assets/report.pdf"
            target="_blank"
          />{" "}
          <Text fontSize="md">Detail report</Text>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default SoldierCard;
