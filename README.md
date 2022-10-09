<div style="text-align:center">

# EntGamers Website

[![Typescript](https://img.shields.io/badge/typescript-3178C6?style=flat&logo=TypeScript&logoColor=white)][typescript]&nbsp;
[![JavaScript Style Guide](https://img.shields.io/badge/standardJS-f3df49?style=flat&logo=JavaScript&logoColor=000)][standardjs]&nbsp;
[![JavaScript Style Guide](https://img.shields.io/badge/commitlint-000000?style=flat&logo=commitlint&logoColor=white)][commitlint]&nbsp;
[![JavaScript Style Guide](https://img.shields.io/badge/eslint-4B32C3?style=flat&logo=ESLint&logoColor=white)][eslint]&nbsp;

</div>

This is the source code for the EntGamers website.

<h2>Table of contents</h2>

- [EntGamers Website](#entgamers-website)
  - [Development](#development)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
  - [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Deployment](#deployment)


## Development

This project uses [Next.js][nextjs] and [TypeScript][typescript]. It is recommended to use [Visual Studio Code][vsc] as your editor. The project is configured to use [ESLint][eslint] for code formatting and linting, in standardJS style. It is also configured to use [commitlint][commitlint] for commit message formatting.

### Prerequisites

- [Node.js][nodejs]
- [Yarn][yarn]

### Setup

1. Clone the repository
2. Copy `.env.example` to `.env.local` and fill in the values
3. Run `yarn install` to install dependencies
   - This will also run `husky install` to install git hooks:
     - `pre-commit` will run `yarn lint`
     - commit messages will be linted using [commitlint][commitlint]
4. Run `yarn develop` to start the development server
5. Open `http://localhost:3000` in your browser

## Contributing

Please read [contributing](CONTRIBUTING.md) for details on our contribution process.

## Code of Conduct

Please read [code of conduct](CODE_OF_CONDUCT.md) for details on our code of conduct.

## Deployment

The website is deployed using pm2. with github actions. The configuration is in `.github/workflows/`.


[nodejs]: https://nodejs.org/en/
[typescript]: https://www.typescriptlang.org/
[standardjs]: https://standardjs.com
[commitlint]: https://commitlint.js.org/
[eslint]: https://eslint.org/
[nextjs]: https://nextjs.org/
[vsc]: https://code.visualstudio.com/
[yarn]: https://yarnpkg.com/en/
[pm2]: https://pm2.keymetrics.io/
[nginx]: https://nginx.org/en/
