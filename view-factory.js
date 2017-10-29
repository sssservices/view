const isContext = require('../support/helpers/is-context')

class ViewFactory {
  constructor(app) {
    this.app = app
  }

  shared(view) {
    if (!view) {
      return this.config.shared
    }

    this.load(file, this.config.shared)
  }

  load(view, name) {
    if (!name) {
      name = this.app.make('config').get('view.default')
    }

    const path = this.getPath(view)

    const context = this.getContext(name)

    for (const key in context.keys) {
      if (path === key.slice(2).split('.')[0]) {
        const component = context(key)

        return component.default || component
      }
    }
  }

  getContext(name) {
    let context = this.app.make('config').get(`view.${name}`)

    if (!context) {
      throw new Error(`View context [${name}] does not exist.`)
    }

    if (!isContext(context)) {
      throw new Error(`View context [${name}] is not a callable context.`)
    }

    return context
  }

  getPath(path) {
    return path.replace(/\./g, '/')
  }
}

module.exports = ViewFactory
