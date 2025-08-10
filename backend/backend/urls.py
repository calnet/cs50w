"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from banking import views as banking
from customers import views as customers
from django.contrib import admin
from django.urls import include, path, re_path
from ledgers import views as ledgers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from suppliers import views as suppliers

urlpatterns = [
    path("admin/", admin.site.urls),
    # JWT Authentication URLs
    path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/auth/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    re_path("^api/users/", include("users.urls")),
    re_path("^api/users/", include("django.contrib.auth.urls")),
    # Include transactions URLs
    path("", include("transactions.urls")),
    re_path("^api/customers/$", customers.customers_list),
    re_path("^api/suppliers/$", suppliers.suppliers_list),
    re_path("^api/banking/$", banking.banking_account_list),
    re_path("^api/layouts/$", ledgers.layouts, name="layouts_list"),
    re_path("^api/coa_layout/$", ledgers.coa_layout, name="coa_layout_list"),
    re_path("^api/coa_categories/$", ledgers.coa_categories),
    path("api/nominal_codes/<int:nominal_code>", ledgers.nominal_codes),
    path("api/nominal_codes/", ledgers.nominal_codes),
    path("api/nominal_types/<int:id>", ledgers.nominal_types),
    path("api/nominal_types/", ledgers.nominal_types),
]
