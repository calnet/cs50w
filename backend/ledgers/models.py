from django.db import models

# Create your models here.


class Layout(models.Model):
    layout_name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.layout_name

    class Meta:
        verbose_name_plural = "Layouts"


class CoaCategory(models.Model):
    category_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.category_name

    class Meta:
        verbose_name_plural = "Coa Categories"


class NominalType(models.Model):
    type_name = models.CharField(max_length=255)
    coa_category = models.ForeignKey(
        CoaCategory,
        on_delete=models.CASCADE,
        related_name='coa_category',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.type_name

    class Meta:
        verbose_name_plural = "Nominal Types"


class NominalCode(models.Model):
    layout = models.ForeignKey(
        Layout, on_delete=models.CASCADE, related_name='layout'
    )
    nominal_code = models.DecimalField(
        'nominal code', max_digits=4, decimal_places=0
    )
    nominal_type = models.ForeignKey(
        NominalType, on_delete=models.CASCADE, related_name='nominal_type'
    )
    nominal_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nominal_code

    class Meta:
        verbose_name_plural = "Nominal Codes"


class CoaLayout(models.Model):
    layout = models.ForeignKey(
        Layout, on_delete=models.CASCADE, related_name='coa_layout_layout'
    )
    nominal_type = models.ForeignKey(
        NominalType, on_delete=models.CASCADE, related_name='coa_layout_nominal_type'
    )

    nominal_code_min = models.DecimalField(
        'nominal code min', max_digits=4, decimal_places=0
    )
    nominal_code_max = models.DecimalField(
        'nominal code max', max_digits=4, decimal_places=0
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.layout

    class Meta:
        verbose_name_plural = "Coa Layouts"
