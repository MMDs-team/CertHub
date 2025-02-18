from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from ..models import UserProfile
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

from django.contrib.auth.hashers import make_password
from ..serializers.user_serializers import  UserSerializer, UserSerializerWithToken
from typing import Dict, Any

@api_view(['POST'])
def login_user(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')
    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    else:
        message = {'detail': 'invalid username or password!'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
# @permission_classes([IsAdminUser])
def get_all_users(request):
    users = UserProfile.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAdminUser])
def get_single_user(request, pk):
    try:
        user = UserProfile.objects.get(pk=pk)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'No user found with this id'}
        return Response(message, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def register_user(request):
    try:
        data = request.data
        user = UserProfile.objects.create(
            first_name = data.get('first_name'),
            last_name = data.get('last_name'),
            username = data.get('email'),
            email = data.get('email'),
            organization = data.get('organization'),
            password = make_password(data.get('password')) 
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

        if data.get('first_name'): user.user.first_name = data.get('first_name'),
        if data.get('last_name'): user.user.last_name = data.get('last_name'),
        if data.get('email'):
            user.user.email = data.get('email')
            user.user.username = data.get('email')
        if data.get('organization'): user.organization = data.get('organization'),
        if data.get('password'): user.user.password = make_password(data.get('password'))

        user.save()
        return Response(serializer.data)
    except:
        message = {'detail': 'Can not update profile! try again'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)