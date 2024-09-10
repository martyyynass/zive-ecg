"use client";
import { IconButton } from "@chakra-ui/react";
import React, { forwardRef } from "react";
import { GoScreenFull } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

type TFullScreenButtonProps = {
  isFullscreen: boolean;
};

const FullScreenButton = forwardRef<HTMLDivElement, TFullScreenButtonProps>(
  ({ isFullscreen }, ref) => {
    const handleFullScreen = () => {
      if (ref?.current) {
        if (!isFullscreen) {
          if (ref.current.requestFullscreen) {
            ref.current.requestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      }
    };

    return (
      <IconButton
        icon={isFullscreen ? <IoMdClose /> : <GoScreenFull />}
        aria-label="Toggle Fullscreen"
        onClick={handleFullScreen}
        backgroundColor="white"
        borderRadius="lg"
      />
    );
  }
);

FullScreenButton.displayName = "FullScreenButton";

export default FullScreenButton;
