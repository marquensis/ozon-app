
import PropTypes from 'prop-types';

const CartShapes = ({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
});

export default CartShapes;