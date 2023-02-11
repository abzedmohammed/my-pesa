from rest_framework.routers import SimpleRouter
from .views import *

router = SimpleRouter()
router.register('files', ImageViewset)
router.register('banks', BankViewset)
router.register('users', UserViewset)
router.register('customers', CustomerViewset)
router.register('accounts', SingleAccountSerializer)
router.register('currencies', CurrencyViewset)
router.register('cards', BankCardViewset)

urlpatterns = router.urls