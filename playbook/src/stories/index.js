import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { doc } from "storybook-readme";

// import { Button, Welcome } from "@storybook/react/demo";
import { Button } from "../bs_ui";

import architecture from "../../playbook/architecture.md";

storiesOf("Playbook", module).add("Architecture", doc(architecture));

storiesOf("BigSofa Button", module).add("Default", () => (
  <Button>Hi there</Button>
));

// storiesOf("Button", module)
//   .add("with text", () => (
//     <Button onClick={action("clicked")}>Hello Button</Button>
//   ))
//   .add("with some emoji", () => (
//     <Button onClick={action("clicked")}>😀 😎 👍 💯</Button>
//   ));
