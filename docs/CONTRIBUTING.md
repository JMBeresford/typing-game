# Overview and structure

> Reading our [DEVELOPMENT.md](./DEVELOPMENT.md) guide is **highly recommended**

This is a monorepo that is orchestrated via [Turborepo](https://turbo.build/repo). The main directories of note in this repo are the `/apps` directory and the `/packages` directory. Namely, the `/apps` directory contains applications and the `/packages` directory contains packages! Each of these directories are defined as _workspaces_ in our monorepo.

# The Apps Workspace

This workspace contains two apps, at the time of writing, called `web` and `workshop`.

## The `web` app

This is the main web application that represents our game. It makes use of the components and build/dev tools from the `packages` workspace to compose the full thing. It is written using the [Next.js](https://nextjs.org/) framework.

This app will contain things like:

- the various pages/routes of the web application
- the layouts used in the pages/routes of the web application
- the game logic and type system
- serverless integrations such as authentication, database, etc

## The `workshop` app

This is a [storybook](https://storybook.js.org/) application that is used to iterate/test/view UI components in the browser without needing to navigate through the full game's web app.

# The Packages Workspace

This workspace contains build/dev tools and UI component libraries.

## The `eslint-config-custom` package

This package contains an [eslint](https://eslint.org/) configuration that can be shared across all the apps/packages in the repo.

## The `tsconfig` package

This package contains a TypeScript configuration for sharing amongst various different configurations of apps/packages in the repo.

## The `ui` package

This package is a React UI component library. Any re-usable UI components (such as Buttons, modals, etc) live here and are imported into the main application(s).

# Submitting your work

> We highly suggest you read our [DEVELOPMENT.md](./DEVELOPMENT.md) guide to better understand the following section

If you have work that you would like to be pulled in, it's as simple as opening a PR!

The most important thing is that the commits that hit our deployment branch(es) **must** follow the [convention commits](https://www.conventionalcommits.org/en/v1.0.0/) guidelines. This allows for our CI to automate the incrementing of the version of the game, as well automate the generation of release notes. This also makes our git history structurally consistent, which makes debugging through it much easier!

If this guideline is too much for you to remember/deal with, you can use the tool [commitizen](http://commitizen.github.io/cz-cli/) via the command `pnpm run cz`.

When merging a PR, one of two things can be done:

### Squash Merge

A squash merge will take all of your commits and squash them into one. This allows you an opportunity to write a commit message that encapsulates the entire PR and **follows our above commit guidelines**.

### Rebase Merge

A rebase merge will simply copy each commit from your PR onto the target branch _as-is_. This is the easiest option, so long as the commits in your PR **already follow our above commit guidelines**.
