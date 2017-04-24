const log4js = require('log4js');
const logger = log4js.getLogger('heartbeat');
const config = appRequire('services/config').all();

const checkAccount = appRequire('plugins/account/checkAccount');
const shadowsocksServices = undefined;
if (config.type === 's') {
  shadowsocksServices = appRequire('services/shadowsocks');
}

const beatForever = () => {
  checkAccount.handleInterval();
  console.log(JSON.stringify(config, null, 2));
  if (shadowsocksServices !== undefined) {
    shadowsocksServices.handleInterval();
  }

  logger.info("System is running OK");
  setTimeout(beatForever, 5000);
};

beatForever();