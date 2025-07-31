npx esbuild client/client.tsx \
    --watch \
    --bundle \
    --minify \
    --splitting \
    --sourcemap \
    --format=esm \
    --target=es2022 \
    --outdir=bundle/client \
    --platform=browser
