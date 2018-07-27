import React from "react";
import Button from "@material-ui/core/Button";

const BSButton = props => {
  return (
    <div>
      <Button variant="contained">{props.children}</Button>
    </div>
  );
};

export default BSButton;
