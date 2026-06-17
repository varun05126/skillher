from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    Works for objects that have a `user` attribute (like Profile) or for the User model itself.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # For objects with a `user` attribute (e.g., Profile), check obj.user
        # For the User model itself, compare obj directly to request.user
        if hasattr(obj, 'user'):
            return obj.user == request.user
        return obj == request.user