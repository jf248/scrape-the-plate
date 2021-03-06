from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view
from . import views


# DRF router and registered ViewSets
router = DefaultRouter()
router.register(r'groceryItems', views.GroceryItemViewSet,
                base_name='groceryItems')
router.register(r'groceryGroups', views.GroceryGroupViewSet,
                base_name='groceryGroups')
router.register(r'recipes', views.RecipeViewSet, base_name='recipes')
router.register(r'sources', views.SourceViewSet, base_name='sources')
router.register(r'books', views.BookViewSet, base_name='books')
router.register(r'users', views.UserViewSet, base_name='users')
router.register(r'tags', views.TagViewSet, base_name='tags')
router.register(r'auth', views.AuthViewSet, base_name='auth')

urlpatterns = [
    url(r'^schema/$', get_schema_view(title='Scrape-the-Plate API')),
    url(r'^api-auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    url(r'^scrape/$', views.scrape_view),
    url(r'^', include(router.urls)),
    url(r'^', views.not_found),
]
