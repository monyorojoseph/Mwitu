from rest_framework import serializers
from .models import Site, Review, Rating

class CreateSiteSerializer(serializers.Serializer):
    image = serializers.ImageField()
    name = serializers.CharField()
    url = serializers.URLField()
    about = serializers.CharField()

    def create(self, validated_data):
        print(validated_data)
        return Site.objects.create(**validated_data)