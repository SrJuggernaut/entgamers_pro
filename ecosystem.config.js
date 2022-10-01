module.exports = {
  apps: [
    {
      name: process.env.APP_NAME || 'entgamers-website',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
        DISCORD_JOIN_WEBHOOK_URL: process.env.DISCORD_JOIN_WEBHOOK_URL
      }
    }
  ],

  deploy: {
    production: {
      user: process.env.SSH_USERNAME,
      host: process.env.DEPLOY_HOST,
      ref: 'origin/main',
      repo: 'https://github.com/SrJuggernaut/entgamers_pro',
      path: process.env.DEPLOY_PATH,
      'pre-deploy': 'yarn install && yarn run build',
      'post-deploy': 'pm2 startOrRestart ecosystem.config.js',
      env: {
        APP_NAME: process.env.APP_NAME,
        PORT: process.env.PORT,
        DISCORD_JOIN_WEBHOOK_URL: process.env.DISCORD_JOIN_WEBHOOK_URL
      }

    },
    preview: {
      user: process.env.SSH_USERNAME,
      host: process.env.DEPLOY_HOST,
      ref: 'origin/preview',
      repo: 'https://github.com/SrJuggernaut/entgamers_pro',
      path: process.env.DEPLOY_PATH,
      'pre-deploy': 'yarn install && yarn run build',
      'post-deploy': 'pm2 startOrRestart ecosystem.config.js',
      env: {
        APP_NAME: process.env.APP_NAME,
        PORT: process.env.PORT,
        DISCORD_JOIN_WEBHOOK_URL: process.env.DISCORD_JOIN_WEBHOOK_URL
      }
    }
  }
}
