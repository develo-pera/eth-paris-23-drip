import MainLayout from "@/components/layout/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, Image, Text } from "@chakra-ui/react";

const Place = () => {
  const router = useRouter();
  const [place, setPlace] = useState();
  const [reviews, setReviews] = useState();
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurant/${router.query.id}`);
      const responseJson = await response.json();
      console.log(responseJson);
      setPlace(responseJson);

      const reviewResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurant/${router.query.id}/reviews`);
      const reviewResponseJson = await reviewResponse.json();
      console.log(reviewResponseJson);
      setReviews(reviewResponseJson);
  }

  useEffect(() => {
    if (!router) return;
    fetchData();
  }, [router]);

  return (
    <MainLayout>
      <div className="container mx-auto my-20">
        <div className="w-[100%] h-[244px] bg-[url('https://i.ibb.co/x2wzXpr/01-I-m-hacking-at-ETH-Belgrade.jpg')] bg-cover mb-10" />
        <Text className="">Total score: {reviews?.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.score
        }, 0)} ({reviews?.length} reviews)</Text>
        <Text className="text-xl">{place?.name}</Text>
        <Text>Address: {place?.address}</Text>

        <div className="mt-10">
          <Text className="text-lg font-bold mb-5">Reviews:</Text>
          {
            reviews &&
            reviews?.map((review, i) => (
              <Card className="p-10 mb-5" key={i}>
                <Text>Score: {review.score}</Text>
                <Text>Comment: {review.comment}</Text>
              </Card>
            ))
          }
        </div>
      </div>
    </MainLayout>
  )
};

export default Place;