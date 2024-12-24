import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  { extends: ["eslint:recommended", "plugin:react/recommended"] },
];
