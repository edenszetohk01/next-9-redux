# Self Media PUA Web

[![Build Status](https://travis-ci.com/hk01-digital/self-media-pua-web.svg?token=pVpstsBpBDrehm35Nnay&branch=development)](https://travis-ci.com/hk01-digital/self-media-pua-web) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org) [![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components) ![npm type definitions](https://img.shields.io/npm/types/typescript.svg)

PUA Web is the client facing Frontend product for Public Account. It showcases the features that are provided for Public Account. This repository is supporting not only Web Frontend but also WebView App Client in HK01 Mobile App.

### Development

```bash
# link environment variable. So it is populated to next server and client
> ln -s .env.development.local .env

# to install dependencies
> yarn

# to start hot-reload dev environment, ready at localhost:3000
> yarn dev

# to deploy
> yarn build
> yarn start
```

## Run with Docker

```bash
# Use Docker Compose
NPM_TOKEN=$HK01_NPM_TOKEN docker-compose up


# OR if you prefer build docker image on your own

# build docker image
docker build -t self-media-pua-web-image --build-arg NPM_TOKEN=$HK01_NPM_TOKEN .

# run docker container
docker run -it -p 3002:3000 --rm --name self-media-pua-web self-media-pua-web-image

```

The app would be served in `localhost:3002` as in the example

## FAQ

### Should I use absolute or relative path import?

Use relative path import if it's `../` or `../../`, for 3 levels onwards please use absolute import.

e.g.

```js
import { Foo } from '../Foo'
import { Bar } from '../../Bar'

// use absolute import from 3 levels onwards
// therefore not `import { Baz } from '../../../Baz'`
import { Baz } from 'src/folder1/folder2/folder3/Baz'
```

Note the `page` folder is not included in the absolute path setting. For more info please take a look in `tsconfig.json`

### How to find type definition of a dependency?

When installing a new dependency, you may wonder how / where to obtain its type definition. In general you can follow below steps.

1. Check their `package.json` to see if there is `type` or `typing` field
2. See if their root directory contains an `index.d.ts`
3. Search for definition in [DefinitelyTyped](https://microsoft.github.io/TypeSearch/)
4. If no luck, then need to define it in `/src/@types/global.d.ts`. [See example here](https://github.com/ivan-ha/whoami/blob/development/src/@types/global.d.ts)
