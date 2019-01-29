import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import {environment} from '../environments/environment';

export function getAuthServiceConfigs() {
  // configuration for authentication
  const config = new AuthServiceConfig([{
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.GoogleClientId)
  }]);

  return config;
}
