import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';
import React from 'react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  const handleCloseModal = (): void => {
    onClose();
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      isCentered
      size="4xl"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent bgColor="pGray.800">
        <ModalBody p={0} >
          <Image src={imgUrl} alt="image photo" w="100%" maxW={900} h={600} objectFir="cover" />
        </ModalBody>
        <ModalFooter >
          <Link target="_blank" href={imgUrl} >
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
