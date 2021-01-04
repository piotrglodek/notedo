import PropTypes from 'prop-types';
import styled from 'styled-components';
import { transparentize } from 'polished';

export const IconButton = ({ icon, ariaLabel, ...rest }) => {
  return (
    <StyledIconButton aria-label={ariaLabel} {...rest}>
      {icon}
    </StyledIconButton>
  );
};

const StyledIconButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;

  svg {
    fill: ${({ theme: { color } }) => color.black};
    transition: fill 0.3s ease;
  }

  &:hover svg {
    fill: ${({ theme: { color } }) => color.primary};
  }
`;

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};
