import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, } from "@chakra-ui/react";

const ConnectModal = ({isOpen, handleClose}) => (
  <Modal isOpen={isOpen} onClose={handleClose}>
    <ModalOverlay />
    <ModalContent className="py-10 px-4">
      <ModalCloseButton />
      <ModalBody>
        <div className="grid gap-2 mt-10">
          <Button size="lg">Connect with Biconomy</Button>
          <Button size="lg">Connect with Metamask</Button>
        </div>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default ConnectModal;