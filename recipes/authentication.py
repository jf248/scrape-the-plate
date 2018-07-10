from rest_framework import authentication, exceptions


class CustomTokenAuthentication(authentication.TokenAuthentication):
    def authenticate_credentials(self, key):
        try:
            token = self.model.objects.select_related('user').get(key=key)
        except self.get_model().DoesNotExist:
            return (None, '')

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed('User inactive or deleted.')

        return (token.user, token)
