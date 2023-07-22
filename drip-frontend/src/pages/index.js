import { Input } from "@chakra-ui/react";
import MainLayout from "@/components/layout/layout";
import RestaurantCard from "@/components/reastaurantCard/reastaurantCard";
import AttastetionCard from "@/attastetionCard/attastetionCard";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const { address } = useAccount();
  const [restaurants, setRestaurants] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurants`);
      const responseJson = await response.json();
      setRestaurants(responseJson);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <Input className="mx-auto block" maxW={960} placeholder="Search for place" />
      </div>
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {
          restaurants &&
          restaurants.map((res, i) => <AttastetionCard key={i} restaurantId={res.id} name={res.name} address={res.address} isConnected={address} />)
        }
      </div>
    </MainLayout>
  )
}
