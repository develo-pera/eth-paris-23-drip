import { Box, Image, Text } from "@chakra-ui/react";

import MainLayout from "@/components/layout/layout";

const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const mock = {
  id: 1,
  name: "Restaurant 1",
  image: "https://via.placeholder.com/300x300",
  averageRating: 4.5,
  numberOfReviews: 100,
  address: "123 Main St, New York, NY 10001",
  phone: "(212) 555-1234",
  website: "https://www.restaurant1.com",
  listOfReviews: [
    {
      id: 1,
      rating: 4.3,
      title: "Great food",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nib",
      timestamp: "2021-08-01T00:00:00.000Z",
      images: [
        {
          id: 1,
          url: "https://via.placeholder.com/300x300",
        },
        {
          id: 2,
          url: "https://picsum.photos/200",
        },
      ],
      user: {
        id: 1,
        name: "developera.eth",
        avatar: "https://via.placeholder.com/150x150",
      },
    },
    {
      id: 1,
      rating: 4.4,
      title: "Great food",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nib",
      timestamp: "2021-08-01T00:00:00.000Z",
      images: [
        {
          id: 3,
          url: "https://via.placeholder.com/300x300",
        },
        {
          id: 4,
          url: "https://picsum.photos/200",
        },
      ],
      user: {
        id: 2,
        name: "abena.eth",
        avatar: "https://via.placeholder.com/150x150",
      },
    },
  ],
};

const RestaurantReview = () => (
  <MainLayout>
    <Image src={mock.image} className="w-full" />
    <Box className="container p-4">
      <Text className="text-2xl font-bold pb-10">{mock.name}</Text>
      <Box className="flex flex-row gap-2">
        <Text className="text-lg font-bold">{mock.averageRating}</Text>
        <Text className="text-lg">{mock.numberOfReviews} Reviews</Text>
      </Box>
      <Text className="text-lg">{mock.address}</Text>
      <Text className="text-lg">{mock.phone}</Text>
      <Text className="text-lg">{mock.website}</Text>
    </Box>

    <Box>
      {mock.listOfReviews.map((review) => (
        <Box
          key={review.id}
          className="w-full p-4 border-b-stone-100 border-b-2"
        >
          <Box className="pb-4 flex flex-row justify-start items-center gap-2">
            <Image src={review.user.avatar} className="w-12 rounded-full" />
            <Box>
              <Text className="text-lg font-bold">{review.user.name}</Text>
              <Text className="text-md ">
                {formatDateTime(review.timestamp)}
              </Text>
            </Box>
          </Box>
          <Text className="text-2xl font-bold">{review.title}</Text>
          <Text className="text-lg">{review.comment}</Text>
          <Box className="flex flex-row gap-2">
            <Text className="text-lg font-bold">{review.rating}</Text>
            <Text className="text-lg">{review.user.name}</Text>
          </Box>
          <Box className="flex flex-row gap-4 w-full">
            {review.images.map((image) => (
              <Box className="w-20 h-20 rounded-lg overflow-hidden">
                <Image key={image.id} src={image.url} />
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  </MainLayout>
);

export default RestaurantReview;
