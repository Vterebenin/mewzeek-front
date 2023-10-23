import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface TheButtonProps {
  children?: React.ReactElement | string;
  to?: string;
  onClick?: React.MouseEventHandler;
  className?: string;
}
function TheButton({ children, to, onClick, className }: TheButtonProps) {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (to) {
      navigate(to);
    }
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <Button onClick={(e) => handleClick(e)} className={className}>
      {children}
    </Button>
  );
}

export default TheButton;
