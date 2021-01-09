import { useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
// icons
import { ReactComponent as SuccessIcon } from '../assets/icons/check.svg';
import { ReactComponent as ErrorIcon } from '../assets/icons/error.svg';
import { ReactComponent as InfoIcon } from '../assets/icons/info.svg';
import { ReactComponent as WarningIcon } from '../assets/icons/warning.svg';
import { ReactComponent as CloseIcon } from '../assets/icons/close_icon.svg';
// framer
import { motion, AnimatePresence } from 'framer-motion';

export const Toast = props => {
  const {
    toastList,
    setToastList,
    position,
    autoDelete,
    autoDeleteTime,
  } = props;

  const handleToastIcon = type => {
    switch (type) {
      case 'success':
        return <SuccessIcon />;
      case 'danger':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'info':
        return <InfoIcon />;
      default:
        throw new Error(
          `Unknown toast type: ${type}. Use one  of them ['success','danger','info','warning']`
        );
    }
  };

  // const deleteToast = id => {
  //   setToastList(toastList.filter(item => item.id !== id));
  // };

  const deleteToast = useCallback(
    id => {
      setToastList(toastList.filter(item => item.id !== id));
    },
    [toastList, setToastList]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length) {
        deleteToast(toastList[0].id);
      }
    }, autoDeleteTime);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDelete, autoDeleteTime, deleteToast]);

  const toastAnimation =
    position === 'top-right' || position === 'bottom-right' ? '100%' : '-100%';

  return (
    <AnimatePresence>
      {toastList.length && (
        <StyledWrapper
          initial={{ opacity: 0, x: toastAnimation }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: toastAnimation }}
          role='alert'
          className={position}
        >
          <AnimatePresence>
            {toastList.map(({ id, message, type }) => (
              <StyledToast
                initial={{ x: toastAnimation }}
                animate={{ x: 0 }}
                exit={{ x: toastAnimation }}
                key={id}
                className={type}
              >
                <StyledToastIcon>{handleToastIcon(type)}</StyledToastIcon>
                <StyledToastClose onClick={() => deleteToast(id)}>
                  <CloseIcon />
                </StyledToastClose>
                <StyledToastMessage>{message}</StyledToastMessage>
              </StyledToast>
            ))}
          </AnimatePresence>
        </StyledWrapper>
      )}
    </AnimatePresence>
  );
};

const StyledWrapper = styled(motion.div)`
  position: fixed;
  z-index: 1000;

  &.top-right {
    top: 1.2rem;
    right: 1.2rem;
  }
  &.top-left {
    top: 1.2rem;
    left: 1.2rem;
  }
  &.bottom-left {
    bottom: 1.2rem;
    left: 1.2rem;
  }
  &.bottom-right {
    bottom: 1.2rem;
    right: 1.2rem;
  }
`;
const StyledToast = styled(motion.div)`
  overflow: hidden;
  margin-bottom: 1.2rem;
  padding: 0.6rem;
  width: 100%;
  max-width: 30rem;
  border-radius: 0.3rem;
  display: grid;
  grid-template-columns: 3rem 1fr 3rem;
  grid-template-rows: repeat(2, 3rem);
  grid-column-gap: 0.2rem;

  &.success {
    background-color: #5cb85c;
  }

  &.danger {
    background-color: #d9534f;
  }

  &.info {
    background-color: #7300ff;
  }

  &.warning {
    background-color: #f0ad4e;
  }
`;

const colorWhite = css`
  ${({ theme: { color } }) => color.white};
`;

const StyledToastIcon = styled.span`
  grid-area: 1 / 1 / 3 / 2;
  place-self: center;

  svg {
    // styles for icon
    fill: ${colorWhite};
  }
`;

const StyledToastClose = styled.button`
  grid-area: 1 / 3 / 3 / 4;
  place-self: center;
  width: 3rem;
  height: 3rem;
  display: grid;
  place-items: center;

  svg {
    // styles for icon
    fill: ${colorWhite};
  }
`;

const StyledToastMessage = styled.span`
  grid-area: 1 / 2 / 3 / 3;
  color: ${colorWhite};
  place-self: center;
  font-size: ${({ theme: { fontSize } }) => fontSize.xs};
`;

Toast.defaultProps = {
  position: 'bottom-right',
  autoDelete: false,
  autoDeleteTime: 3000,
};

Toast.propTypes = {
  toastList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['danger', 'warning', 'success', 'info'])
        .isRequired,
    })
  ).isRequired,
  position: PropTypes.oneOf([
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left',
  ]),
  setToastList: PropTypes.func.isRequired,
  autoDelete: PropTypes.bool,
  autoDeleteTime: PropTypes.number,
};
