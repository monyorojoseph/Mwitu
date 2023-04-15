from rest_framework import serializers
from .models import Site, Review

class CreateSiteSerializer(serializers.Serializer):
    cover_image = serializers.ImageField()
    name = serializers.CharField()
    url = serializers.URLField()
    about = serializers.CharField()

    def create(self, validated_data):
        print(validated_data)
        return Site.objects.create(**validated_data)

class ListSiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = ['id', 'name', 'cover_image']

class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = ['name', 'cover_image', 'url']