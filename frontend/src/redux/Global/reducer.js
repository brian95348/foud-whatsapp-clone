
import axios from 'axios'
import * as actionCreators from './actions'

const initialState = {
    isPopUpOpen : false,
    isSideMenuOpen: false,
    theme: 'dark',
    styles: {
        backgroundColor: 'rgb(36, 36, 36)',
        color: 'white',
        nav : {
            backgroundColor: 'rgb(36, 36, 36)',
            color: 'white',
        }
    },
    flightMode: false
}

const globalReducer = (state=initialState,action) => {
    switch (action.type) {
        case actionCreators.SET_THEME:
            if (state.theme === 'dark') {
                return {...state, theme: 'light',styles:{
                                            backgroundColor:'white',
                                            color:'black',
                                            nav : {
                                                backgroundColor:'rgba(7, 194, 85, 0.788)',
                                                color:'white'
                                            }
                                        }}
            } else {
                return {...state, theme: 'dark',styles: {
                                backgroundColor: 'rgb(36, 36, 36)',
                                color: 'white',
                                nav : {
                                    backgroundColor: 'rgb(36, 36, 36)',
                                    color: 'white',
                                }
                            }}
            }
        case actionCreators.SET_FLIGHT_MODE:
            if (!state.flightMode) {
                return {...state, flightMode: true}
            } else {
                return {...state, flightMode: false}
            }
        case actionCreators.TOGGLE_POPUP:
            if (state.isPopUpOpen) {
                return {...state, isPopUpOpen: false}
            } else {
                return {...state, isPopUpOpen: true}
            }
        case actionCreators.TOGGLE_SIDEMENU:
            if (state.isSideMenuOpen) {
                return {...state, isSideMenuOpen: false}
            } else {
                return {...state, isSideMenuOpen: true}
            }
        default:
            return state;
    }
}

export default globalReducer