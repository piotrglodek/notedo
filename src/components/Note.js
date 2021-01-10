import styled from 'styled-components';
import PropTypes from 'prop-types';
// moment
import moment from 'moment';
// icon
import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';
// components
import { IconButton } from './';

export const Note = ({ note, handleDelete, ...rest }) => {
  const { id, title, description, date } = note;

  return (
    <StyledWrapper {...rest}>
      <StyledHeading>{title}</StyledHeading>
      <StyledMessage
        dangerouslySetInnerHTML={{
          __html: description.replace(/\n/g, '<br/>'),
        }}
      />
      <StyledFooter>
        <StyledDate>{moment(date.toDate()).fromNow()}</StyledDate>
        <IconButton
          onClick={() => handleDelete(id)}
          title='Delete note'
          ariaLabel='Delete note'
          icon={<StyledDeleteIcon />}
        />
      </StyledFooter>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 1rem 1rem 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.3rem;
`;

const StyledHeading = styled.h3`
  color: ${({ theme: { color } }) => color.black};
  font-size: ${({ theme: { fontSize } }) => fontSize.s};
  margin-top: 0;
`;
const StyledMessage = styled.div`
  font-size: ${({ theme: { fontSize } }) => fontSize.xs};
`;
const StyledFooter = styled.footer`
  padding-top: 1rem;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media screen and (min-width: 768px) {
    visibility: hidden;
    opacity: 0;

    ${StyledWrapper}:hover & {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  fill: ${({ theme: { color } }) => color.grey};
  transition: fill 0.2s;

  &:hover {
    fill: ${({ theme: { color } }) => color.error};
  }
`;

const StyledDate = styled.span`
  font-size: 1rem;
  color: ${({ theme: { color } }) => color.grey};
`;

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
  }),
  handleDelete: PropTypes.func,
};
