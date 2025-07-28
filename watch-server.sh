npx esbuild server/server.ts \
    --watch \
    --bundle \
    --minify \
    --format=esm \
    --platform=node \
    --target=es2020 \
    --sourcemap=inline \
    --outfile=bundle/server.mjs \
    --banner:js="import { createRequire } from 'module'; const require = createRequire(import.meta.url);"
