import { useState } from "react";
import MainLayout from "@/components/layout/layout";
import {
  Box,
  Textarea,
  Image,
  Text,
  Button,
  Input,
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
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState([]);
  const handleFileChange = (event) => {
    if (!event.target.files) return;
    // setFile(event.target.files[0]);
    setFiles([...files, ...event.target.files]);
  };

  const handleCommentChange = (e) => {
    let inputValue = e.target.value;
    setComment(inputValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("file", file);
    // formData.append("fileName", file.name);
    formData.append("comment", comment);
    files.forEach((file, i) => {
      data.append(`file-${i}`, file, file.name);
    });
    console.log("??? submitted", formData.get("file-0"));
  };

  return (
    <MainLayout>
      <form className="p-4" onSubmit={handleSubmit}>
        <Text className="container mx-auto px-4 py-20">
          Tell us about your experience
        </Text>
        <Textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Here is a sample placeholder"
          size="sm"
        />
        <Box className="mb-2" />
        {files.map((file) => (
          <Box key={file.name}>
            <Text>{file.name}</Text>
            <Image src={URL.createObjectURL(file)} />
          </Box>
        ))}
        <Box className="mb-2" />
        <Box>
          <Button colorScheme="teal" size="sm" onClick={onOpen}>
            <AddIcon /> <Box className="inline ml-2">Add images</Box>
          </Button>
        </Box>
        <Box>
          <Button colorScheme="teal" size="sm" type="submit">
            Submit
          </Button>
        </Box>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              file import here
              <Input
                type="file"
                placeholder="Upload photo"
                onChange={handleFileChange}
                multiple
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </MainLayout>
  );
};

export default SubmitReview;
