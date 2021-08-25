import styled from 'styled-components';

// border-left é colocado dentro fora do hover para depois ser modificado depois para
// que o espaço para ela já exista previamente e que não ocorra nenhuma alteração
// da posição dos itens dentro da div
export const Restaurant = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  margin-top: 5px;
  padding: 16px;
  background-color: #ffffff;
  border-left: 5px solid transparent;
  :hover {
    background-color: ${(props) => props.theme.colors.background};
    border-left-color: ${(props) => props.theme.colors.primary};
  }
`;

export const RestaurantInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text};
  font-size: 24px;
  font-weight: bold;
  line-height: 29px;
  margin-bottom: 10px;
`;

export const Address = styled.span`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text};
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const RestaurantImage = styled.img`
  display: ${(props) => (props.imageLoaded ? 'block' : 'none')};
  width: 100px;
  height: 100px;
  margin-left: 6px;
  object-fit: cover;
  border-radius: 5px;
`;
