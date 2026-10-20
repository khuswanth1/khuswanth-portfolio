from django.urls import path

from contact import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/health", views.health, name="health"),
    path("api/contact", views.contact, name="contact"),
    path("api/contact/", views.contact),
    path("api/submissions", views.submissions, name="submissions"),
]

handler400 = "contact.views.bad_request"
handler404 = "contact.views.not_found"
handler500 = "contact.views.server_error"
