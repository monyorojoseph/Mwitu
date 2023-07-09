import uuid
from django.db import models
from django.core.validators import MaxValueValidator
from django.db.models import Avg, Count
from taggit.managers import TaggableManager
from django_lifecycle import LifecycleModelMixin, hook, AFTER_CREATE
from  django.utils.text import slugify

def json_field_default():
    return [{
      'type': 'paragraph',
      'children': [{ 'text': '' }],
    }]

class Site(LifecycleModelMixin, models.Model):
    name = models.CharField(max_length=50)    # version 2.0 will be flex
    url = models.URLField(max_length=250, unique=True, null=True, blank=True)
    cover_image = models.ImageField(upload_to='sites/', null=True, blank=True)
    logo = models.ImageField(upload_to='sites/', null=True, blank=True)
    created_by = models.ForeignKey('account.CustomUser', related_name='created_sites', on_delete=models.SET_NULL, null=True)
    owned_by = models.ForeignKey('account.CustomUser', related_name='owned_sites', on_delete=models.SET_NULL, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    tags = TaggableManager(blank=True, related_name='sites_tags')
    about = models.JSONField(default=json_field_default)
    slug = models.SlugField(blank=True, null=True)

    objects = models.Manager()    

    def __str__(self) -> str:
        return self.name
    
    @hook(AFTER_CREATE)
    def create_slug(self) -> None:
        slug = slugify(self.name, allow_unicode=True)
        if Site.objects.filter(slug=slug).exists():
            slug = f'{slug}-{self.id}'        
        self.slug = slug
        self.save()
        return

    def total_reviews(self) -> int:
        return self.site_reviews.count()

    def avg_rating(self) -> float:
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
    comment = models.JSONField(default=json_field_default)
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
    
    def image(self):
        return self.user.profile.image.url
    
    def upvotes(self):
        return self.upvote.count()
    
    def downvotes(self):
        return self.downvote.count()