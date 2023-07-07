export const authHeader = {
    authroization: document.cookie
      .split('; ')
      .find((row) => row.startsWith('authorizationToken='))
      ?.split('=')[1] as string,
}