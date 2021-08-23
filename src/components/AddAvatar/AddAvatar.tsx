import React, { ChangeEvent } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import classnames from "classnames";

import { NewProductFormInputs } from "../ProductForm/ProductForm";

import styles from "./add-avatar.module.scss";
import { useEffect } from "react";
import { getBase64 } from "../../utils";

interface IAddAvatarProps {
  register: UseFormRegister<NewProductFormInputs>;
  openPortal: VoidFunction;
  setValue: any;
  setError: any;
  clearErrors: any;
  watch: (field: string) => [] | File[];
  errors: FieldErrors<NewProductFormInputs>;
  previewImage: string | null;
}

export const AddAvatar: React.FC<IAddAvatarProps> = ({
  register,
  openPortal,
  setValue,
  setError,
  clearErrors,
  watch,
  errors,
  previewImage,
}) => {
  const { onChange, ...rest } = register("image", {
    required: {
      value: !previewImage,
      message: "This field is required",
    },
  });

  const watchImageField = watch("image");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      const image = new Image();

      image.src = imageUrl;

      image.onload = () => {
        if (
          image.height >= 200 &&
          image.width >= 200 &&
          image.height <= 4000 &&
          image.width <= 4000
        ) {
          clearErrors("image");
          onChange(e);
        } else {
          setError("image", {
            type: "wrongResolution",
            message: "Image resolution must be from 200 to 4000 pixels",
          });
        }
      };
    }
  };

  return (
    <div className={styles.Wrapper}>
      <label
        htmlFor="file-input"
        className={classnames(styles.AddAvatar, {
          [styles["AddAvatar_empty"]]: !watchImageField.length && !previewImage,
          [styles["AddAvatar_error"]]: errors.image,
        })}
        title="Add an image"
      >
        <img
          src={!errors.image && previewImage ? previewImage : "/img/photo.svg"}
          alt="Avatar"
        />
        <input
          type="file"
          id="file-input"
          accept="image/jpeg, image/png"
          onChange={handleChange}
          {...rest}
        />
      </label>
      {watchImageField.length || previewImage ? (
        <button type="button" onClick={openPortal}>
          <img src="/img/crop.svg" alt="Crop" />
        </button>
      ) : null}
    </div>
  );
};
