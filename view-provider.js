const Provider = require('../support/provider')
const ViewFactory = require('./view-factory')

class ViewProvider extends Provider {
  register() {
    this.app.singleton('view.factory', app => {
      return new ViewFactory(app)
    })

    this.app.bind('view', (app, view) => {
      return app.make('view.factory').load(view)
    })
  }
}

module.exports = ViewProvider
