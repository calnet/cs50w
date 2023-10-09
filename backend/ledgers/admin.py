from django.contrib import admin
from .models import Layout, CoaCategory, NominalType, NominalCode, CoaLayout

# Register your models here.
admin.site.register(Layout)
admin.site.register(CoaLayout)
admin.site.register(CoaCategory)
admin.site.register(NominalType)
admin.site.register(NominalCode)
