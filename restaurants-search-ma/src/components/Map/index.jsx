import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // useDispatch - usado para fazer o dispatch das actions
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

import { setRestaurants, setRestaurant } from '../../redux/modules/restaurants';

export const MapContainer = (props) => {
  /* eslint-disable */
  const dispatch = useDispatch();
  // retorna o state dentro de ../../redux/modules/restaurants com as propriedades restaurants e restaurantSelected
  const { restaurants } = useSelector((state) => state.restaurants);
  const [map, setMap] = useState(null);
  // as funções das bibliotecas places e maps api
  const { google, query, placeId, containerStyle, styles, onClickMarker } = props;

  // utilizado para quando houver mudança na query, re-renderizar o map com busca baseada na query
  useEffect(() => {
    if (query) {
      searchByQuery(query);
    }
  }, [query]);

  // notar que podem ser utilizados mais de um useEffect no código
  // é algo bom separar os useEffect por contexto para deixar o código mais organizado
  useEffect(() => {
    if (placeId) {
      getRestaurantById(placeId);
    }
  }, [placeId]);

  // funciona similarmente a search by query, só que com um dataset diferente
  // utiliza o placeId para solicitar as informações do item selecionado e então
  // faz o dispatch da ação no redux
  function getRestaurantById(placeId) {
    const service = new google.maps.places.PlacesService(map);

    // serve para limpar antes os resultados anteriores para quando o usuário clicar, esses resultados não sejam vistos
    dispatch(setRestaurant(null));

    const request = {
      placeId,
      fields: ['name', 'opening_hours', 'formatted_address', 'formatted_phone_number'],
    };

    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        dispatch(setRestaurant(place));
      }
    });
  }

  // faz a busca da informação dos restaurantes nas redondezas pelo query feito pelo usuário
  function searchByQuery(query) {
    const service = new google.maps.places.PlacesService(map);

    // limpa os resultados anteriores
    dispatch(setRestaurants([]));

    const request = {
      location: map.center,
      radius: '200',
      type: ['restaurant'],
      query,
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        dispatch(setRestaurants(results));
      }
    });
  }

  // função para fazer as buscar no mapa. map pina os locais e center é a propriedade de centralização dentro do
  // próprio map
  function searchNearby(map, center) {
    const service = new google.maps.places.PlacesService(map);

    // serve para limpar os resultados do carrosel, em conjunto com mostrar o efeito de carregamento de conteudo do Loader
    dispatch(setRestaurants([]));

    const request = {
      location: center,
      radius: '20000', // em metros
      type: ['restaurant'], // o places é uma API para busca de lugares. Para filtrar para restaurantes, passa-se o type
    };

    service.nearbySearch(request, (results, status) => {
      // string a que se está igualando o status está presente dentro dentro da documentacao do google
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // usa o dispatch para passar os resultados da busca para a função setRestaurants
        dispatch(setRestaurants(results));
      }
    });
  }

  // usado para fazer a busca pelo place service
  function onMapReady(_, map) {
    setMap(map);
    searchNearby(map, map.center);
  }

  function clickMarkerShowInfo(restaurant) {
    onClickMarker(restaurant);
    getRestaurantById(restaurant.place_id);
  }

  // a propriedade google faz com que o conteúdo renderize no mapa. Pega as funções, a APIkey, etc
  // e centerAroundCurrentLocation faz com que o mapa carregue aproximadade próximo do local onde o usuário estiver localizado

  return (
    <Map
      google={google}
      styles={styles}
      containerStyle={containerStyle}
      centerAroundCurrentLocation
      onReady={onMapReady}
      onRecenter={onMapReady}
      {...props}>
      {/* restaurants é o array de restaurantes que vai estar no objeto global. Se encontra na variável results */}
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.place_id}
          name={restaurant.name}
          onClick={() => clickMarkerShowInfo(restaurant)}
          position={{
            lat: restaurant.geometry.location.lat(),
            lng: restaurant.geometry.location.lng(),
          }}
        /> // o key em Marker não é uma função do react, é aquele que serve para identificar cada objeto na tela
      ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  language: 'pt-BR',
})(MapContainer);
