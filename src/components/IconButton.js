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
  width: 3.2rem;
  height: 3.2rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background-color: transparent;
  transition: background-color 0.3s ease;
`;

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};
