"""Handlers for serving prometheus metrics"""

from prometheus_client import CONTENT_TYPE_LATEST, REGISTRY, generate_latest
from tornado import web

from ..utils import metrics_authentication
from .base import BaseHandler


class MetricsHandler(BaseHandler):
    """
    Handler to serve Prometheus metrics
    """

    _accept_token_auth = True

    @metrics_authentication
    async def get(self):
        if self.settings.get("metrics_port"):
            raise web.HTTPError(404, "Metrics are disabled on the default port")
        else:
            self.set_header('Content-Type', CONTENT_TYPE_LATEST)
            self.write(generate_latest(REGISTRY))


class StandaloneMetricsHandler(web.RequestHandler):
    """
    Handler to serve Prometheus metrics separate from hub.
    Authentication is not supported.
    """

    async def get(self):
        self.set_header('Content-Type', CONTENT_TYPE_LATEST)
        self.write(generate_latest(REGISTRY))


def metrics_application():
    """
    Standalone application for when metrics are served on a dedicated port
    """
    return web.Application([('/metrics', StandaloneMetricsHandler)])


default_handlers = [
    (r'/metrics$', MetricsHandler),
    (r'/api/metrics$', MetricsHandler),
]
