import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { createBrotliDecompress } from 'zlib';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onClose, onOpen } = useDisclosure()

  // TODO SELECTED IMAGE URL STATE
  const [imageSelected, setImageSelected] = useState('')

  function handleSelectedImage(urlImg: string) {
    setImageSelected(urlImg)
    onOpen();
  }

  // TODO FUNCTION HANDLE VIEW IMAGE
  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid columns={3} columnGap="40px" rowGap="40px">
        {cards.map(card => {
          return (
            <Card key={card.id} data={card} viewImage={() => handleSelectedImage(card.url)} />
          );
        })}
      </SimpleGrid>
      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage onClose={onClose} isOpen={isOpen} imgUrl={imageSelected} />
    </>
  );
}
