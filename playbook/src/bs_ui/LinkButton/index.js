import React from "react";
import Button from "@material-ui/core/Button";

export default props => {
  return (
    <Button variant="extendedFab" {...props}>
      {props.children}
    </Button>
  );
};
