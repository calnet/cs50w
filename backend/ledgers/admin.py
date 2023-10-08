from django.contrib import admin
from .models import CoaLayout, CoaCategory, NominalType, NominalCode

# Register your models here.
admin.site.register(CoaLayout)
admin.site.register(CoaCategory)
admin.site.register(NominalType)
admin.site.register(NominalCode)
