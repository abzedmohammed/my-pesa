from rest_framework.routers import SimpleRouter
from rest_framework.authtoken import views
from .views import *
from django.urls import path

router = SimpleRouter()
router.register('files', ImageViewset)
router.register('banks', BankViewset)
router.register('users', UserViewset)
router.register('accounts', SingleAccountSerializer)
router.register('currencies', CurrencyViewset)
router.register('cards', BankCardViewset)

urlpatterns = router.urls

urlpatterns += [
    path('api-token-auth/', CustomAuthToken.as_view())
]

urlpatterns = router.urls