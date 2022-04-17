import './App.css';
import styled, { createGlobalStyle } from 'styled-components';
import MainApp from './components/MainApp';
import { Desktop, Mobile, Tablet } from './utils/Responsive';
import MetaTag from './utils/MetaTag';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    /* background: #e9ecef; */
    margin: 0;
    padding: 0;
    font-size: 16px;
    overflow: hidden; // disable to bounce effect in safari
    
  }
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  overflow: hidden; //
`;
function App() {
  const meta = { title: 'Documentation' };

  // const location = useLocation();
  // const path = location.pathname;

  // useEffect(() => {
  //   ReactGA.initialize('G-NT3JEGCF5K');
  //   // ReactGA.send({ hitType: 'pageview', page: path });
  //   // console.log(path); ////////
  // }, []);

  // useEffect(() => {
  //   // ReactGA.initialize('G-NT3JEGCF5K');
  //   ReactGA.send({ hitType: 'pageview', page: path });
  // });

  return (
    <Container>
      <MetaTag meta={meta} />
      <GlobalStyle />
      <Desktop>
        <MainApp responsive={'desktop'} collapsedDefault={false} />
      </Desktop>
      <Tablet>
        <MainApp responsive={'tablet'} collapsedDefault={false} />
      </Tablet>
      <Mobile>
        <MainApp responsive={'mobile'} collapsedDefault={true} />
      </Mobile>
      {/* <Mobile>
        <MainApp responsive={'default'} collapsedDefault={false} />
      </Mobile> */}
    </Container>
  );
}

export default App;
