from django.db import models
from django.contrib.auth.models import User

class Template(models.Model):
    template_id = models.AutoField(primary_key=True, editable=False)

    image = models.ImageField(upload_to="templates/images", blank=True)
    file = models.FileField(upload_to="templates/files")

    is_public = models.BooleanField(default=False, blank=True)
    usage = models.PositiveIntegerField(default=0, blank=True)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='template_owner', null=True, blank=True)

    is_active = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return f"Template {self.template_id} - {self.file.name}"