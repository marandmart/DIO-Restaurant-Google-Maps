import React, { useEffect } from 'react';

import Portal from './Portal';

import { Overlay, Dialog } from './styles';

// open -> booleano que determina quando o Modal deve ou não estar à mostra
// onClose -> função que manipula o estado de aberto ou fechado da modal
const Modal = ({ children, open, onClose }) => {
  // por padrão, deve-se sempre declarar os hooks no topo do componente
  // similar ao componentDidMount e componentDidUpdate
  useEffect(() => {
    function onEsc(e) {
      if (e.keyCode === 27) onClose();
    }

    window.addEventListener('keydown', onEsc);

    // ao retornar uma função, faz-se o papel do componentWillUnmount
    // isso serve para que o navegador não continue a ficar escutando o evento de apertar a tecla Esc
    return () => {
      window.removeEventListener('keydown', onEsc);
    };
    // serve para que o hook preste atenção em mudanças que ocorram nessa função
  }, [onClose]);

  if (!open) return null;

  // serve para fechar a mensagem ao clicar fora do campo de mensagem e dentro da modal
  function onOverlayClick() {
    onClose();
  }
  // evita propagação do evento ao clicar no dialog (event bubbling), assim clicar dentro da Dialog não causa o fechamento
  // da mesma
  function onDialogCLick(e) {
    e.stopPropagation();
  }
  return (
    <Portal>
      <Overlay onClick={onOverlayClick}>
        <Dialog onClick={onDialogCLick}>{children}</Dialog>
      </Overlay>
    </Portal>
  );
};

export default Modal;
