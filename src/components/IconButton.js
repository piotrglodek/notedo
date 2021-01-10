import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  border-radius: 50%;
  background-color: transparent;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};
