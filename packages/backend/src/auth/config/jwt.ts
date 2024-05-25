import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import appConfig from './app';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: appConfig().appSecret,
      signOptions: { expiresIn: 60 * 15 },
    }
  }
};
