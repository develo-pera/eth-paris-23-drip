import MainLayout from "@/components/layout/layout";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { request, gql } from 'graphql-request'


const Profile = () => {
  const router = useRouter();
  const [token, setToken] = useState();
  const fetchData = async () => {
    const document = gql`
        {
            tokenMinteds(where: {to: "${router.query.id}"}) {
                id
                tokenURI
            }
        }
    `
    const resp = await request('https://api.studio.thegraph.com/query/49180/drip/v0.0.1', document);
    console.log(resp);
    const tokenMetadataBase64 = resp.tokenMinteds[0].tokenURI.split(",")[1];
    const tokenMetadata = atob(tokenMetadataBase64)
    setToken(JSON.parse(tokenMetadata));
    console.log(tokenMetadata);
    // const response = await core.client.qn_fetchNFTs({
    //   wallet: router.query.id,
    //   contracts: ["0xa80b872eb9efd9FCD7F043f3c2eC5701c2FA308e"],
    //   perPage: 1,
    // });
    //
    // console.log(response);
  }

  useEffect(() => {
    if (!router?.query?.id) return;
    fetchData();
  }, [router])

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <img className="max-w-[400px] mx-auto block" src={token?.image_data} alt=""/>
      </div>
    </MainLayout>
  );
}

export default Profile;