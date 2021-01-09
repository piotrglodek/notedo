import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

export const Spinner = ({ size }) => <StyledSpinner size={size} />;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  border: 0.4rem solid #dfdfdf;
  border-top: 0.4rem solid ${({ theme: { color } }) => color.primaryTint};
  animation: ${rotate} 2s linear infinite;
`;

Spinner.defaultProps = {
  size: '2.4rem',
};

Spinner.propTypes = {
  size: PropTypes.string,
};
