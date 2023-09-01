# Generated by Django 4.2.4 on 2023-09-01 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='etfholding',
            name='cusip',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='etfholding',
            name='fx_rate',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='etfholding',
            name='isin',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='etfholding',
            name='market_value',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='etfholding',
            name='maturity',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='etfholding',
            name='notional_value',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='etfholding',
            name='price',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='etfholding',
            name='sedol',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='etfholding',
            name='shares',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='etfholding',
            name='ticker',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='etfholding',
            name='weight',
            field=models.CharField(max_length=100),
        ),
    ]
