from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import Template
from app.serializers.template_serializers import *


@api_view(['GET'])
def get_public_templates(request):
    templates = Template.objects.all().filter(is_public=True)
    serializers = TemplateSerializer(templates, many=True)
    
    return Response(serializers.data)