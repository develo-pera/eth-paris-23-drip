import { Button, Card, CardBody, Image, Text } from "@chakra-ui/react";

const AttastetionCard = () => (
  <Card className="max-w-[300px] rounded-sm">
    <CardBody>
      <Image
        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
        alt='Green double couch with wooden legs'
        borderRadius='sm'
      />
      <Text className="text-lg mt-5 font-bold">Restaurant name</Text>
      <Text>Accra, Ghana</Text>
      <Button className="mt-5">Leave a review</Button>
    </CardBody>
  </Card>
);

export default AttastetionCard;