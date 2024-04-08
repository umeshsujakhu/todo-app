import { config as prodConfig } from './prod';
import { config as devConfig } from './dev';

let config: typeof prodConfig | typeof devConfig;

if (process.env.NODE_ENV === 'production') {
  config = prodConfig;
} else {
  config = devConfig;
}

export { config };
