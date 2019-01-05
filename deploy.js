const { ftpPassword: password, ftpUsername: user } = require('./secret-config')
const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();
 
var config = {
    user, 
    password, 
    host: "ftp.wunnle.com",
    port: 21,
    localRoot: __dirname + '/build',
    remoteRoot: '/blog',
    // include: ['*', '**/*'], 
    include: ['*'],
    exclude: ['dist/**/*.map'],
    deleteRemote: true,        
    forcePasv: true            
}
 
// use with promises
ftpDeploy.deploy(config)
    .then(res =>  console.log('finished:', res))
    .catch(err => console.log(err))