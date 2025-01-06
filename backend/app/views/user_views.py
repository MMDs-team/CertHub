from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from ..serializers.user_serializers import  UserSerializer, UserSerializerWithToken
from typing import Dict, Any

# token serializer
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
# @permission_classes([IsAdminUser])
def get_all_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAdminUser])
def get_single_user(request, pk):
    try:
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except :
        message = {'detail': 'No user found with this id'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def register_user(request):
    try:
        data = request.data
        user = User.objects.create(
            first_name = data['first_name'],
            last_name = data['last_name'],
            username = data['email'],
            email = data['email'],
            organization = data['organization'],
            password = make_password(data['password']) 
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Can not register user! try again'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    try:
        user = request.user
        data = request.data
        serializer = UserSerializerWithToken(user, many=False)

        user.first_name = data['first_name']
        user.last_name = data['last_name']
        user.email = data['email']
        user.username = data['email']
        user.organization = data['organization'],
        if data['password'] != '':
            user.password = make_password(data['password'])
        user.save()
        return Response(serializer.data)
    except:
        message = {'detail': 'Can update profile! try again'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)