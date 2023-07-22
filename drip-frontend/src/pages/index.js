import { Input } from "@chakra-ui/react";
import MainLayout from "@/components/layout/layout";
import RestaurantCard from "@/components/reastaurantCard/reastaurantCard";
import AttastetionCard from "@/attastetionCard/attastetionCard";

export default function Home() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <Input className="mx-auto block" maxW={960} placeholder="Search for place" />
      </div>
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        <AttastetionCard />
        <AttastetionCard />
        <AttastetionCard />
        <AttastetionCard />
      </div>
    </MainLayout>
  )
}
