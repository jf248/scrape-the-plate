from django.conf.urls import url, include
from . import views


recipe_patterns = [
    url(r'^$', views.RecipeDetail.as_view(), name='recipe_detail'),
    # url(r'^edit/$', views.recipe_edit, name='recipe_edit'),
    url(r'^mark/$', views.recipe_mark, name='recipe_mark'),
]

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^about/$', views.AboutView.as_view(), name='about'),
    url(r'^scrape/$', views.scrape_view),
    url(r'^scrape/(?P<step>[1-3]{1})/$', views.scrape_view, name='scrape'),
    url(r'^ingredient/', include(views.IngredientViews.urls())),
    url(r'^(?P<slug>[-\w]+)/', include(recipe_patterns)),
]

