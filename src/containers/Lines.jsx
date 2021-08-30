import Lines from '../components/Lines';
import {connect} from 'react-redux';
function mapReduxStateToReactProps(state){
    return {
        number:state.number,
        data:state.data
    }
}
export default connect(mapReduxStateToReactProps)(Lines);
