import { Button, Card, CardBody, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

const AttastetionCard = ({restaurantId, name, address, isConnected}) => (
  <Card className="max-w-[300px] rounded-sm">
    <CardBody>
      <Image
        src='https://i.ibb.co/x2wzXpr/01-I-m-hacking-at-ETH-Belgrade.jpg'
        alt='ETH Belgrade Hackathon'
        borderRadius='sm'
      />
      <Text className="text-lg mt-5 font-bold">{name}</Text>
      <Text>{address}</Text>
      <Link href={`/place/${restaurantId}`}>
        <Button className="mt-5 w-[100%]">Go to place</Button>
      </Link>
      {
        isConnected &&
        <Link href={`/submit-review/${restaurantId}`}>
          <Button className="mt-5 w-[100%]">Leave a review</Button>
        </Link>
      }
    </CardBody>
  </Card>
);

export default AttastetionCard;