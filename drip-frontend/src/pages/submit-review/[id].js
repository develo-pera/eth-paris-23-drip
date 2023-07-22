import { useState } from "react";
import MainLayout from "@/components/layout/layout";
import {
  Box,
  Textarea,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const SubmitReview = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  return (
    <MainLayout>
      <Box className="p-4">
        <Text className="container mx-auto px-4 py-20">
          Tell us about your experience
        </Text>
        <Textarea
          value={value}
          onChange={handleInputChange}
          placeholder="Here is a sample placeholder"
          size="sm"
        />
        <Box className="mb-2" />
        <Box>
          <Button colorScheme="teal" size="sm" onClick={onOpen}>
            <AddIcon /> <Box className="inline ml-2">Add images</Box>
          </Button>
        </Box>
        <Box className="mb-2" />
        <Box>
          <Button colorScheme="teal" size="sm">
            Submit
          </Button>
        </Box>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>file import here</ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </MainLayout>
  );
};

export default SubmitReview;
