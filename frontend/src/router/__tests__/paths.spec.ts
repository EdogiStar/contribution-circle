import { Path, buildPath } from '../paths'

describe('buildPath', () => {
  it('returns a static path unchanged', () => {
    expect(buildPath(Path.Dashboard)).toBe('/dashboard')
  })

  it('returns the home path unchanged', () => {
    expect(buildPath(Path.Home)).toBe('/')
  })

  it('returns the login path unchanged', () => {
    expect(buildPath(Path.Login)).toBe('/login')
  })

  it('returns the register path unchanged', () => {
    expect(buildPath(Path.Register)).toBe('/register')
  })
})