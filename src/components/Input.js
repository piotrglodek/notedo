import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// framer
import { motion, AnimatePresence } from 'framer-motion';

export const Input = forwardRef((props, ref) => {
  const { label, id, error, withoutLabel, ...rest } = props;
  return (
    <StyledLabel htmlFor={id}>
      {withoutLabel ? null : (
        <StyledLabelText aria-label={label}>{label}</StyledLabelText>
      )}
      <StyledInput ref={ref} id={id} {...rest} />
      <AnimatePresence>
        {error && (
          <StyledError
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </StyledError>
        )}
      </AnimatePresence>
    </StyledLabel>
  );
});

Input.defaultProps = {
  type: 'text',
  withoutLabel: false,
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  withoutLabel: PropTypes.bool,
};

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 1rem;
  color: ${({ theme: { color } }) => color.gray};
  font-size: ${({ theme: { fontSize } }) => fontSize.s};
`;
const StyledLabelText = styled.p`
  margin: 0;
  margin-bottom: 0.2rem;
  color: inherit;
  font-size: inherit;
`;
const StyledInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: ${({ theme: { borderRadius } }) => borderRadius};
  border: ${({ theme: { borderStyle } }) => borderStyle};
  color: inherit;
  font-size: inherit;
  transition: border-color 0.3s ease, color 0.3s ease;
  &:focus {
    border-color: ${({ theme: { borderFocus } }) => borderFocus};
    color: rgba(0, 0, 0, 0.8);
  }
`;
const StyledError = styled(motion.span)`
  display: inline-block;
  color: ${({ theme: { color } }) => color.error};
  margin-top: 0.4rem;
  font-size: ${({ theme: { fontSize } }) => fontSize.xs};
`;
