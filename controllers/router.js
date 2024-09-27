import { ui } from './ui.js'

var routes = {},
defaultRoute = 'home'

routes['home'] = {
    url: '#/',
    templateUrl: 'views/home.html'
}


$.router
.setData(routes)
.setDefault(defaultRoute)


export const router = () => {
    $.when($.ready)
    .then(function() {
        $.router.run('#app','home')
        $.router.onRouteChanged( function(e, route, params){
            ui()
        })
    })
}