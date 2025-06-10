from django.urls import path
from . import views
from .views import (
    ItemDetailView,
    CheckoutView,
    HomeView,
    OrderSummaryView,
    add_to_cart,
    remove_from_cart,
    remove_single_item_from_cart,
    PaymentView,
    AddCouponView,
    RequestRefundView,
    products_view,
    wishlist_view,
    add_to_wishlist,
    remove_from_wishlist,
    about_view,
    contact_view,
    profile_view,
    seller_signup,
    seller_dashboard,
    upload_product,
    market_home,
)

app_name = 'core'

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('checkout/', CheckoutView.as_view(), name='checkout'),
    path('order-summary/', OrderSummaryView.as_view(), name='order-summary'),
    path('product/<slug>/', ItemDetailView.as_view(), name='product'),
    path('add-to-cart/<slug>/', add_to_cart, name='add-to-cart'),
    path('add-coupon/', AddCouponView.as_view(), name='add-coupon'),
    path('remove-from-cart/<slug>/', remove_from_cart, name='remove-from-cart'),
    path('remove-item-from-cart/<slug>/', remove_single_item_from_cart, name='remove-single-item-from-cart'),
    path('payment/<payment_option>/', PaymentView.as_view(), name='payment'),
    path('request-refund/', RequestRefundView.as_view(), name='request-refund'),

    # Extra pages
    path('products/', products_view, name='products'),
    path('wishlist/', wishlist_view, name='wishlist'),
    path('add-to-wishlist/<slug>/', add_to_wishlist, name='add-to-wishlist'),
    path('remove-from-wishlist/<slug>/', remove_from_wishlist, name='remove-from-wishlist'),
    path('about/', about_view, name='about'),
    path('contact/', contact_view, name='contact'),
    path('profile/', profile_view, name='profile'),

    # Seller URLs
    path('seller-signup/', seller_signup, name='seller_signup'),
    path('seller-dashboard/', seller_dashboard, name='seller_dashboard'),
    
    path('market/', market_home, name='market'),
    path('upload-product/', upload_product, name='upload_product'),
]
