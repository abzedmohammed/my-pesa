from rest_framework.routers import SimpleRouter
from .views import ImageViewset

router = SimpleRouter()
router.register('images', ImageViewset)

urlpatterns = router.urls