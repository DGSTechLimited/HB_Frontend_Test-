// Note: Authentication is handled via HTTP-only cookies set by the backend
// We cannot access the token from JavaScript for security reasons

// Token management functions are kept for API compatibility but are no-ops
export const getToken = (): string | null => null;

export const setToken = (_value: string): void => {
  // No-op: Token is set as HTTP-only cookie by backend
};

export const removeToken = (): void => {
  // No-op: Token removal is handled by logout endpoint
};

// Check if user is authenticated by checking if we can make an authenticated request
// This should be used with a /me or similar endpoint
export const isAuthenticated = (): boolean => {
  // We cannot reliably check from client side with HTTP-only cookies
  // This should be checked via API call to /me endpoint in middleware
  return true; // Return true to allow middleware to handle with API call
};
