import { BUTTON_TYPES } from "@/const/general";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface TheButtonProps {
  children?: React.ReactElement | string;
  to?: string;
  onClick?: React.MouseEventHandler;
  [key: string]: unknown;
}
function TheButton({ children, to, onClick, ...args }: TheButtonProps) {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (args.type !== BUTTON_TYPES.SUBMIT) {
      e.preventDefault();
    }
    if (to) {
      navigate(to);
    }
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <Button onClick={(e) => handleClick(e)} {...args}>
      {children}
    </Button>
  );
}

export default TheButton;
