import React from "react";
import Button from "@material-ui/core/Button";

export default props => {
  return (
    <Button variant="contained" {...props}>
      {props.children}
    </Button>
  );
};
