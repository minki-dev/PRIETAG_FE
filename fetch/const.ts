export function getAccessToken() {
    if (typeof window !== 'undefined'){
      return  document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1] as string
    }
    else {
      return ""
    }
}

export const BASE_URL = 'https://ezfee.site/api/'