# Simple Stackbit Example with Next.js

This is an example project built to explain the very basics of how Stackbit works. [Read the guide here](https://www.stackbit.com/docs/reference/examples/simple-nextjs/).

**⚠️ WARNING!** This is an example project used only for conceptual explanation. It is not built for production. See below for known issues.

## Clone in Stackbit

You can clone this project into your own Stackbit project

[![Create with Stackbit](https://assets.stackbit.com/badge/create-with-stackbit.svg)](https://app.stackbit.com/create?theme=https://github.com/stackbit/example-nextjs-simple)

## Running Locally

After cloning, install dependencies:

    npm install

Then run the development server:

    npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Known Issues

There are known issues, as this project is used only for example purposes:

- The `[[...slug]].jsx` template is using Stackbit's new annotations. These are not fully documented and should not be used in production.
- `stackbit.yaml` is set to Stackbit v0.4, which is still in active development.
- `stackbit.yaml` includes a `logicFields` setting that is used as a workaround.
- Content edited in Stackbit Studio will not update automatically, as Next.js does not support HMR on files that are not directly imported.

## Support

If you have questions or suggestions, [contact support via email](mailto:support@stackbit.com).
