import { useEffect } from 'react';
import styled from 'styled-components';
import { Button, IconButton, Register } from './';
// icon
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import { ReactComponent as SettingsIcon } from '../assets/icons/settings.svg';
// router
import { useLocation } from 'react-router-dom';
// firebase
import { auth, db } from '../firebase';
// redux
import { useSelector } from 'react-redux';
import { selectUserEmail } from '../store/reducers/authSlice';
// hook
import { useToggle } from '../hooks/useToggle';
// framer
import { motion, AnimatePresence } from 'framer-motion';
// react-select
import Select from 'react-select';

export const Header = () => {
  const [isOpen, handleOpen, handleClose] = useToggle();

  // unable scroll for modal
  useEffect(() => {
    if (isOpen) {
      document.body.style = `overflow:hidden;`;
    }
    return () => (document.body.style = null);
  }, [isOpen]);

  const location = useLocation();
  const userEmail = useSelector(selectUserEmail);

  const registerWithModal = (
    <>
      <Button
        variant='secondary'
        size='small'
        label='Register'
        title='Open register modal'
        onClick={handleOpen}
      />
      <AnimatePresence>
        {isOpen && (
          <StyledModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StyledModalWrapper>
              <StyledClose>
                <IconButton
                  onClick={handleClose}
                  title='Close register modal'
                  ariaLabel='Close register modal'
                  icon={<StyledCloseIcon />}
                />
              </StyledClose>
              <StyledHeading>Create account</StyledHeading>
              <Register handleClose={handleClose} />
            </StyledModalWrapper>
          </StyledModal>
        )}
      </AnimatePresence>
    </>
  );

  const handleChangeTheme = option => {
    const value = option.value;
    db.collection('users')
      .doc(auth.currentUser.uid)
      .update({ theme: value })
      .catch(error => {
        console.log(`Couldn't update the theme. Error: ${error}`);
      });
  };

  const options = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'pink', label: 'Pink' },
  ];

  const authSettings = (
    <>
      <IconButton
        onClick={handleOpen}
        title='Open settings'
        ariaLabel='Open settings'
        icon={<StyledSettingsIcon />}
      />
      {isOpen && (
        <StyledMenu>
          <StyledTopMenuWrapper>
            <IconButton
              onClick={handleClose}
              title='Close settings'
              ariaLabel='Close settings'
              icon={<StyledCloseIcon />}
            />
          </StyledTopMenuWrapper>
          <StyledText>
            <StyledBoldText>Hello, </StyledBoldText>
            {userEmail && userEmail}
          </StyledText>
          <StyledMenuItem>
            <StyledMenuItemText>Theme mode:</StyledMenuItemText>
            <Select
              options={options}
              defaultValue={options[0]}
              onChange={handleChangeTheme}
            />
          </StyledMenuItem>
          <StyledMenuItem>
            <Button
              variant='secondary'
              size='small'
              label='Log out'
              title='Log out from account'
              onClick={() => {
                auth.signOut();
                handleClose();
              }}
            />
          </StyledMenuItem>
        </StyledMenu>
      )}
    </>
  );

  return (
    <>
      <StyledHeader>
        <StyledTitle>Notedo</StyledTitle>
        {location.pathname === '/' && registerWithModal}
        {location.pathname === '/notedo' && authSettings}
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
  letter-spacing: 0.25px;
  font-size: ${({ theme: { fontSize } }) => fontSize.m};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.semiBold};

  @media screen and (min-width: 768px) {
    font-size: ${({ theme: { fontSize } }) => fontSize.l};
  }
`;
const StyledModal = styled(motion.div)`
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
  background-color: ${({ theme: { color } }) => color.surface};
  padding: 1rem 1.6rem;
  border-radius: ${({ theme: { borderRadius } }) => borderRadius};
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

const StyledText = styled.p`
  margin-top: 0;
  font-size: ${({ theme: { fontSize } }) => fontSize.xs};
  @media screen and (min-width: 768px) {
    font-size: ${({ theme: { fontSize } }) => fontSize.s};
  }
`;

const StyledBoldText = styled.span`
  font-size: inherit;
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.semiBold};
`;

const StyledTopMenuWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledSettingsIcon = styled(SettingsIcon)`
  fill: ${({ theme: { color } }) => color.gray};
  transition: fill 0.3s;
  &:hover {
    fill: ${({ theme: { color } }) => color.grayShade};
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  fill: ${({ theme: { color } }) => color.gray};
  transition: fill 0.3s;
  &:hover {
    fill: ${({ theme: { color } }) => color.grayShade};
  }
`;

const StyledMenu = styled.div`
  padding: 1.2rem;
  margin: 0;
  list-style: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 30rem;
  height: 100vh;
  background-color: ${({ theme: { color } }) => color.surface};
  z-index: 999;
`;

const StyledMenuItem = styled.div`
  padding: 0.6rem 0;
`;

const StyledMenuItemText = styled.p`
  margin: 0 0 0.5rem 0;

  font-size: ${({ theme: { fontSize } }) => fontSize.xs};
`;
