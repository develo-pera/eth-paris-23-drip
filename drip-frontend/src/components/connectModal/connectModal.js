import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { MetaMaskSDK } from "@metamask/sdk";

import { useAuth } from "@/context/auth";

const MMSDK = new MetaMaskSDK({ dappMetadata: { name: "DRIP app" } });

const ConnectModal = ({ isOpen, handleClose }) => {
  const { auth, setAuth } = useAuth();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
    onSuccess: (data) => onMetamaskConnect(data),
  });

  const onMetamaskConnect = async (data) => {
    setAuth(data.account);
    const userRepsonse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${data.account}`
    );
    const userResponseJson = await userRepsonse.json();

    console.log(userResponseJson);

    if (!userResponseJson) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              address: data.account,
            }),
          }
        );
        const responseJson = await response.json();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const connectMetamask = async () => {
    try {
      await connect();

      handleClose();
    } catch (e) {
      console.log("something went wrong");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent className="py-10 px-4">
        <ModalCloseButton />
        <ModalBody>
          <div className="grid gap-2 mt-10">
            <Button size="lg">Connect with Biconomy</Button>
            <Button onClick={connectMetamask} size="lg">
              Connect with Metamask
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConnectModal;
