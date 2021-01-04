import styled from 'styled-components';
import { Button } from './';

export const Header = () => {
  return (
    <StyledHeader>
      <StyledTitle>Notedo</StyledTitle>
      <StyledWrapper>
        <Button variant='secondary' size='small' label='Register' />
      </StyledWrapper>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  padding: 1.2rem 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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

const StyledWrapper = styled.div`
  & :first-child {
    margin-right: 1rem;
  }
`;
