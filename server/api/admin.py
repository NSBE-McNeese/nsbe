from django.contrib import admin
from .models import *


# Register your models here.
admin.site.register(Event)
admin.site.register(User)

class EventAttendanceAdmin(admin.ModelAdmin):
    list_display = ('user', 'event', 'qr_token', 'check_in_status', 'checked_in_at')
    readonly_fields = ('qr_token',)
    list_filter = ('event', 'checked_in_at')
    def check_in_status(self, obj):
        return obj.checked_in_at is not None
    
    check_in_status.boolean = True
    check_in_status.short_description = 'Checked In?'

admin.site.register(EventAttendance, EventAttendanceAdmin)