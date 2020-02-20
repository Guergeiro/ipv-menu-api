# ementas-api

A simple API that wraps around the cafeteria's menu from ESTGV

## Table of Contents

-   [Documentation](#documentation)
-   [Miscellaneous](#miscellaneous)
-   [Quick Start](#quick-start)
-   [Further Reading](#further-reading)

## Miscellaneous

[![Build Status](https://travis-ci.com/Guergeiro/ementas-api.svg?branch=master)](https://travis-ci.com/Guergeiro/ementas-api) [![Deployment](https://img.shields.io/static/v1?label=heroku&logo=heroku&message=Deployment&color=informational)](https://www.heroku.com/) [![License](https://img.shields.io/github/license/Guergeiro/ementas-api)](https://github.com/Guergeiro/ementas-api/blob/master/LICENSE) [![API](https://img.shields.io/website?down_color=purple&down_message=sleeping&label=API&up_color=yellow&up_message=online&url=https%3A%2F%2Fementas-api.herokuapp.com%2F)](https://ementas-api.herokuapp.com/)

## Documentation

**Base URL**: https://ementas-api.herokuapp.com/

[![GET /ementas](https://img.shields.io/static/v1?label=GET&message=%2Fementas&color=success)](https://ementas-api.herokuapp.com/ementas)

```json
// Example response
[
    {
        "date": "2020-02-03T00:00:00.000Z",
        "type": 0,
        "sopa": "Alho-Francês",
        "carne": "Panadinhos de frango à americana (com bacon) com arroz de",
        "peixe": "Solha no forno com batata e alecrim",
        "dieta": "Carne de vaca cozida com couve e batata",
        "vegetariano": "Fusili gratinado com cogumelos e legumes em juliana"
    },
    {
        "date": "2020-02-03T00:00:00.000Z",
        "type": 1,
        "sopa": "Macedónia",
        "carne": "Chili de carne vaca com arroz",
        "peixe": "Carapauzinhos fritos C/ arroz de tomate",
        "dieta": "Pescada assada ao natural com brócolos",
        "vegetariano": "Legumes salteados à Brás"
    }
]
```

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

    :heavy_exclamation_mark: This are all Node.js environment variables. While in \_production* the [config.env](https://github.com/Guergeiro/ementas-api/blob/master/src/config.env) will **NOT** be loaded, therefore this variables should be set at environment.
