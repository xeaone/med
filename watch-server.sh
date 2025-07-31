npx esbuild server/server.ts \
    --watch \
    --bundle \
    --sourcemap \
    --format=esm \
    --platform=node \
    --target=es2020 \
    --outfile=bundle/server/server.mjs \
    --banner:js="import { createRequire } from 'module'; const require = createRequire(import.meta.url);"

    # --minify \
    # --splitting \
    # --outdir=bundle \
