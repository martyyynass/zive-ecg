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
import React, { FC, useCallback, useEffect, useState, memo } from "react";
import { csvData } from "@/data/ecg1";
import { PiExport } from "react-icons/pi";
import LineChart from "../LineChart";
import Link from "next/link";
import { TChartPoint } from "@/types";
import BpmChart from "../BpmChart";

type TSoldierCardProps = {
  soldierData: TSoldier;
  isTracking: boolean;
};

// Memoize the SoldierCard to prevent unnecessary re-renders
const SoldierCard: FC<TSoldierCardProps> = memo(
  ({ soldierData, isTracking }) => {
    const { name, status } = soldierData;

    const [chartData, setChartData] = useState<TChartPoint[]>([]);
    const [startIndex, setStartIndex] = useState(() =>
      Math.floor(Math.random() * (csvData.length - 800))
    );

    const sliceSize = 800;
    const increment = 40;

    const getStatusColor = useCallback((status: string) => {
      switch (status) {
        case "Warning":
          return "orange";
        case "Alarm":
          return "red";
        default:
          return "green";
      }
    }, []);

    useEffect(() => {
      let interval: NodeJS.Timeout;

      const updateData = () => {
        let newStartIndex = startIndex + increment;
        if (newStartIndex + sliceSize > csvData.length) {
          newStartIndex = 0;
        }

        setChartData(csvData.slice(newStartIndex, newStartIndex + sliceSize));
        setStartIndex(newStartIndex);
      };

      if (isTracking) {
        interval = setInterval(updateData, 400);
      }

      return () => clearInterval(interval);
    }, [isTracking, startIndex]);

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

            <Text fontWeight={600} fontSize="sm">
              BPM
            </Text>
            <BpmChart
              isTracking={isTracking}
              randomStartIndex={Math.floor(Math.random() * 500)}
            />

            <Text fontWeight={600} fontSize="sm">
              ECG
            </Text>
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
  }
);

// Set display name for the memoized component
SoldierCard.displayName = "SoldierCard";

export default SoldierCard;
