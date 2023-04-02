module.exports = {
  apps : [{
    script: 'npm start',
  }],

  deploy : {
    production : {
      user : 'root',
      host : '103.190.28.232',
      ref  : 'origin/main',
      repo : 'git@github.com:rizaldwi1922/next-ciimonitoring.git',
      path : '/home/next-ciimonitoring',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
