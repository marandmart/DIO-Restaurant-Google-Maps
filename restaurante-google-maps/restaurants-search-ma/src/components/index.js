// É exportado como variável Card o que foi exportado como default no imageCard, ou seja, o que foi exportado como ImageCard no index.jsx dentro
// da pasta ImageCard aqui está sendo exportado como Card. Assim pode-se importar dentro do index.js simplesmente como:
// import { Card } from 'components';

export { default as Card } from './ImageCard';
export { default as RestaurantCard } from './RestaurantCard';
export { default as Modal } from './Modal';
export { default as Map } from './Map';
export { default as Loader } from './Loader';
export { default as Skeleton } from './Skeleton';
