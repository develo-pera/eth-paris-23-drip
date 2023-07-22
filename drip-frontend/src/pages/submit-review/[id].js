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

import AssetCard from "./AssetCard";

const SubmitReview = () => {
  const [comment, setComment] = useState("");
  const [assets, setAssets] = useState([]);

  const createAssetCard = () =>
    setAssets((prevState) => [...prevState, { file: null, name: "" }]);
  const handleAssetCardInputChange = (field, index, value) => {
    const newAssetsArray = assets.map((asset, i) => {
      if (i == index) {
        return {
          ...asset,
          [field]: value,
        };
      }

      return asset;
    });

    setAssets(newAssetsArray);
  };

  const handleCommentChange = (e) => {
    let inputValue = e.target.value;
    setComment(inputValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", comment);
    assets.forEach((file, i) => {
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
        {assets.map((asset, index) => (
          <AssetCard
            key={index}
            index={index}
            assetObject={asset}
            handleAssetCardInputChange={handleAssetCardInputChange}
          />
        ))}

        <div className="my-10">
          <div
            onClick={createAssetCard}
            className="py-9 px-4 rounded-lg text-center hover:cursor-pointer"
          >
            <p className="text-sm mb-1">Add asset</p>
            <AddIcon boxSize={3} />
          </div>
        </div>
        <Box>
          <Button colorScheme="teal" size="sm" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </MainLayout>
  );
};

export default SubmitReview;
