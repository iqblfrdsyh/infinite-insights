import { Button } from "@nextui-org/react";
import React from "react";

const BaseButton = ({ title, onclick, ...props }) => {
  return (
    <Button onClick={onclick} {...props}>
      {title}
    </Button>
  );
};

export default BaseButton;
