import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const Button = ({ label, variant, size, ...rest }) => {
  return (
    <StyledButton size={size} variant={variant} {...rest}>
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border-radius: ${({ theme: { borderRadius } }) => borderRadius};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.semiBold};
  transition: all 0.3s ease;

  ${({ variant, theme: { color } }) => {
    switch (variant) {
      case 'secondary':
        return css`
          border: 0.1rem solid ${transparentize(0.8, '#000')};
          color: ${color.primary};
          &:hover {
            background-color: ${transparentize(0.96, '#000')};
          }
        `;
      // default primary
      default:
        return css`
          background-color: ${color.primary};
          color: ${color.white};
          &:hover {
            background-color: ${color.primaryTint}};
          }
        `;
    }
  }}

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          padding: 0.6rem 1.2rem;
        `;
      default:
        return css`
          padding: 1rem 2.8rem;
        `;
    }
  }}
`;

StyledButton.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
};

Button.defaultProps = {
  variant: 'primary',
  size: 'normal',
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'normal']),
  variant: PropTypes.oneOf(['primary', 'secondary']),
};
