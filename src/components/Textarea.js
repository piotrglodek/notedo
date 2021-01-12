import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
// framer
import { motion, AnimatePresence } from 'framer-motion';

export const Textarea = forwardRef((props, ref) => {
  const { label, id, error, withoutLabel, resize, ...rest } = props;
  return (
    <StyledLabel htmlFor={id}>
      {withoutLabel ? null : (
        <StyledLabelText aria-label={label}>{label}</StyledLabelText>
      )}
      <StyledTextarea ref={ref} id={id} {...rest} resize={resize} />
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

Textarea.defaultProps = {
  withoutLabel: false,
  resize: true,
};

Textarea.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  withoutLabel: PropTypes.bool,
  resize: PropTypes.bool,
};

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 1rem;
  color: rgba(0, 0, 0, 0.6);
  font-size: ${({ theme: { fontSize } }) => fontSize.s};
`;
const StyledLabelText = styled.p`
  margin: 0;
  margin-bottom: 0.2rem;
  color: inherit;
  font-size: inherit;
`;
const StyledTextarea = styled.textarea`
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

  ${({ resize }) =>
    !resize &&
    css`
      resize: none;
    `}
`;
const StyledError = styled(motion.span)`
  display: inline-block;
  color: ${({ theme: { color } }) => color.error};
  margin-top: 0.4rem;
  font-size: ${({ theme: { fontSize } }) => fontSize.xs};
`;
