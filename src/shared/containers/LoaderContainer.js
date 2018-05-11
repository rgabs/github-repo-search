import Loader from 'shared/components/Loader/index'
import { connect } from 'react-redux';

const mapStateToProps = ({ loader }) => ({ loader })

export default connect(mapStateToProps)(Loader)