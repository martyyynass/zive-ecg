import { Box, Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";

type TStatisticsTile = {
  title: string;
  value: string | number;
  valueColor?: string;
};

const StatisticsTile: FC<TStatisticsTile> = ({
  title,
  value,
  valueColor = "inherit",
}) => {
  return (
    <Flex
      backgroundColor="white"
      borderRadius="lg"
      align="center"
      boxShadow="rgba(149, 157, 165, 0.15) 0px 8px 24px"
      height="40px"
      px="3"
      gap={2}
    >
      <Text>{title}</Text>
      <Box fontWeight="bold" color={valueColor}>
        {value}
      </Box>
    </Flex>
  );
};

export default StatisticsTile;
