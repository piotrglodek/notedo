import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Input = forwardRef((props, ref) => {
  const { label, id, error, withoutLabel, ...rest } = props;
  return (
    <StyledLabel htmlFor={id}>
      {withoutLabel ? null : (
        <StyledLabelText aria-label={label}>{label}</StyledLabelText>
      )}
      <StyledInput ref={ref} id={id} {...rest} />
      {error && <StyledError>{error}</StyledError>}
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
  color: rgba(0, 0, 0, 0.6);
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
  border-radius: 0.3rem;
  border: 0.1rem solid rgba(0, 0, 0, 0.5);
  color: inherit;
  font-size: inherit;
  transition: border-color 0.3s ease, color 0.3s ease;
  &:focus {
    border-color: rgba(0, 0, 0, 0.8);
    color: rgba(0, 0, 0, 0.8);
  }
`;
const StyledError = styled.span`
  display: inline-block;
  color: ${({ theme: { color } }) => color.error};
  margin-top: 0.4rem;
  font-size: ${({ theme: { fontSize } }) => fontSize.xs};
`;
