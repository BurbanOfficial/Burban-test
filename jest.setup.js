import '@testing-library/jest-dom'

// Mock Firebase
jest.mock('@/lib/firebase', () => ({
  auth: {},
  db: {},
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))
