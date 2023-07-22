import { Input, HStack } from "@chakra-ui/react";
import MainLayout from "@/components/layout/layout";
import RestaurantCard from "@/components/reastaurantCard/reastaurantCard";

export default function Home() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <Input className="mx-auto block" maxW={960} placeholder="Search for place" />
      </div>
      <div className="container mx-auto px-4 grid grid-cols-4 gap-10">
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
        <RestaurantCard />
      </div>
    </MainLayout>
  )
}
