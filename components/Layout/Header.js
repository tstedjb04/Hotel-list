import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
      <Wrapper>
        <img src="/static/logo.png" />
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  background: #002240;
`;

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.screen.desktop};
  margin: 0 auto;
  padding: 12px;
`;
