# Testing Guide for poly-time

This guide covers the testing setup including unit tests, component tests, and E2E tests for your NextJS application.

## Testing Architecture

Your project is configured with three test projects:

### 1. **Unit Tests** (`vitest` with `jsdom`)

- **Location**: `__tests__/unit/**/*.test.ts(x)`
- **Tool**: Vitest + jsdom
- **Purpose**: Test pure functions, utilities, and isolated logic
- **Run**: `pnpm test:unit`

Example:

```tsx
// __tests__/unit/timeUtils.test.ts
describe("calculateTimeDifference", () => {
  it("should calculate difference in minutes", () => {
    const result = calculateTimeDifference(start, end)
    expect(result).toBe(30)
  })
})
```

### 2. **Component Tests** (React Testing Library)

- **Location**: `__tests__/unit/**/*.test.tsx`
- **Tool**: Vitest + React Testing Library + jsdom
- **Purpose**: Test React components with user interactions
- **Run**: `pnpm test:unit`

Example:

```tsx
// __tests__/unit/Button.test.tsx
describe("Button Component", () => {
  it("should call onClick when clicked", async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    await userEvent.click(screen.getByRole("button"))
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### 3. **Storybook Visual Tests** (Storybook + Vitest)

- **Location**: `components/**/*.stories.tsx`
- **Tool**: Storybook + Vitest addon
- **Purpose**: Automated visual regression and accessibility testing
- **Run**: `pnpm test:storybook`

Example:

```tsx
// components/Button.stories.tsx
export const Primary: Story = {
  args: { primary: true, children: "Primary Button" },
}
```

### 4. **E2E Tests** (Playwright Browser)

- **Location**: `__tests__/e2e/**/*.test.ts`
- **Tool**: Vitest + Playwright
- **Purpose**: Test complete user workflows end-to-end
- **Run**: `pnpm test:e2e` (requires app running on localhost:3000)

Example:

```ts
// __tests__/e2e/navigation.test.ts
it("should navigate to timesheet page", async () => {
  await page.goto("http://localhost:3000")
  await page.locator('a:has-text("Timesheet")').click()
  await page.waitForURL("**/timesheets")
  expect(page.url()).toContain("/timesheets")
})
```

## Running Tests

```bash
# Run all tests
pnpm test

# Run only unit/component tests (fast)
pnpm test:unit

# Run only Storybook visual tests
pnpm test:storybook

# Run only E2E tests
pnpm test:e2e

# Run with watch mode (for development)
pnpm test -- --watch

# Generate coverage report
pnpm test:coverage
```

## Test Organization

```
__tests__/
├── unit/                 # Unit and component tests
│   ├── timeUtils.test.ts
│   └── Button.test.tsx
└── e2e/                  # End-to-end tests
    └── navigation.test.ts
```

## Best Practices

### Unit Tests

- **Test behavior, not implementation**: Focus on inputs and outputs
- **Keep tests isolated**: Each test should be independent
- **Use meaningful names**: Describe what the test does
- **Mock external dependencies**: Use `vi.mock()` for imports

```tsx
// ✅ Good
it("should calculate 30 minutes for 9:00 to 9:30", () => {
  const result = calculateTimeDifference(start, end)
  expect(result).toBe(30)
})

// ❌ Avoid
it("should work", () => {
  expect(calculateTimeDifference(start, end)).toBeTruthy()
})
```

### Component Tests

- **Test user perspective**: Use `getByRole()` instead of `getByTestId()`
- **Simulate user interactions**: Use `userEvent` for realistic interactions
- **Test accessibility**: Verify keyboard navigation and screen reader compatibility
- **Avoid implementation details**: Don't test React internals

```tsx
// ✅ Good
await userEvent.click(screen.getByRole("button", { name: "Submit" }))

// ❌ Avoid
wrapper.find("button").simulate("click")
```

### E2E Tests

- **Test critical user paths**: Focus on important features
- **Use realistic selectors**: Avoid overly specific CSS selectors
- **Handle waits properly**: Use `waitForURL()` and other appropriate waiters
- **Keep tests independent**: Avoid test interdependencies

```ts
// ✅ Good
await page.locator('a:has-text("Timesheet")').click()
await page.waitForURL("**/timesheets")

// ❌ Avoid
await page.click("a.nav-item-123")
await page.waitForTimeout(1000) // Flaky!
```

## Testing Library Setup

Your `vitest.setup.ts` includes:

- **@testing-library/jest-dom**: DOM matchers like `toBeInTheDocument()`
- **Next.js Router Mocks**: `useRouter()` and navigation mocks for testing
- **Automatic cleanup**: `afterEach()` cleanup to prevent test pollution

## Example Test Patterns

### Testing with Props Variations

```tsx
describe.each([
  { primary: true, expectedClass: "bg-teal-700" },
  { primary: false, expectedClass: "border-slate-200" },
])("Button with primary=$primary", ({ primary, expectedClass }) => {
  it("should render correctly", () => {
    const { container } = render(<Button primary={primary}>Test</Button>)
    expect(container.querySelector("button")).toHaveClass(expectedClass)
  })
})
```

### Testing Async Operations

```tsx
it("should load data", async () => {
  render(<TimeSheetComponent />)

  const data = await screen.findByText("Hours: 8")
  expect(data).toBeInTheDocument()
})
```

### Testing User Input

```tsx
it("should update on input change", async () => {
  const user = userEvent.setup()
  render(<Input />)

  const input = screen.getByRole("textbox")
  await user.type(input, "hello")

  expect(input).toHaveValue("hello")
})
```

## Debugging Tests

```bash
# Run with debugging UI
pnpm test -- --ui

# Run specific test file
pnpm test -- timeUtils.test.ts

# Run tests matching pattern
pnpm test -- --grep "Button"

# Verbose output
pnpm test -- --reporter=verbose
```

## Coverage Goals

Industry standards typically aim for:

- **Unit Tests**: 80-90% coverage
- **Component Tests**: 60-75% coverage for UI logic
- **E2E Tests**: Critical user paths (not exhaustive coverage)

Generate coverage with:

```bash
pnpm test:coverage
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Browser Context](https://playwright.dev/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

## Next Steps

1. Run `pnpm test:unit` to verify unit/component tests work
2. Run `pnpm test:storybook` to run visual tests on your stories
3. Start your app with `pnpm dev` and run `pnpm test:e2e` for E2E tests
4. Add more tests as you develop new features
