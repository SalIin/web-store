import React, { useState, ChangeEvent } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import classnames from "classnames";

import { NewProductFormInputs } from "../NewProductForm/NewProductForm";

import styles from "./add-avatar.module.scss";

interface IAddAvatarProps {
  register: UseFormRegister<NewProductFormInputs>;
  setValue: any;
  setError: any;
  clearErrors: any;
  watch: (field: string) => [] | File[];
  errors: FieldErrors<NewProductFormInputs>;
}

export const AddAvatar: React.FC<IAddAvatarProps> = ({
  register,
  setValue,
  setError,
  clearErrors,
  watch,
  errors,
}) => {
  const { onChange, ...rest } = register("image", {
    required: {
      value: true,
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
    <>
      <label
        htmlFor="file-input"
        className={classnames(styles.AddAvatar, {
          [styles["AddAvatar_empty"]]: !watchImageField.length,
          [styles["AddAvatar_error"]]: errors.image,
        })}
        title="Add an image"
      >
        <img
          src={
            watchImageField.length && !errors.image
              ? URL.createObjectURL(watchImageField[0])
              : "/img/photo.svg"
          }
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
    </>
  );
};
