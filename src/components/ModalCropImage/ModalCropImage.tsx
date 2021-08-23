import React, { useCallback, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import Cropper from "react-easy-crop";

import { Button } from "../Button/Button";
import { ButtonsGroup } from "../ButtonsGroup/ButtonsGroup";

import { getCroppedImg } from "../../utils";

import styles from "./modal-crop-image.module.scss";

interface IModalCropImageProps {
  closePortal: VoidFunction;
  setPreviewImage: (src: string) => void;
  setCroppedImage: (src: string) => void;
  previewImage: string;
}

export const ModalCropImage: React.FC<IModalCropImageProps> = ({
  closePortal,
  setPreviewImage,
  setCroppedImage,
  previewImage,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropError, setCropError] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = async () => {
    if (croppedAreaPixels.width < 200 || croppedAreaPixels.height < 200) {
      setCropError("Image cannot be less than 200x200");
      return;
    }
    setCropError("");
    const croppedImage = await getCroppedImg(previewImage, croppedAreaPixels);
    setPreviewImage(croppedImage);
    setCroppedImage(croppedImage);
    closePortal();
  };

  return (
    <ClickAwayListener onClickAway={closePortal}>
      <div className={styles.Modal}>
        <div className={styles.CropperContainer}>
          <Cropper
            image={previewImage}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <ButtonsGroup>
          <Button
            component="button"
            variant="outlined"
            color="dark"
            onClick={showCroppedImage}
          >
            crop
          </Button>
          <Button
            component="button"
            variant="outlined"
            color="dark"
            onClick={closePortal}
          >
            cancel
          </Button>
        </ButtonsGroup>
        {cropError && <small className={styles.Error}>{cropError}</small>}
      </div>
    </ClickAwayListener>
  );
};
