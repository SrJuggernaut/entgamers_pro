module.exports = {
  apps: [
    {
      name: process.env.APP_NAME,
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000
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
      'pre-deploy': 'npm install && npm run build',
      'post-deploy': 'sudo pm2 startOrRestart ecosystem.config.js',
      env: {
        ...process.env
      }

    },
    preview: {
      user: process.env.SSH_USERNAME,
      host: process.env.DEPLOY_HOST,
      ref: 'origin/preview',
      repo: 'https://github.com/SrJuggernaut/entgamers_pro',
      path: process.env.DEPLOY_PATH,
      'pre-deploy': 'npm install && npm run build',
      'post-deploy': 'sudo pm2 startOrRestart ecosystem.config.js',
      env: {
        ...process.env
      }
    }
  }
}
