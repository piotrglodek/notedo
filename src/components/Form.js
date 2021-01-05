import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Form = ({ formError, children, ...rest }) => {
  return (
    <form {...rest}>
      {formError && <StyledFormError>{formError}</StyledFormError>}
      {children}
    </form>
  );
};

const StyledFormError = styled.p`
  color: ${({ theme: { color } }) => color.error};
  font-size: ${({ theme: { fontSize } }) => fontSize.xs};
`;

Form.propTypes = {
  formError: PropTypes.string,
};
