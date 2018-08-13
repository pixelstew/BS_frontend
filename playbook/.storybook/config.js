import { configure } from "@storybook/react";
import { withTests } from "@storybook/addon-jest";
import { addDecorator } from "@storybook/react";

import results from "../jest-test-results.json";

function loadStories() {
  require("../src/stories");
}

configure(loadStories, module);

addDecorator(withTests({ results }));
