import { Input } from "@chakra-ui/react";

const AssetCard = ({ index, assetObject, handleAssetCardInputChange }) => {
  const handleFileChange = (e) =>
    handleAssetCardInputChange("file", index, e.target.files[0]);
  const handleNameChange = (e) =>
    handleAssetCardInputChange("name", index, e.target.value);

  return (
    <div className="p-9 my-10 rounded-lg">
      {assetObject.file && (
        <img src={URL.createObjectURL(assetObject.file)} alt="Photo" />
      )}
      <Input className="my-5" onChange={handleFileChange} type="file" />
    </div>
  );
};

export default AssetCard;
