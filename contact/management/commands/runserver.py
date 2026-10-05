from django.conf import settings
from django.core.management.commands.runserver import Command as RunserverCommand


class Command(RunserverCommand):
    """`python manage.py runserver` listens on PORT from .env (5000) instead of 8000."""

    default_port = str(settings.PORT)
