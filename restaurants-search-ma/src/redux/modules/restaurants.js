export const Types = {
  SET_RESTAURANTS: 'restaurants/SET_RESTAURANTS', // usado para armazenar os restaurantes encontrados pela busca
  SET_RESTAURANT: 'restaurants/SET_RESTAURANT', // restaurant a ser carregada na modal
};

const initialState = {
  restaurants: [],
  restaurantSelected: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_RESTAURANTS:
      return { ...state, restaurants: action.payload };
    case Types.SET_RESTAURANT:
      return { ...state, restaurantSelected: action.payload };
    default:
      return state;
  }
}

export function setRestaurants(restaurants) {
  return {
    type: Types.SET_RESTAURANTS,
    payload: restaurants,
  };
}

export function setRestaurant(restaurant) {
  return {
    type: Types.SET_RESTAURANT,
    payload: restaurant,
  };
}

// fluxo: o usuário clica em um botão, uma action é disparada pelo dispatch, chega em setRestaurants que retorna um objeto
// que por sua vez aciona o reducer, cai no switch case apropridado e então modifica o estado
