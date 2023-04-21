from rest_framework.pagination import PageNumberPagination


# custom page number pagination
class CustomPageNumberPagination(PageNumberPagination):
    page_size = 7
    
    def get_paginated_response(self, data):
        return {
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data

        }