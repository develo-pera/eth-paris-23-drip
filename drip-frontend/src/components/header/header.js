import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import ConnectModal from "@/components/connectModal/connectModal";
import Link from "next/link";

const Header = () => {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  const openConnectModal = () => setIsConnectModalOpen(true);
  const closeConnectModal = () => setIsConnectModalOpen(false);

  return (
    <>
      <div className="container mx-auto p-4 flex items-center justify-between">
        <Link href="/">
          <Text>DRIPvisor</Text>
        </Link>
        <div className="flex items-center justify-between gap-10">
          <a>Join as restaurant</a>
          <Button onClick={openConnectModal} size="lg">Connect</Button>
        </div>
      </div>
      <ConnectModal isOpen={isConnectModalOpen} handleClose={closeConnectModal} />
    </>
  );
}

export default Header;