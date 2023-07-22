import { Button, Card, CardBody, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

const AttastetionCard = ({restaurantId, name, address, isConnected}) => (
  <Card className="max-w-[300px] rounded-sm">
    <CardBody>
      <Image
        src='https://i0.wp.com/thegoodlifefrance.com/wp-content/uploads/2016/02/alain-ducasse-plaza-athenee-paris.jpg?ssl=1'
        alt='Paris restourrant'
        borderRadius='sm'
      />
      <Text className="text-lg mt-5 font-bold">{name}</Text>
      <Text>{address}</Text>
      {
        isConnected &&
        <Link href={`/submit-review/${restaurantId}`}>
          <Button className="mt-5">Leave a review</Button>
        </Link>
      }
    </CardBody>
  </Card>
);

export default AttastetionCard;