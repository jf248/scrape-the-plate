# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-01 00:02
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='group',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='recipes.IngredientGroup'),
            preserve_default=False,
        ),
    ]
