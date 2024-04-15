# Generated by Django 4.2.10 on 2024-04-15 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isbn', models.CharField(max_length=13)),
                ('title', models.CharField(max_length=120)),
                ('publisher', models.CharField(max_length=100)),
                ('author', models.CharField(max_length=150)),
                ('copies', models.IntegerField()),
                ('borrowable', models.BooleanField()),
            ],
        ),
    ]
