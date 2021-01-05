import styled from 'styled-components';
// components
import { Header, Input, Button, Form } from '../components';
// images
import notesImage from '../assets/images/notes_image.svg';

export const Home = () => {
  return (
    <>
      <Header />
      <StyledMain>
        <StyledRow>
          <StyledCol>
            <StyledHeading>Login to Notedo</StyledHeading>
            <StyledFormWrapper>
              <Form>
                <Input
                  name='email'
                  label='E-mail:'
                  id='email'
                  type='email'
                  required
                />
                <Input
                  name='password'
                  label='Password:'
                  id='password'
                  type='password'
                  required
                />
                <Button size='small' label='Login' type='submit' />
              </Form>
            </StyledFormWrapper>
          </StyledCol>
          <StyledCol>
            <StyledImage src={notesImage} />
            <StyledHeading2>Notedo will save Your thoughts</StyledHeading2>
            <StyledText>
              Notedo is tool that allows you to add, edit and delete notes in
              any time you want.
            </StyledText>
          </StyledCol>
        </StyledRow>
      </StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  margin-top: 3rem;
`;
const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 1.6rem;
`;
const StyledCol = styled.div`
  width: 100%;
  padding: 0 1rem 3rem;
  @media screen and (min-width: 676px) {
    flex: 1;
  }
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
const StyledFormWrapper = styled.div`
  width: 100%;
  max-width: 34rem;
`;
const StyledImage = styled.img`
  display: block;
  width: 100%;
  max-width: 34rem;
`;
const StyledHeading2 = styled.h2`
  font-size: ${({ theme: { fontSize } }) => fontSize.m};
  color: ${({ theme: { color } }) => color.black};
`;
const StyledText = styled.p`
  color: ${({ theme: { color } }) => color.grey};
`;
