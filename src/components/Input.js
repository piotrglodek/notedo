import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Input = forwardRef((props, ref) => {
  const { label, id, error, ...rest } = props;
  return (
    <StyledLabel htmlFor={id}>
      <StyledLabelText aria-label={label}>{label}</StyledLabelText>
      <StyledInput ref={ref} id={id} {...rest} />
      {error && <StyledError>{error}</StyledError>}
    </StyledLabel>
  );
});

Input.defaultProps = {
  type: 'text',
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 1rem;
  color: ${({ theme: { color } }) => color.black};
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
  transition: border-color 0.4s ease;
  &:focus {
    border-color: rgba(0, 0, 0, 0.7);
  }
`;
const StyledError = styled.span`
  display: inline-block;
  color: ${({ theme: { color } }) => color.error};
  margin-top: 0.4rem;
  font-size: ${({ theme: { fontSize } }) => fontSize.xs};
`;
