from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def send_auth_email(user, subject, html_content):
    try:
        email_from = settings.EMAIL_HOST_USER
        send_mail(subject, html_content, email_from, [user.email], fail_silently=False)
    except Exception as e:
        logger.error(f"Error sending email verification: {e}")
