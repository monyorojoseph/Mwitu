from django.shortcuts import get_object_or_404
from rest_framework import serializers
from .models import Site, Review
from taggit.models import Tag
from taggit.serializers import (TagListSerializerField, TaggitSerializer)

class CreateSiteSerializer(serializers.Serializer):
    cover_image = serializers.ImageField()
    logo = serializers.ImageField()
    name = serializers.CharField()
    url = serializers.URLField()
    about = serializers.JSONField()
    tags = serializers.CharField()

    def create(self, validated_data):
        # extract tags and split them
        tags = validated_data.pop('tags', None)
        newSite = Site.objects.create(**validated_data)
        if tags:
            tags = tags.split(' ')
            site = get_object_or_404(Site, id=newSite.id)
            site.tags.add(*tags)
        return site

class ListSiteSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = Site
        fields = ['slug', 'name', 'logo', 'total_reviews', 'avg_rating', 'tags']

class SiteSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()
    class Meta:
        model = Site
        fields = ['slug', 'name', 'logo', 'cover_image', 'url', 'about', 'total_reviews', 'avg_rating', 'tags']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'full_name', 'image', 'comment', 'timestamp', 'rating', 'upvotes', 'downvotes']

class PostReviewSerializer(serializers.Serializer):
    comment = serializers.JSONField()
    rating = serializers.IntegerField()
    site_id = serializers.CharField()

    def create(self, validated_data):
        return Review.objects.create(**validated_data)

class CustomTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag 
        fields = ['name']