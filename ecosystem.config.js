module.exports = {
  apps: [
    {
      name: process.env.APP_NAME || 'entgamers-website',
      script: 'bun',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
        NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
        NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        APPWRITE_API_KEY: process.env.APPWRITE_API_KEY,
        SITE_NAME: process.env.SITE_NAME,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        IMAGE_DOMAINS: process.env.IMAGE_DOMAINS
      }
    }
  ],

  deploy: {
    production: {
      user: process.env.SSH_USERNAME,
      host: process.env.DEPLOY_HOST,
      ref: 'origin/production',
      repo: 'https://github.com/SrJuggernaut/entgamers_pro',
      path: process.env.DEPLOY_PATH,
      'post-deploy': 'pm2 --silent startOrRestart ecosystem.config.js',
      env: {
        PORT: process.env.PORT,
        NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
        NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        APPWRITE_API_KEY: process.env.APPWRITE_API_KEY,
        SITE_NAME: process.env.SITE_NAME,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        IMAGE_DOMAINS: process.env.IMAGE_DOMAINS
      }

    },
    preview: {
      user: process.env.SSH_USERNAME,
      host: process.env.DEPLOY_HOST,
      ref: 'origin/preview',
      repo: 'https://github.com/SrJuggernaut/entgamers_pro',
      path: process.env.DEPLOY_PATH,
      'post-deploy': 'pm2 --silent startOrRestart ecosystem.config.js',
      env: {
        PORT: process.env.PORT,
        NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
        NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        APPWRITE_API_KEY: process.env.APPWRITE_API_KEY,
        SITE_NAME: process.env.SITE_NAME,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        IMAGE_DOMAINS: process.env.IMAGE_DOMAINS
      }
    }
  }
}
