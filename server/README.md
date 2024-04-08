## Introduction

This is basecamp backend.

## Prerequisites

- Node v20
- pnpm or yarn for package management
    ```
    npm install -g pnpm
    ```


## Getting Started

#### Install the required node modules

```
pnpm install
```

#### Start the Development Server

```
pnpm dev
```

#### Build the Server

```
pnpm build
```

#### To watch the Tests

```
pnpm run test:watch
```

#### To run the Tests

```
pnpm run test
```

## Setting up environment variables

To load from .env file, copy the .env.example to .env and make modifications as needed.

```
cp .env.example .env
```

## Getting Started with Docker

```
docker compose up
```