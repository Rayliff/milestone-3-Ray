import nextJest from 'next/jest'
import type { Config } from 'jest'

// Path ke root project Next.js (tempat `next.config.ts` dan `.env` berada)
const createJestConfig = nextJest({
  dir: './',
})

// Tambahkan konfigurasi Jest custom di sini
const customJestConfig: Config = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/out/'],
}

export default createJestConfig(customJestConfig)
