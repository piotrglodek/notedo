import PropTypes from 'prop-types';
import styled from 'styled-components';
// framer
import { motion, AnimatePresence } from 'framer-motion';

export const Form = ({ formError, children, ...rest }) => {
  return (
    <form {...rest}>
      <AnimatePresence>
        {formError && (
          <StyledFormError
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {formError}
          </StyledFormError>
        )}
      </AnimatePresence>
      {children}
    </form>
  );
};

const StyledFormError = styled(motion.p)`
  color: ${({ theme: { color } }) => color.error};
  font-size: ${({ theme: { fontSize } }) => fontSize.xs};
`;

Form.propTypes = {
  formError: PropTypes.string,
};
