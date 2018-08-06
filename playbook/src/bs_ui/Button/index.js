import React from "react";
import Button from "@material-ui/core/Button";

const BSTButton = props => {
  return (
    <div>
      <Button variant="contained">{props.children}</Button>
    </div>
  );
};

export default BSTButton;
