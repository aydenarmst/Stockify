# Generated by Django 4.2.4 on 2023-08-26 22:21

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_remove_blend_etfnames_blend_created_at_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blend',
            name='created_at',
        ),
        migrations.AddField(
            model_name='blend',
            name='ETFTickers',
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='blend',
            name='host',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.DeleteModel(
            name='ETF',
        ),
    ]
