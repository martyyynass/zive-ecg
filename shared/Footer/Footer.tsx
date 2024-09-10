import { Flex } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Flex align="center" justify="center" fontWeight={500}>
      © Duai, {new Date().getFullYear()}
    </Flex>
  );
};

export default Footer;
