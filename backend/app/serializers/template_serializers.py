from rest_framework import serializers
from app.models import Template
from app.serializers.UserSerializers import SimpleUserSerializer

class TemplateSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField(read_only=True)

    def get_owner(self, obj):
        user = obj.owner
        serializer = SimpleUserSerializer(user, many=False)

        return serializer.data if user else {}

    class Meta:
        model = Template
        fields = [
            'template_id',
            'image',
            'file',
            'is_public',
            'usage',
            'owner',
            'is_active',
        ]
