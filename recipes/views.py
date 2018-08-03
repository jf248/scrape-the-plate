from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import action, api_view
from rest_framework.exceptions import ParseError, PermissionDenied
from rest_framework.response import Response
from rest_framework.settings import api_settings

from . import serializers, permissions, models, filters, pagination
from scraper import scrape
from scraper.exceptions import (
    InvalidURLError, URLError, WebsiteNotImplementedError, RequestException
)


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


class GroceryItemViewSet(viewsets.ModelViewSet):
    queryset = models.GroceryItem.objects.all()
    serializer_class = serializers.GroceryItemSerializer
    filter_backends = (filters.DjangoFilterBackend)
    filter_fields = ('id', 'name',)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          permissions.IsOwnerOrReadOnly,)


class GroceryGroupViewSet(viewsets.ModelViewSet):
    queryset = models.GroceryGroup.objects.all()
    serializer_class = serializers.GroceryGroupSerializer
    filter_backends = (filters.SearchFilter, filters.DjangoFilterBackend)
    search_fields = ('name', 'id',)
    filter_class = filters.GroceryGroupFilter
    pagination_class = pagination.CustomPagination
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          permissions.IsOwnerOrReadOnly,)


class SourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Source.objects.all()
    serializer_class = serializers.SourceSerializer
    pagination_class = pagination.CustomPagination


class BookViewSet(CreateWithUserMixin, viewsets.ModelViewSet):
    serializer_class = serializers.BookSerializer
    pagination_class = pagination.CustomPagination
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          permissions.IsOwnerOrReadOnly,)

    def get_queryset(self):
        user = self.request.user
        return models.Book.objects.filter(user=user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer
    pagination_class = pagination.CustomPagination


class RecipeViewSet(CreateWithUserMixin, viewsets.ModelViewSet):
    serializer_class = serializers.RecipeSerializer
    pagination_class = pagination.CustomPagination
    filter_class = filters.RecipeFilter
    filter_backends = (filters.SearchFilter, filters.DjangoFilterBackend)
    search_fields = ('title',)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          permissions.IsOwnerOrReadOnly,)

    def get_queryset(self):
        user = self.request.user
        return models.Recipe.get_user_and_public_recipes(user)


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


class TagViewSet(CreateWithUserMixin, viewsets.ModelViewSet):
    serializer_class = serializers.TagSerializer
    pagination_class = pagination.CustomPagination
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          permissions.IsOwnerOrReadOnly,)

    def get_queryset(self):
        user = self.request.user
        return models.Tag.objects.filter(user=user)


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
        dict_ = scrape(url)
        source_id = models.Source.get_id_from_domain_name(dict_['domain'])
        dict_['source'] = source_id
        return Response(dict_)
    except (InvalidURLError, URLError, WebsiteNotImplementedError) as err:
        raise ParseError(
            {"url": err}
        )
    except (RequestException) as err:
        raise ParseError(
            err
        )
