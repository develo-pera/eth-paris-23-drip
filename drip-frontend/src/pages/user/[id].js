import MainLayout from "@/components/layout/layout";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/router";


const Profile = () => {
  const router = useRouter();
  const fetchData = async () => {
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

      </div>
    </MainLayout>
  );
}

export default Profile;