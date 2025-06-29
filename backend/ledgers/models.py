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
        return f"{self.type_name} ({self.coa_category})"

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
        return f"{self.nominal_code} - {self.nominal_name}"

    class Meta:
        verbose_name_plural = "Nominal Codes"


class CoaLayout(models.Model):
    # Add ForeignKey to link CoaLayout to Layout model
    layout = models.ForeignKey(
        'Layout',  # The name of the model you want to link
        # Cascade delete (delete CoaLayout if Layout is deleted)
        on_delete=models.CASCADE,
        related_name='coa_layouts',  # Name to access related CoaLayouts from Layout
    )

    # Add ForeignKey to link CoaLayout to NominalType model
    nominal_type = models.ForeignKey(
        'NominalType',  # The name of the model you want to link
        # Cascade delete (delete CoaLayout if NominalType is deleted)
        on_delete=models.CASCADE,
        related_name='coa_layouts',  # Name to access related CoaLayouts from NominalType
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
        # Return a string representation of the CoaLayout instance
        # This will include the nominal type and the range of nominal codes
        return f"{self.nominal_type.type_name} ({self.nominal_code_min} - {self.nominal_code_max})"

    class Meta:
        verbose_name_plural = "Coa Layouts"
