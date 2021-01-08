import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, IconButton, Register } from './';
// icon
import { ReactComponent as CloseIcon } from '../assets/icons/close_icon.svg';
// router
import { useLocation } from 'react-router-dom';
// firebase
import { auth } from '../firebase';
// redux
import { useSelector } from 'react-redux';
import { selectUserEmail } from '../store/reducers/authSlice';

export const Header = () => {
  // const userEmail = useSelector(selectUserEmail);
  const [wantRegister, setWantRegister] = useState(false);

  // unable scroll for modal
  useEffect(() => {
    if (wantRegister) {
      document.body.style = `overflow:hidden;`;
    } else {
      document.body.style = null;
    }
  }, [wantRegister]);

  const location = useLocation();
  const userEmail = useSelector(selectUserEmail);

  const registerWithModal = (
    <>
      <Button
        variant='secondary'
        size='small'
        label='Register'
        title='Open register modal'
        onClick={() => setWantRegister(true)}
      />
      {wantRegister && (
        <StyledModal>
          <StyledModalWrapper>
            <StyledClose>
              <IconButton
                onClick={() => setWantRegister(false)}
                title='Close register modal'
                ariaLabel='Close register modal'
                icon={<CloseIcon />}
              />
            </StyledClose>
            <StyledHeading>Create account</StyledHeading>
            <Register />
          </StyledModalWrapper>
        </StyledModal>
      )}
    </>
  );

  const authUser = (
    <StyledWrapper>
      <StyledText>
        <StyledBoldText>Hello, </StyledBoldText>
        {userEmail && userEmail}
      </StyledText>
      <Button
        variant='secondary'
        size='small'
        label='Log out'
        title='Log out from account'
        onClick={() => auth.signOut()}
      />
    </StyledWrapper>
  );

  return (
    <>
      <StyledHeader>
        <StyledTitle>Notedo</StyledTitle>
        {location.pathname === '/' && registerWithModal}
        {location.pathname === '/notedo' && authUser}
      </StyledHeader>
    </>
  );
};

const StyledHeader = styled.header`
  padding: 1.2rem 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
`;

const StyledTitle = styled.span`
  display: block;
  color: ${({ theme: { color } }) => color.black};
  letter-spacing: 0.25px;
  font-size: ${({ theme: { fontSize } }) => fontSize.m};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.semiBold};

  @media screen and (min-width: 768px) {
    font-size: ${({ theme: { fontSize } }) => fontSize.l};
  }
`;
const StyledModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
  overflow: auto;
  z-index: 999;
`;
const StyledModalWrapper = styled.div`
  width: 100%;
  max-width: 62.5rem;
  margin: 0 auto;
  background-color: ${({ theme: { color } }) => color.white};
  padding: 1rem 1.6rem;
  border-radius: 0.3rem;
  position: relative;
  z-index: 1;
`;
const StyledClose = styled.span`
  position: absolute;
  top: 1rem;
  right: 1.6rem;
`;
const StyledHeading = styled.h1`
  font-size: ${({ theme: { fontSize } }) => fontSize.l};
  color: ${({ theme: { color } }) => color.black};
  position: relative;
  &::after {
    content: '';
    z-index: -1;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 7rem;
    height: 0.8rem;
    background-color: ${({ theme: { color } }) => color.primaryTint};
    opacity: 0.7;
  }
`;
const StyledWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
    width: auto;
    justify-content: unset;
  }
`;
const StyledText = styled.p`
  margin: 0;
  color: ${({ theme: { color } }) => color.black};
  font-size: ${({ theme: { fontSize } }) => fontSize.xs};
  @media screen and (min-width: 768px) {
    font-size: ${({ theme: { fontSize } }) => fontSize.s};
    margin-right: 1.5rem;
  }
`;
const StyledBoldText = styled.span`
  font-size: inherit;
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.semiBold};
`;
