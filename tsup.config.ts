import { defineConfig } from 'tsup';

export default defineConfig({
    tsconfig: './tsconfig.json',
    entry: ['./src/**/*.ts'],
    splitting: true,
    sourcemap: true,
    clean: true,
    platform: 'node',
    esbuildOptions(options, _context) {
        // the directory structure will be the same as the source
        options.outbase = './src';
        options.external = ['redis-memory-server'];
    },
    target: 'node20',
    format: 'esm',
    treeshake: true,
    outDir: 'build',
});

