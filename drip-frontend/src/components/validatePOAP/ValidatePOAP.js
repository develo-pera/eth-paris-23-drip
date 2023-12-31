import { useCallback, useState } from "react";
import { useLazyQuery } from "@airstack/airstack-react";
import { Button, Text, Spinner } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import query from "./query";

const eventId = "128613";

const ValidatePOAP = () => {
  const { address } = useAccount();
  const [poapChecked, setPOAPChecked] = useState(false);
  const [resolveIdentity, { data, loading }] = useLazyQuery(query, {
    address,
    eventId,
  });

  const getIdentity = useCallback(async () => {
    setPOAPChecked(true);
    resolveIdentity({ address, eventId });
  }, [resolveIdentity, address]);

  if (!poapChecked) {
    return (
      <div className="mb-10">
        <Text>Prove that you have necessary POAP</Text>
        <div className="mt-5 grid gap-2 md:grid-cols-4">
          <Button
            disabled={loading}
            onClick={getIdentity}
            colorScheme="teal"
            className="flex flex-row gap-6"
          >
            Check POAP {loading && <Spinner size="xs" />}
          </Button>
        </div>
      </div>
    );
  }

  if (data?.Poaps?.Poap) {
    return <Text className="text-lg mb-10" color="green">POAP Confirmed! 🙌</Text>;
  }

  return <Text>We could not confirm your proof of attendance</Text>;
};
export default ValidatePOAP;
