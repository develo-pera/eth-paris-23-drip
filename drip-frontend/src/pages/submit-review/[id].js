import { useState } from "react";
import MainLayout from "@/components/layout/layout";
import {
  Box,
  Textarea,
  Image,
  Text,
  Button,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { storageClient } from "@/lib/web3Storage";

import AssetCard from "./AssetCard";

const SubmitReview = () => {
  const [comment, setComment] = useState("");
  const [review, setReview] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
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
      <div className="container mx-auto my-20">
        <form className="p-4" onSubmit={handleSubmit}>
          <Text className="text-lg mb-10">
            Tell us about your experience
          </Text>
          <Box className="mb-2">Rate:</Box>
          <Slider
            id="slider"
            defaultValue={0}
            min={0}
            max={5}
            colorScheme="teal"
            onChange={(v) => setReview(v)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <SliderMark value={0} mt="1" ml="-2.5" fontSize="sm">
              0
            </SliderMark>
            <SliderMark value={1} mt="1" ml="-2.5" fontSize="sm">
              1
            </SliderMark>
            <SliderMark value={2} mt="1" ml="-2.5" fontSize="sm">
              2
            </SliderMark>
            <SliderMark value={3} mt="1" ml="-2.5" fontSize="sm">
              3
            </SliderMark>
            <SliderMark value={4} mt="1" ml="-2.5" fontSize="sm">
              4
            </SliderMark>
            <SliderMark value={5} mt="1" ml="-2.5" fontSize="sm">
              5
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="teal.500"
              color="white"
              placement="top"
              isOpen={showTooltip}
              label={review}
            >
              <SliderThumb />
            </Tooltip>
          </Slider>
          <Box className="mb-2 h-8" />
          <Textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Comment"
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
              <p className="text-sm mb-1">Add Image</p>
              <AddIcon boxSize={3} />
            </div>
          </div>
          <Box>
            <Button colorScheme="teal" size="sm" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </div>
    </MainLayout>
  );
};

export default SubmitReview;
