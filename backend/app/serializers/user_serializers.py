from rest_framework_simplejwt.tokens import RefreshToken
from ..models import UserProfile
from django.contrib.auth import get_user_model
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    organization = serializers.SerializerMethodField(read_only=True)

    isAdmin = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    email = serializers.SerializerMethodField(read_only=True)
    first_name = serializers.SerializerMethodField(read_only=True)
    last_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'isAdmin', 'organization']

    def get_organization(self, obj):
        return obj.organization 

    def get_isAdmin(self, obj):
        return obj.user.is_staff

    def get_username(self, obj):
        return obj.user.username 

    def get_email(self, obj):
        return obj.user.email 

    def get_first_name(self, obj):
        return obj.user.first_name 

    def get_last_name(self, obj):
        return obj.user.last_name 


class UserSerializerWithToken(UserSerializer):
    organization = serializers.SerializerMethodField(read_only=True)
    token = serializers.SerializerMethodField(read_only=True)

    isAdmin = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    email = serializers.SerializerMethodField(read_only=True)
    first_name = serializers.SerializerMethodField(read_only=True)
    last_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'organization', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

    def get_organization(self, obj):
        return obj.organization 

    def get_isAdmin(self, obj):
        return obj.user.is_staff

    def get_username(self, obj):
        return obj.user.username 

    def get_email(self, obj):
        return obj.user.email 

    def get_first_name(self, obj):
        return obj.user.first_name 

    def get_last_name(self, obj):
        return obj.user.last_name 
