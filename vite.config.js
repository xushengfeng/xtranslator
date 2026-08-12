import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        dts({
            include: ["src/**/*.ts"],
            outDir: "dist",
            rollupTypes: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src/main.ts"),
            name: "xtranslator",
            fileName: (format) => `xtranslator.${format}.js`,
        },
    },
});
