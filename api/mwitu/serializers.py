from rest_framework import serializers
from .models import Site, Review

class CreateSiteSerializer(serializers.Serializer):
    cover_image = serializers.ImageField()
    name = serializers.CharField()
    url = serializers.URLField()
    about = serializers.CharField()

    def create(self, validated_data):
        return Site.objects.create(**validated_data)

class ListSiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = ['id', 'name', 'cover_image', 'total_reviews', 'avg_rating']

class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = ['name', 'cover_image', 'url', 'about', 'total_reviews', 'avg_rating']

class ListReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'full_name', 'comment', 'timestamp', 'rating', 'upvotes_count', 'downvotes_count']

class PostReviewSerializer(serializers.Serializer):
    comment = serializers.CharField()
    rating = serializers.IntegerField()

    def create(self, validated_data):
        print(validated_data)
        return Review.objects.create(**validated_data)