npx esbuild \
    server.ts \
    --bundle \
    --minify \
    --format=esm \
    --platform=node \
    --target=es2020 \
    --sourcemap=inline \
    --outfile=bundle/server.mjs \
    --banner:js="import { createRequire } from 'module'; const require = createRequire(import.meta.url);"

npx esbuild \
    client.tsx \
    --bundle \
    --minify \
    --format=esm \
    --platform=browser \
    --target=es2022 \
    --sourcemap=inline \
    --outfile=bundle/client.js

cd deploy
cdk synth --no-staging
cd ..