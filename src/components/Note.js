import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

// moment
import moment from 'moment';
// icon
import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '../assets/icons/edit.svg';
import { ReactComponent as CheckIcon } from '../assets/icons/check.svg';
// components
import { IconButton, Input, Textarea } from './';

export const Note = ({ note, handleDelete, handleUpdate, ...rest }) => {
  const { id, title, description, date } = note;

  const [isEdited, setIsEdited] = useState(false);
  const handleToggleEdit = () => setIsEdited(prev => !prev);

  const [titleInput, setTitleInput] = useState(title);
  const [descriptionTextarea, setDescriptionTextarea] = useState(description);

  const handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    if (name === 'title') {
      setTitleInput(value);
    } else if (name === 'message') {
      setDescriptionTextarea(value);
      target.style.height = '4.8rem';
      target.style.height = `${target.scrollHeight}px`;
    }
  };

  const handleSubmit = () => {
    // update only when here is a difference of changes
    if (titleInput !== title || descriptionTextarea !== description) {
      handleUpdate(id, titleInput, descriptionTextarea.replace(/\n/g, ' \n '));
    }
    setIsEdited(false);
  };

  return (
    <StyledWrapper {...rest}>
      {isEdited ? (
        <Input
          withoutLabel
          value={titleInput}
          name='title'
          onChange={handleChange}
        />
      ) : (
        <StyledHeading>{title}</StyledHeading>
      )}

      {isEdited ? (
        <Textarea
          value={descriptionTextarea}
          name='message'
          onChange={handleChange}
        />
      ) : (
        <StyledMessage
          dangerouslySetInnerHTML={{
            __html: description.replace(/\n/g, '<br/>'),
          }}
        />
      )}

      <StyledFooter>
        <StyledDate>{moment(date.toDate()).fromNow()}</StyledDate>
        <StyledFooterWrapper>
          {isEdited ? (
            <IconButton
              onClick={() => handleSubmit()}
              title='Update note'
              ariaLabel='Update note'
              icon={<StyledCheckIcon />}
            />
          ) : (
            <IconButton
              onClick={() => handleToggleEdit()}
              title='Edit note'
              ariaLabel='Edit note'
              icon={<StyledEditIcon />}
            />
          )}
          <IconButton
            onClick={() => handleDelete(id)}
            title='Delete note'
            ariaLabel='Delete note'
            icon={<StyledDeleteIcon />}
          />
        </StyledFooterWrapper>
      </StyledFooter>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 1rem 1rem 0.5rem;
  border: ${({ theme: { borderStyle } }) => borderStyle};
  border-radius: ${({ theme: { borderRadius } }) => borderRadius};
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

const StyledFooterWrapper = styled.div`
  & :first-child {
    margin-right: 1rem;
  }
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  fill: ${({ theme: { color } }) => color.grey};
  transition: fill 0.2s;

  &:hover {
    fill: ${({ theme: { color } }) => color.error};
  }
`;

const StyledEditIcon = styled(EditIcon)`
  fill: ${({ theme: { color } }) => color.grey};
  transition: fill 0.2s;

  &:hover {
    fill: ${({ theme: { color } }) => color.primaryTint};
  }
`;

const StyledCheckIcon = styled(CheckIcon)`
  fill: ${({ theme: { color } }) => color.grey};
  transition: fill 0.2s;

  &:hover {
    fill: ${({ theme: { color } }) => color.primaryTint};
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
  handleUpdate: PropTypes.func,
};
