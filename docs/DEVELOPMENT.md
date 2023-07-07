# Before You Start

There are a few pre-requisites that you should consider before trying to make any changes to this repo.

Firstly, make sure to read our [CONTRIBUTING.md](./CONTRIBUTING.md) guide. The structure of the repository is defined explicitly there, as well as the guidelines you will need to follow if you want your work pulled in.

You should also have a moderate understanding of the tools being used in this repository:

### [pnpm](https://pnpm.io/)

This repo uses `pnpm` as its package manager. If you're already quite comfortable with `npm`, then the transition should be mostly 1-to-1 for you. Otherwise, you should refer to the docs.

Note that `pnpm` will execute its commands from the _root workspace_ by default. As this is a monorepo, this means it will execute for _all workspaces that support that command_. Read the following section about Turborepo for a better understanding on this.

> Note the version of `pnpm` listed in the `package.json` file, and make sure you use that version

### [Turborepo](https://turbo.build/repo)

This is a monorepo and understanding how to operate within one is a must. You should understand the following things about Turborepo, specifically:

- workspaces
- pipelines
- tasks
- task dependencies
- filtering workspaces
- remote caching

To best make use of the remote caching, you should execute the following in the repo:

```
npx turbo login
npx turbo link
```

# Making Changes

To spin up every dev server available to us in the repo you can execute `pnpm run dev` from anywhere in the repo.

This is often more than we want, so instead you can execute `pnpm run dev --filter web` to spin up only the dev server for the `web` app. The dev server will be available at http://localhost:3000 by default, but check the logs in case that port is unavailable.

Making changes in the code-base will automatically reload the dev-server such that your changes are visible in the browser. This goes for the `web` app and the `workshop` app, along with changes in any packages they utilize (e.g. the `ui` package).

---

### [Storybook](https://storybook.js.org/) (the `workshop` app)

Sometimes you want to quickly iterate through changes of a simple UI component without having to navigate an entire web app. This is what the `workshop` app is for.

This app is a [storybook](https://storybook.js.org/) setup that will contain stories for each UI component in the `ui` package, and any added UI packages in the future.

# Example Workflow

The following is a from-scratch example workflow that should get most anyone up and running:

- Install `npm` + `pnpm` (note the version in `/package.json`)
- Clone the repository
- Run `pnpm install` in the repo to install all deps
- Run `npx turbo login` to authenticate with vercel for remote caching
- Run `npx turbo link` to enable remote caching
- Run `pnpm run dev` to start all dev servers
  - or `pnpm run dev --filter web` for just the web app
  - or `pnpm run dev --filter workshop` for just the storybook app
  - etc
- Make your changes
- Run `pnpm run format` to format the code as-per the included spec
- Run `pnpm run lint` to catch any linting errors
- Run `pnpm run test` to run tests
- If all is good, commit your changes and create a PR on github
- ???
- profit
