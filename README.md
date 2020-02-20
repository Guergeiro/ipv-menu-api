# ementas-api

A simple API that wraps around the cafeteria's menu from ESTGV

## Table of Contents

-   [Miscellaneous](#miscellaneous)
-   [Quick Start](#quick-start)
-   [Further Reading](#further-reading)

## Miscellaneous

[![Build Status](https://travis-ci.com/Guergeiro/ementas-api.svg?branch=master)](https://travis-ci.com/Guergeiro/ementas-api) [![Deployment](https://www.heroku.com/)](https://img.shields.io/static/v1?label=heroku&logo=heroku&message=Deployment&color=informational) [![License](https://github.com/Guergeiro/ementas-api/blob/master/LICENSE)](https://img.shields.io/github/license/Guergeiro/ementas-api) [![API](https://ementas-api.herokuapp.com/)](https://img.shields.io/website?down_color=purple&down_message=sleeping&label=API&up_color=success&up_message=up&url=https%3A%2F%2Fementas-api.herokuapp.com%2F)

## Quick Start

### Development

1. Clean project
    ```bash
    $ npm run clean
    ```
2. Install dependencies
    ```bash
    $ npm install
    ```
3. Run development app
    ```bash
    $ npm run dev
    ```

### Production

1. Clean project
    ```bash
    $ npm run clean
    ```
2. Install dependencies
    ```bash
    $ npm install
    ```
3. Build JavaScript
    ```bash
    $ npm run build
    ```
4. Run a clean install
    ```bash
    $ npm clean-install --only=production
    ```

As you can see in [config.env](https://github.com/Guergeiro/ementas-api/blob/master/src/config.env), some things are required for this server to work.

1. :globe_with_meridians: **Zamzar API Key** - read more about [Zamzar](https://developers.zamzar.com/)
2. :construction: **API URL** - should be changed according to prod or dev environment

    :heavy_exclamation_mark: This are all Node.js environment variables. While in _production_ the [config.env](https://github.com/Guergeiro/ementas-api/blob/master/src/config.env) will **NOT** be loaded, therefore this variables should be set at environment.
