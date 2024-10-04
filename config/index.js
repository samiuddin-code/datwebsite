const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? 'http://192.254.219.230:5011/web-api/v1.0/' : 'https://yourwebsite.com'
