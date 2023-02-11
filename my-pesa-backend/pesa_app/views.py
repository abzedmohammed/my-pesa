from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets, parsers
from .models import *
from .serializers import *

class ImageViewset(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    http_method_names = ['get', 'post', 'patch', 'delete']