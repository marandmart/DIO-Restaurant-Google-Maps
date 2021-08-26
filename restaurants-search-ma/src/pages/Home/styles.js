import styled from 'styled-components';

import Slider from 'react-slick';

// Engloba a página inteira
export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

// Container com todo o conteúdo da side-bar da página
export const Container = styled.aside`
  background-color: ${(props) => props.theme.colors.background};
  width: 400px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

// Características de estilo do mapa. Os 400px abaixo são referentes ao width do Container
export const MapContainerStyles = {
  width: 'calc(100% - 400px)',
  height: '100%',
};

export const InnerMapStyles = {
  width: '100%',
  height: '100%',
};

// Estilos para a região onde ficam a imagem e o campo de pesquisa
export const Search = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  padding: 16px;
`;

// Estilos para a imagem Resturant Finder
export const Logo = styled.img`
  margin-bottom: 20px;
`;

export const CarouselTitle = styled.h1`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text};
  font-size: 24px;
  font-weight: bold;
  line-height: 29px;
  margin: 16px 0;
`;

// quando se estiliza um componente, o mesmo deve ser fornecido entre parentesis.
// Se fosse uma tag, seria necessário somente o ponto
export const Carousel = styled(Slider)`
  .slick-slide {
    margin-right: 30px;
  }
`;

// formatação da informação dentro do modal
export const ModalTitle = styled.p`
  margin-bottom: 10px;
  letter-spacing: 0.11px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text};
  line-height: 29px;
  font-size: 24px;
  font-weight: bold;
`;

export const ModalContent = styled.p`
  margin-bottom: 10px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text};
  font-weight: normal;
  line-height: 19px;
  font-size: 16px;
`;
