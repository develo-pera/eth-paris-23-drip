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
import { storageClient } from "@/lib/web3Storage";

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

  const saveFormToDatabase = async (assetsJsonCids) => {
    const data = {
      comment,
      assets: assetsJsonCids,
    };
  };

  const handleCommentChange = (e) => {
    let inputValue = e.target.value;
    setComment(inputValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uncompleteAssetsInAssetArray = !!assets.find(
      (asset) => asset.file === null || asset.file?.name === ""
    );

    if (uncompleteAssetsInAssetArray) {
      return alert("Validation error! All fields must be populated");
    }

    // TODO: Save project and data in database
    const uploadPromises = assets.map(async (asset) => {
      const cid = await storageClient.put([asset.file]);
      const nftJsonObject = {
        name: asset.name,
        image: `ipfs://${cid}/${asset.file.name}`,
      };
      const blob = new Blob([JSON.stringify(nftJsonObject)], {
        type: "application/json",
      });
      const nftJsonCid = await storageClient.put([
        new File([blob], "metadata.json"),
      ]);
      return nftJsonCid;
    });

    const assetsJsonCids = await Promise.all(uploadPromises);
    console.log(assetsJsonCids);
    saveFormToDatabase(assetsJsonCids);
    // TODO: Save project and data in database
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
