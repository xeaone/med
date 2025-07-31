npx esbuild server/server.ts \
    --bundle \
    --sourcemap \
    --format=esm \
    --platform=node \
    --target=es2020 \
    --outfile=bundle/server/server.mjs \
    --banner:js="import { createRequire } from 'module'; const require = createRequire(import.meta.url);"

npx esbuild client/client.tsx \
    --bundle \
    --minify \
    --splitting \
    --sourcemap \
    --format=esm \
    --target=es2022 \
    --outdir=bundle/client \
    --platform=browser

cd deploy
cdk synth --no-staging
cd ..