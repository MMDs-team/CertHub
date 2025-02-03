from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from ..models import UserProfile
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

from django.contrib.auth.hashers import make_password
from ..serializers.user_serializers import  UserSerializer, UserSerializerWithToken
from typing import Dict, Any

@api_view(['POST'])
def login_user(request):
    data = request.data
    username = data['username']
    password = data['password']
    user = authenticate(username=username, password=password)

    if user is not None:
        pk = user.profile.id
        profile = UserProfile.objects.get(pk=pk)
        login(request, user)
        serializer = UserSerializerWithToken(profile, many=False)
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
        user = User.objects.create(
            first_name = data['first_name'],
            last_name = data['last_name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password']) 
        )
        
        user_profile = UserProfile.objects.create(
            user = user,
            organization = data['organization'],
        )
        
        serializer = UserSerializerWithToken(user_profile, many=False)
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

        if len(data['first_name']): user.user.first_name = data['first_name'],
        if len(data['last_name']): user.user.last_name = data['last_name'],
        if len(data['email']):
            user.user.email = data['email']
            user.user.username = data['email']
        if len(data['organization']): user.organization = data['organization'],
        if len(data['password']): user.user.password = make_password(data['password'])

        user.save()
        return Response(serializer.data)
    except:
        message = {'detail': 'Can not update profile! try again'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)