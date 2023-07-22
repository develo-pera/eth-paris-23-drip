import { Box, Image, Text } from "@chakra-ui/react";

import MainLayout from "@/components/layout/layout";
import Link from "next/link";

const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const mock = [
  {
    id: 1,
    name: "Restaurant 1",
    image: "https://via.placeholder.com/300x300",
    lastVisited: "2021-08-01T00:00:00.000Z",
    address: "123 Main St, New York, NY 10001",
  },
  {
    id: 2,
    name: "Restaurant 2",
    image: "https://via.placeholder.com/300x300",
    lastVisited: "2021-08-01T00:00:00.000Z",
    address: "123 Main St, New York, NY 10001",
  },
  {
    id: 3,
    name: "Restaurant 3",
    image: "https://via.placeholder.com/300x300",
    lastVisited: "2021-08-01T00:00:00.000Z",
    address: "123 Main St, New York, NY 10001",
  },
  {
    id: 4,
    name: "Restaurant 4",
    image: "https://via.placeholder.com/300x300",
    lastVisited: "2021-08-01T00:00:00.000Z",
    address: "123 Main St, New York, NY 10001",
  },
];

const Attestations = () => (
  <MainLayout>
    <Box className="p-4">
      <Text className="text-2xl font-bold pb-10">Attestations</Text>
      <Box className="w-full flex flex-row flex-wrap gap-4">
        {mock.map((restaurant) => (
          <Box
            key={restaurant.id}
            className="rounded-2xl w-72 border border-gray-100 overflow-hidden"
          >
            <Box className="flex justify-center">
              <Image
                className="w-full"
                src={restaurant.image}
                alt={restaurant.name}
              />
            </Box>
            <Box className="flex flex-col px-4 pb-4">
              <Text className="text-lg font-bold pt-4">{restaurant.name}</Text>
              <Text className="text-sm">
                Visited {formatDateTime(restaurant.lastVisited)}
              </Text>
              <Text className="text-sm">{restaurant.address}</Text>
              <Link
                href={`/restaurant-review/${restaurant.id}`}
                className="w-3/4 bg-orange-500 text-orange-200 rounded-full flex justify-center items-center py-2 px-4 mt-4"
              >
                Leave a review
              </Link>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  </MainLayout>
);

export default Attestations;
