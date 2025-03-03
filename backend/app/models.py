from django.db import models
from django.contrib.auth import get_user_model 
from django.contrib.auth.models import AbstractUser

class UserProfile(AbstractUser):
    organization = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.username} - {self.organization or 'No Organization'}"

class Template(models.Model):
    template_id = models.AutoField(primary_key=True, editable=False)

    image = models.ImageField(upload_to="templates/images", blank=True, null=True)
    file = models.FileField(upload_to="templates/files", blank=True)

    is_public = models.BooleanField(default=False, blank=True)
    usage = models.PositiveIntegerField(default=0, blank=True)
    owner = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, related_name='template_owner', null=True, blank=True)

    is_active = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return f"Template {self.template_id} - {self.file.name}"
