import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, } from "@chakra-ui/react";
import { MetaMaskSDK } from "@metamask/sdk";

const MMSDK = new MetaMaskSDK({dappMetadata: {name: "DRIP app"}});

const ConnectModal = ({isOpen, handleClose}) => {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const connectMetamask = async () => {
    await connect();
    handleClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent className="py-10 px-4">
        <ModalCloseButton />
        <ModalBody>
          <div className="grid gap-2 mt-10">
            <Button size="lg">Connect with Biconomy</Button>
            <Button onClick={connectMetamask} size="lg">Connect with Metamask</Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ConnectModal;