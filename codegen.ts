import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.API_URL || "http://localhost:4000",
  documents: ["app/**/*.tsx", "components/**/*.tsx"],
  generates: {
    "./apollo/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};
export default config;
