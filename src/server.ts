import gracefulShutdown from 'http-graceful-shutdown';
import App from './app';
import IndexRoute from './index/index.route';
import BitcoinRoute from './bitcoins/bitcoin.route';
import UserRoute from './users/user.route';
const app = new App([new IndexRoute(), new BitcoinRoute(), new UserRoute()]);
const server = app.listen();

process.on('SIGINT', () => {});
process.on('SIGTERM', () => {});

gracefulShutdown(server,
  {
    signals: 'SIGINT SIGTERM',
    timeout: 10000,
    development: false,
    forceExit: true,
    finally: () => { console.info('Graceful shutdown')}
  }
);