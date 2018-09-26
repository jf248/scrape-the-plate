from rest_framework import status, viewsets, exceptions, generics
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import action, api_view
from rest_framework.exceptions import ParseError, PermissionDenied
from rest_framework.response import Response
from rest_framework.settings import api_settings

from . import serializers, permissions, models, filters, pagination
import scraper


class GetObjectAllMixin():
    """
    A mixin that provides an override of the get_object method. Useful when we
    want both a filtered get_queryset but also want the get_object method to
    provide 401 (unauthorized) and 403 (forbidden) errors not just 404 (not
    found).
    """

    # Must provide a model class
    model_class = None

    def get_object(self):
        """
        Overried rest_framework.generics.GenericAPIView get_object method which
        uses the self.get_queryset(). This would result in 404 errors rather
        than 401 or 403 errors if the object exists but user doesn't have
        permission.
        """
        # Here's the only change: objects.all() instead of self.get_queryset()
        assert self.model_class is not None, (
            "'%s' did not set model_class"
            % self.__class__.__name__
        )
        queryset = self.filter_queryset(self.model_class.objects.all())

        # Perform the lookup filtering.
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
            'Expected view %s to be called with a URL keyword argument '
            'named "%s". Fix your URL conf, or set the `.lookup_field` '
            'attribute on the view correctly.' %
            (self.__class__.__name__, lookup_url_kwarg)
        )

        filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
        obj = generics.get_object_or_404(queryset, **filter_kwargs)

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj


class CreateWithUserMixin():
    # Based on rest_framework's CreateModelMixin but adds user from the request
    def create(self, request, *args, **kwargs):
        data = request.data
        data['user'] = request.user.pk
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}


class GroceryItemViewSet(CreateWithUserMixin, GetObjectAllMixin,
                         viewsets.ModelViewSet):
    model_class = models.GroceryItem
    serializer_class = serializers.GroceryItemSerializer
    filter_backends = (filters.DjangoFilterBackend, filters.OrderingFilter)
    filter_fields = ('id', 'name',)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          permissions.IsOwnerOrReadOnly,)
    ordering_fields = ('name', 'group__name')

    def get_queryset(self):
        user = self.request.user
        return self.model_class.filter_user_and_None(user)


class GroceryGroupViewSet(CreateWithUserMixin, GetObjectAllMixin,
                          viewsets.ModelViewSet):
    model_class = models.GroceryGroup
    serializer_class = serializers.GroceryGroupSerializer
    filter_class = filters.GroceryGroupFilter
    filter_backends = (filters.DjangoFilterBackend,)
    search_fields = ('name', 'id',)
    pagination_class = pagination.CustomPagination
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          permissions.IsOwnerOrReadOnly,)

    def get_queryset(self):
        user = self.request.user
        return self.model_class.filter_user_and_None(user)


class SourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Source.objects.all()
    serializer_class = serializers.SourceSerializer
    pagination_class = pagination.CustomPagination


class BookViewSet(CreateWithUserMixin, GetObjectAllMixin,
                  viewsets.ModelViewSet):
    model_class = models.Book
    serializer_class = serializers.BookSerializer
    pagination_class = pagination.CustomPagination
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          permissions.IsOwnerOrReadOnly,)

    def get_queryset(self):
        user = self.request.user
        return self.model_class.filter_user(user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    pagination_class = pagination.CustomPagination


class RecipeViewSet(CreateWithUserMixin, GetObjectAllMixin,
                    viewsets.ModelViewSet):
    model_class = models.Recipe
    serializer_class = serializers.RecipeSerializer
    pagination_class = pagination.CustomPagination
    filter_class = filters.RecipeFilter
    filter_backends = (filters.SearchFilter, filters.DjangoFilterBackend)
    search_fields = ('title',)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          permissions.IsOwnerOrIsPublic,
                          permissions.IsOwnerOrReadOnly,)

    def get_queryset(self):
        user = self.request.user
        return self.model_class.filter_user_and_public(user)


class AuthViewSet(viewsets.ViewSet):
    serializer_class = serializers.AuthSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def _get_response_data(self, user, token=None):
        serializer = self.serializer_class(user)
        data = {**serializer.data}
        if token:
            data['token'] = token.key
        return data

    def _get_username_from_email(self, data):
        # Need a username, if email supplied use that
        if data.get('username') is None:
            data['username'] = data.get('email')

    @action(methods=['post'], detail=False)
    def verify(self, request):
        user = request.user
        if user and user.is_authenticated:
            token = Token.objects.get(user=user)
            data = self._get_response_data(user, token)
            return Response(data)
        raise PermissionDenied()

    @action(methods=['post'], detail=False)
    def signup(self, request):
        self._get_username_from_email(request.data)
        serializer = self.serializer_class(
            data=request.data, context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        data = self._get_response_data(user, token)
        return Response(data)

    @action(methods=['post'], detail=False)
    def login(self, request):
        self._get_username_from_email(request.data)
        serializer = AuthTokenSerializer(
            data=request.data, context={'request': request}
        )

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        data = self._get_response_data(user, token)
        return Response(data)


class TagViewSet(CreateWithUserMixin, GetObjectAllMixin,
                 viewsets.ModelViewSet):
    model_class = models.Tag
    serializer_class = serializers.TagSerializer
    pagination_class = pagination.CustomPagination
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          permissions.IsOwnerOrReadOnly,)

    def get_queryset(self):
        user = self.request.user
        return self.model_class.filter_user(user)


@api_view(['GET'])
def scrape_view(request):
    """
    Handles submission and asyncValidate for step 1 of creating recipes wizard

    Args:
        request: A GET request with a 'url' query param.
    Returns:
        A HTTP response with JSON body of scraped data
        {
            "title": String, "source": Number, "domain_name": String,
            "url": String, "serves": Number, "ingredients": Object[],
            "preparation": String[]
        }

    Raises:
        ParseError
    """
    url = request.query_params.get('url', None)
    if url is None:
        raise ParseError({"url": "Url required, or choose manual entry."})
    try:
        dict_ = scraper.scrape(url)
        source_id = models.Source.get_id_from_domain_name(dict_['domain'])
        dict_['source'] = source_id
        return Response(dict_)
    except (
        scraper.exceptions.InvalidURLError,
        scraper.exceptions.URLError,
        scraper.exceptions.WebsiteNotImplementedError
    ) as err:
        raise ParseError(
            {"url": err}
        )
    except (scraper.exceptions.RequestException) as err:
        raise ParseError(
            err
        )


@api_view(['GET', 'POST', 'PATCH', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'])
def not_found(request):
    raise exceptions.NotFound()
