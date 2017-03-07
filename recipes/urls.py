from django.conf.urls import url, include
from django.urls import reverse_lazy
from . import views
from django.contrib.auth import views as auth_views

extra_patterns = [
    url(r'^$', views.recipe_detail, name='recipe_detail'),
    url(r'^edit/$', views.recipe_edit, name='recipe_edit'),
    url(r'^mark/$', views.recipe_mark, name='recipe_mark'),
]

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^about/$', views.AboutView.as_view(), name='about'),
    url(r'^(?P<slug>[-\w]+)/', include(extra_patterns)),
]

# registration urls, copied from registration.auth_urls.py

