import { useLazyQuery } from "@airstack/airstack-react";
import { Button, Text, Spinner } from "@chakra-ui/react";

import query from "./query";
import { useAuth } from "@/context/auth";
import { useCallback, useEffect } from "react";

const eventId = "128613";

const ValidatePOAP = () => {
  const { auth } = useAuth();
  const [resolveIdentity, { data, loading }] = useLazyQuery(query);

  const getIdentity = useCallback(async () => {
    const id = await resolveIdentity(
      { address: auth.address, eventId },
      { cache: false }
    );
  }, [resolveIdentity, auth]);

  useEffect(() => {
    if (auth) {
      setAddress(auth.address);
    }
  }, [auth]);

  if (data) {
    return <Text>POAP Confirmed!</Text>;
  }

  return (
    <div className="mb-10">
      <Text>Prove that you have POAP</Text>
      <div className="mt-5 grid gap-2 md:grid-cols-4">
        <Button disabled={loading} onClick={getIdentity} colorScheme="teal">
          Get POAP {loading && <Spinner size="xs" />}
        </Button>
      </div>
    </div>
  );
};
export default ValidatePOAP;
