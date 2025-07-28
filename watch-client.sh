npx esbuild client/client.tsx \
    --watch \
    --bundle \
    --minify \
    --format=esm \
    --platform=browser \
    --target=es2022 \
    --sourcemap=inline \
    --outfile=bundle/client.js
