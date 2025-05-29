from django.core.exceptions import ObjectDoesNotExist
from .models import Order

def cart_item_count(request):
    """
    Context processor to add cart item count to all templates
    """
    if request.user.is_authenticated:
        try:
            order = Order.objects.get(user=request.user, ordered=False)
            cart_count = order.items.count()
        except ObjectDoesNotExist:
            cart_count = 0
    else:
        cart_count = 0
    
    return {'cart_item_count': cart_count}