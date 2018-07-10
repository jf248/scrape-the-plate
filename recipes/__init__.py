from django.db import models


class ImageField(models.ImageField):

    # Overriding save_form_data to reset to default if user clears current
    # image and delete the cleared file

    def save_form_data(self, instance, data):
        if data is not None:
            file = getattr(instance, self.attname)
            if file != data and file.name != self.default:
                file.delete(save=False)
            if not data and hasattr(self, 'default'):
                data = self.default
        super(ImageField, self).save_form_data(instance, data)
