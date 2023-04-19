import uuid
from django.db import models
from django.core.validators import MaxValueValidator
from django.db.models import Avg, Count

class SiteManager(models.Manager):
    def sites(self, weight):
        queryset = self.annotate(avg_rating=Avg('site_reviews__rating'))
        if weight >= 4:
            return queryset.filter(avg_rating__gte=4)
        elif weight == 3:
            return queryset.filter(avg_rating=3)
        else:
            return queryset.filter(avg_rating__lte=2)

class Site(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    name = models.CharField(max_length=200, unique=True)    # version 2.0 will be flex
    url = models.URLField(max_length=250, unique=True)
    cover_image = models.ImageField(upload_to='sites/', null=True, blank=True)
    managed_by = models.ForeignKey('account.CustomUser', related_name='sites',   on_delete=models.SET_NULL, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    about = models.TextField()

    objectss = models.Manager()    
    mwitu = SiteManager()

    def __str__(self) -> str:
        return self.name

    def total_reviews(self):
        return self.site_reviews.count()

    def avg_rating(self):
        return self.site_reviews.aggregate(Avg('rating'))['rating__avg']

class ReviewManager(models.Manager):
    def most_upvotes(self):
        return self.annotate(votes = Count('upvote__id')).order_by('-votes')
    
    def most_downvotes(self):
        return self.annotate(votes = Count('downvote__id')).order_by('-votes')

    def most_rated(self):
        return self.order_by('-rating')

class Review(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    user = models.ForeignKey('account.CustomUser', related_name='user_reviews', on_delete=models.SET_NULL, null=True)
    site = models.ForeignKey('Site', related_name='site_reviews', on_delete=models.CASCADE)
    comment = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    rating = models.PositiveSmallIntegerField(default=1, validators=[MaxValueValidator(limit_value=5)])
    upvote = models.ManyToManyField('account.CustomUser', related_name='reviews_upvotes', blank=True)
    downvote = models.ManyToManyField('account.CustomUser', related_name='reviews_downvotes', blank=True)

    objects = models.Manager()
    mwitu = ReviewManager()

    def __str__(self) -> str:
        return f"Review from  {self.user.email} on {self.site.name}"

    class Meta:
        unique_together = [ 'user', 'site' ]
        ordering = ['-timestamp']
    
    def full_name(self):
        return self.user.profile.full_name
    
    def upvotes(self):
        return self.upvote.count()
    
    def downvotes(self):
        return self.downvote.count()