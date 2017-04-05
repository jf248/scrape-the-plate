import os

from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.core.files.uploadedfile import UploadedFile


class SessionStorage(object):
    """
    Created by JF with help from django-formtools.
    """

    temp_path = 'temp/'
    data_key = 'data'
    files_key = 'files'

    def _get_data(self):
        self.request.session.modified = True
        return self.request.session[self.prefix]

    def _set_data(self, value):

        self.request.session[self.prefix] = value
        self.request.session.modified = True

    _data = property(_get_data, _set_data)

    def __init__(self, prefix, request, step):
        self.request = request
        self.prefix = prefix
        if self.prefix not in self.request.session:
            self._data = {self.data_key: {}, self.files_key: {}}
        self.file_storage = FileSystemStorage(
            location=os.path.join(settings.MEDIA_ROOT, self.temp_path),
            base_url=os.path.join(settings.MEDIA_URL, self.temp_path))
        self._files = {}

    def __repr__(self):
        return str(self._data)

    def steps_completed(self):
        return len(self._data[self.data_key])

    def get_step_data(self, step):
        return self._data[self.data_key].get(step, {})

    def set_step_data(self, step, value):
        self._data[self.data_key][step] = value

    def set_step_files(self, step, files):
        if step not in self._data[self.files_key]:
            self._data[self.files_key][step] = {}
        for field, field_file in files.items():
            tmp_filename = self.file_storage.save(field_file.name, field_file)
            file_dict = {
                'tmp_name': tmp_filename,
                'name': field_file.name,
                'content_type': field_file.content_type,
                'size': field_file.size,
                'charset': field_file.charset
            }
            self._data[self.files_key][step][field] = file_dict

    def get_step_files(self, step):
        storage_files = self._data[self.files_key].get(step, {})
        files = {}
        for field, field_dict in storage_files.items():
            field_dict = field_dict.copy()
            tmp_name = field_dict.pop('tmp_name')
            if (step, field) not in self._files:
                self._files[(step, field)] = UploadedFile(
                    file=self.file_storage.open(tmp_name), **field_dict)
            files[field] = self._files[(step, field)]
        return files or None

    def delete_file(self, step, field):
        print("Trying to delete:", field)
        storage_files = self._data[self.files_key][step]
        if field in storage_files:
            tmp_name = storage_files[field]['tmp_name']
            print("tmp_name", tmp_name)
            self.file_storage.delete(tmp_name)
            del self._data[self.files_key][step][field]

    def del_higher_steps(self, step):
        step = int(step)
        for other_step in list(self._data[self.data_key].keys()):
            if int(other_step) > step:
                storage_files = self._data[self.files_key].get(other_step, {})
                for field, field_dict in storage_files.items():
                    tmp_name = field_dict['tmp_name']
                    self.file_storage.delete(tmp_name)
                del self._data[self.files_key][other_step]
                del self._data[self.data_key][other_step]

    def delete(self):
        self.del_higher_steps(0)
        del self.request.session[self.prefix]
        self.request.session.modified = True

    def update_response(self, response):
        def post_render_callback(response):
            for file in self._files.values():
                if not file.closed:
                    file.close()
            # for tmp_file in self._tmp_files:
            #     self.file_storage.delete(tmp_file)

        if hasattr(response, 'render'):
            response.add_post_render_callback(post_render_callback)
        else:
            post_render_callback(response)
