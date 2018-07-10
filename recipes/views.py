from django.db.models import Q
from django_filters import rest_framework as filters
from rest_framework import viewsets, permissions
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import action, api_view
from rest_framework.exceptions import ParseError, PermissionDenied
from rest_framework.filters import SearchFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from . import serializers
from .models import GroceryGroup, GroceryItem, Recipe
from .models import Source, Tag
from scraper import scrape
from scraper.exceptions import (
    InvalidURLError, URLError, WebsiteNotImplementedError, RequestException
)


class ListFilter(filters.Filter):
    def __init__(self, integer=False, **kwargs):
        super(ListFilter, self).__init__(**kwargs)
        if integer:
            self.filter_value_fn = lambda x: int(x)
        else:
            self.filter_value_fn = lambda x: x

    def sanitize(self, value_list):
        return [v for v in value_list if v != ""]

    def filter(self, qs, value):
        values = value.split(",")
        values = self.sanitize(values)
        f = Q()
        for v in values:
            kwargs = {self.name: v}
            f = f | Q(**kwargs)
        return qs.filter(f)


class CustomPagination(PageNumberPagination):
    page_size_query_param = 'page_size'


class GroceryGroupFilter(filters.FilterSet):
    id = ListFilter(name='id')
    name = ListFilter(name='name')

    class Meta:
        model = GroceryGroup
        fields = ['name', 'id']


class GroceryItemViewSet(viewsets.ModelViewSet):
    queryset = GroceryItem.objects.all()
    serializer_class = serializers.GroceryItemSerializer
    # filter_fields=('id', 'name',)
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly,)


class GroceryGroupViewSet(viewsets.ModelViewSet):
    queryset = GroceryGroup.objects.all()
    serializer_class = serializers.GroceryGroupSerializer
    search_fields = ('name', 'id',)
    filter_class = GroceryGroupFilter
    pagination_class = CustomPagination
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,
    #                       IsOwnerOrReadOnly,)


class SourceViewSet(viewsets.ModelViewSet):
    queryset = Source.objects.all()
    serializer_class = serializers.SourceSerializer
    pagination_class = CustomPagination


class NumberInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class RecipeFilter(filters.FilterSet):
    id = NumberInFilter(name='id', lookup_expr='in')

    class Meta:
        model = Recipe
        fields = ('id',)


class RecipeViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.RecipeSerializer
    pagination_class = CustomPagination
    filter_class = RecipeFilter
    filter_backends = (SearchFilter, )
    search_fields = ('title',)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Recipe.get_user_and_public_recipes(user)


class AuthViewSet(viewsets.ViewSet):
    serializer_class = serializers.UserSerializer
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


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = serializers.TagSerializer
    pagination_class = CustomPagination


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
        source_id = Source.get_id_from_domain_name(dict_['domain'])
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
