import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import ConnectModal from "@/components/connectModal/connectModal";
import Link from "next/link";
import { useAccount } from "wagmi";

const Header = () => {
  const { address } = useAccount();
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  const openConnectModal = () => setIsConnectModalOpen(true);
  const closeConnectModal = () => setIsConnectModalOpen(false);

  return (
    <>
      <div className="container mx-auto p-4 flex items-center justify-between">
        <Link href="/">
          <div className="max-w-[50px] flex items-center">
            <img src="https://nouns.wtf/static/media/noggles.7644bfd0.svg" alt="Nouns logo" />
            <Text className="text-lg">DRIP</Text>
          </div>
        </Link>
        {
          address ? (
            <Link href={`/user/${address}`}>
              <Text className="p-3 bg-gray-100 rounded-sm">{`${address.slice(0, 7)}...${address.slice(-5)}`}</Text>
            </Link>
          ) : (
          <div className="flex items-center justify-between gap-10">
            {/*<a>Join as place</a>*/}
            <Button onClick={openConnectModal} size="lg">Connect</Button>
          </div>
          )
        }
      </div>
      <ConnectModal isOpen={isConnectModalOpen} handleClose={closeConnectModal} />
    </>
  );
}

export default Header;