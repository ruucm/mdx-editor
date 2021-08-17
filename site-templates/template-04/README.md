<h1 align="center">
  Harbor School Website using Lighthouse
</h1>

## 🧱 Structure

### [Front]

1. Components - `@harborschool/lighthouse`
1. Gatsby Site - `/`
1. Gatsby Plugin highlights

- gatsby-remark-images for notion contents image.
- gatsby-plugin-image for featured image .

### [User / Auth]

Firebase

### [Server - serverless]

1. Payment - Stripe + node
1. Contents - notion + python

- notion
- markdown
- lxml

## 🚀 Start

1.  **Setup .env files**

    Navigate into your cloned directory and make .env files

    ```sh
    echo \"PRODUCTION=false\" >> .env.development
    ```

    ```sh
    echo \"PRODUCTION=true\" >> .env.production
    ```

1.  **Build custom plugin**

    ```sh
    cd plugins/gatsby-plugin-intl-with-root
    ```

    ```sh
    yarn install && yarn build
    ```

1.  **Start developing.**

    start it up.

    ```sh
    npm link @harborschool/lighthouse
    ```

    ```sh
    yarn start
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

1.  **Check Severside Errors**

    Build project to check it has error for serverside rendering

    ```sh
    yarn build
    ```
