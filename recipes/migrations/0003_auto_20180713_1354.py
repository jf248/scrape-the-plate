# Generated by Django 2.0.6 on 2018-07-13 20:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_auto_20180710_0956'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='slug',
            field=models.SlugField(
                editable=False, max_length=255, unique=True),
        ),
    ]