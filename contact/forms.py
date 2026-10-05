import re

from django import forms

# Control characters (incl. CR/LF) are never legitimate in single-line fields and
# are the raw material for email header injection.
_CONTROL_CHARS = re.compile(r"[\x00-\x1f\x7f]")


class SingleLineField(forms.CharField):
    def clean(self, value):
        value = super().clean(value)
        if _CONTROL_CHARS.search(value):
            raise forms.ValidationError("Must be a single line of text.")
        return value


class ContactForm(forms.Form):
    """Mirrors the client-side rules in client/src/sections/Contact.jsx."""

    name = SingleLineField(min_length=2, max_length=80, error_messages={
        "required": "Please enter your name.",
        "min_length": "Please enter your name.",
        "max_length": "Name must be at most 80 characters.",
    })
    email = forms.EmailField(max_length=254, error_messages={
        "required": "Please enter a valid email.",
        "invalid": "Please enter a valid email.",
    })
    message = forms.CharField(min_length=10, max_length=2000, error_messages={
        "required": "Message should be at least 10 characters.",
        "min_length": "Message should be at least 10 characters.",
        "max_length": "Message must be at most 2000 characters.",
    })

    def clean_email(self):
        return self.cleaned_data["email"].lower()

    def clean_message(self):
        # Keep newlines/tabs in the body, drop other control characters.
        return re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", self.cleaned_data["message"])
