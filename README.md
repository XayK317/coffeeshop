# Monon Grind

A small React coffee-shop ordering demo.

```sh
npm install
npm run dev
```

Open the address printed by Vite. Run `npm test` for cart and pricing tests, and `npm run build` for a production build.

For Netlify deployment, import the project into Netlify; `netlify.toml` configures the build command, output directory, and Node version. Alternatively, run `npm run build` and upload the generated `dist` folder to Netlify Drop. Submit the resulting hosted URL.

The menu is sourced from `src/data/menu.json`; its dollar prices are converted to cents for cart calculations.

This is a client-side demonstration: it does not submit orders or process payments, and the cart, confirmation and theme reset when the page is reloaded. The demo calculates 7% tax on the subtotal, rounded to the nearest cent. A real checkout needs a server, payment integration, and authoritative pricing and tax calculations.
