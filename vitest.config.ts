import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
    test: {
        environmentMatchGlobs: [
            ['tests/dom/**', 'jsdom'],
            ['**\/*.edge.tests.ts', 'edge-runtime'],
        ]
    },
}))
