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
from django.contrib import admin
from django.urls import path, re_path, include

from suppliers import views as suppliers
from customers import views as customers
from banking import views as banking
from ledgers import views as ledgers


urlpatterns = [
    path("admin/", admin.site.urls),

    re_path("^api/users/", include("users.urls")),
    re_path("^api/users/", include("django.contrib.auth.urls")),

    re_path("^api/customers/$", customers.customers_list),

    re_path("^api/suppliers/$", suppliers.suppliers_list),

    re_path("^api/banking/$", banking.banking_account_list),

    re_path("^api/coa_layouts/$", ledgers.coa_layouts),
    re_path("^api/coa_categories/$", ledgers.coa_categories),
    re_path("^api/nominal_types/$", ledgers.nominal_types),
    re_path("^api/nominal_codes/$", ledgers.nominal_codes),

]
