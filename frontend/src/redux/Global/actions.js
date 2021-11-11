export const SET_THEME = "SET_THEME"
export const SET_FLIGHT_MODE = "SET_FLIGHT_MODE"
export const TOGGLE_POPUP = "TOGGLE_POPUP"
export const TOGGLE_SIDEMENU = "TOGGLE_SIDEMENU"

export const setTheme = ()=>{
    return {
        type:SET_THEME
    }
}

export const setFlightMode = ()=>{
    return {
        type:SET_FLIGHT_MODE
    }
}

export const togglePopUp = ()=>{
    return {
        type:TOGGLE_POPUP
    }
}

export const toggleSideMenu = ()=>{
    return {
        type:TOGGLE_SIDEMENU
    }
}

