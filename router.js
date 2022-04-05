import Router from 'vue-router'

export function createRouter(
  ssrContext,
  createDefaultRouter,
  routerOptions,
  config
) {
  const options =
    routerOptions || createDefaultRouter(ssrContext, config).options

  const m = (
    ssrContext ? ssrContext.req.headers.host : window.location.host
  ).match(/^(\w+(-\w+)?)\.(localhost|\w+(-\w+)?)(\.\w+)?/)

  let routes = options.routes

  if (m && m[1] === 'ap') {
    routes = routes
      .filter((r) => r.path.indexOf('/' + m[1]) === 0)
      .map((x) => ({
        ...x,
        path: x.path.substr(m[1].length + 1) || '/',
        name: x.name.substr(m[1].length + 1) || 'index',
      }))
  } else {
    routes = routes.filter((r) => r.path.indexOf('/ap') !== 0)
  }

  return new Router({
    ...options,
    routes,
  })
}
