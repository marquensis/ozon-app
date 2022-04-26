
import PropTypes from 'prop-types';

const CartShapes = PropTypes.shape({
    id: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
});

export default CartShapes;