export const authingConfig = {
  appId: process.env.AUTHING_APP_ID || '',
  appSecret: process.env.AUTHING_APP_SECRET || '',
  domain: process.env.AUTHING_DOMAIN || '',
  redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
  scope: 'openid profile email phone',
};

export const nextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET || '',
};