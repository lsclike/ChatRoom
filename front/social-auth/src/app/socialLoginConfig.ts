import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([{
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('581790841448-6ue7vno5n9n3rqvpu7jkaam8703m7llt.apps.googleusercontent.com')
  }]);

  return config;
}
