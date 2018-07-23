from django.db.models import Q
from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter

from . import models


class SearchFilter(SearchFilter):
    """
    A Filter backend
    """
    pass


class DjangoFilterBackend(filters.DjangoFilterBackend):
    """
    A Filter backend
    """
    pass


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


class NumberInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class GroceryGroupFilter(filters.FilterSet):
    id = ListFilter(name='id')
    name = ListFilter(name='name')

    class Meta:
        model = models.GroceryGroup
        fields = ['name', 'id']


class RecipeFilter(filters.FilterSet):
    id = NumberInFilter(name='id', lookup_expr='in')

    class Meta:
        model = models.Recipe
        fields = ()
