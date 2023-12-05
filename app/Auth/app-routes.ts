export const APP_ROUTES = {
    private:{
        feed:{
            name:"/feed"
        },
        market:{
            name:"/market"
        },
        profile:{
            name:"/profile"
        }
    },

    public:{
        login: '/',
        regiter: "/register"
    }
}

export const checkPublickRoute = (path: string) =>{
    const routes = Object.values(APP_ROUTES.public)
    return routes.includes(path)
}