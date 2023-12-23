# Generated by Django 4.2 on 2023-10-09 22:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("ledgers", "0004_rename_coalayout_layout_alter_layout_options_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="CoaLayout",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "nominal_codes_min",
                    models.DecimalField(
                        decimal_places=0, max_digits=4, verbose_name="nominal code min"
                    ),
                ),
                (
                    "nominal_codes_max",
                    models.DecimalField(
                        decimal_places=0, max_digits=4, verbose_name="nominal code max"
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "layout",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="coa_layout_layout",
                        to="ledgers.layout",
                    ),
                ),
                (
                    "nominal_type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="coa_layout_nominal_type",
                        to="ledgers.nominaltype",
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Coa Layouts",
            },
        ),
    ]