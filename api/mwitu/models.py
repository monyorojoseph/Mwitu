import uuid
from django.db import models
from django.core.validators import MaxValueValidator


class Site(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    name = models.CharField(max_length=200, unique=True)    # version 2.0 will be flex
    url = models.URLField(max_length=250, unique=True)
    cover_image = models.ImageField(upload_to='sites/', null=True, blank=True)
    managed_by = models.ForeignKey('account.CustomUser', related_name='sites',   on_delete=models.SET_NULL, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    about = models.TextField()
    upvote = models.ManyToManyField('account.CustomUser', related_name='sites_upvotes', blank=True)
    downvote = models.ManyToManyField('account.CustomUser', related_name='sites_downvotes', blank=True)

    def __str__(self) -> str:
        return self.name

class Review(models.Model):
    user = models.ForeignKey('account.CustomUser', related_name='user_reviews', on_delete=models.SET_NULL, null=True)
    site = models.ForeignKey('Site',  related_name='site_reviews', on_delete=models.CASCADE)
    comment = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Review from  {self.user.email} on {self.site.name}"


class Rating(models.Model):
    user = models.ForeignKey('account.CustomUser', related_name='user_ratings', on_delete=models.SET_NULL, null=True)
    site = models.ForeignKey('Site',  related_name='site_ratings', on_delete=models.CASCADE)
    stars = models.PositiveSmallIntegerField(default=1, validators=[MaxValueValidator(limit_value=5)])
    
    def __str__(self) -> str:
        return f"{self.stars} on {self.site.name} from {self.user.email}"