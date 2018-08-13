import React from "react";
import { storiesOf } from "@storybook/react";
import { doc } from "storybook-readme";
import withTests from "./withTests";

import { Button, LinkButton } from "../bs_ui";

import architecture from "../../documentation/architecture.md";

storiesOf("Playbook", module).add("Architecture", doc(architecture));

storiesOf("BigSofa Button", module)
  .addDecorator(withTests("Button"))
  .add("This should show tests in storybook", () => {
    return <Button>Hi there</Button>;
  });

storiesOf("BigSofa LinkButton", module)
  .addDecorator(withTests("LinkButton"))
  .add("This should show tests in storybook", () => {
    return <LinkButton>Hi there</LinkButton>;
  });
