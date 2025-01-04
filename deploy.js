const ghpages = require('gh-pages');
const path = require('path');

const buildPath = path.join(__dirname, 'build');
const tempPath = path.join('C:\List-Creation', 'gh-pages-temp');

ghpages.publish(buildPath, { dotfiles: true, temp: tempPath }, function(err) {
  if (err) {
    console.error('Deployment failed:', err);
  } else {
    console.log('Deployment successful!');
  }
});