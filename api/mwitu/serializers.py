from rest_framework import serializers
from .models import Site, Review
from taggit.models import Tag
from taggit.serializers import (TagListSerializerField, TaggitSerializer)

class CreateSiteSerializer(serializers.Serializer):
    cover_image = serializers.ImageField()
    name = serializers.CharField()
    url = serializers.URLField()
    about = serializers.CharField()
    tags = serializers.ListField(
        child=serializers.CharField()
    )

    def create(self, validated_data):
        return Site.objects.create(**validated_data)

class ListSiteSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = Site
        fields = ['id', 'name', 'logo', 'total_reviews', 'avg_rating', 'tags']

class SiteSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = Site
        fields = ['name', 'logo', 'cover_image', 'url', 'about', 'total_reviews', 'avg_rating', 'tags']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'full_name', 'image', 'comment', 'timestamp', 'rating', 'upvotes', 'downvotes']

class PostReviewSerializer(serializers.Serializer):
    comment = serializers.CharField()
    rating = serializers.IntegerField()
    site_id = serializers.CharField()

    def create(self, validated_data):
        return Review.objects.create(**validated_data)

class CustomTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag 
        fields = ['name']