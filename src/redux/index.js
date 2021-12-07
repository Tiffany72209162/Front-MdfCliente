import { combineReducers } from 'redux'
import Common from '../redux/common/common'
import Customizer from './Customizer/reducer'
import Auth from './Auth/Reducer'
import Inspectores from './Inspectores'
import Clientes from './Clientes'
import Ordenes from './Ordenes'
import Informes from './Informes'
import Ubigeo from './Ubigeo'
import Login from './Login'
import Reportes from './Reportes'

const reducers = combineReducers({
    Common,
    Customizer,
    Auth,
    Inspectores,
    Clientes,
    Ordenes,
    Ubigeo,
    Informes,
    Login,
    Reportes
});

export default reducers;
