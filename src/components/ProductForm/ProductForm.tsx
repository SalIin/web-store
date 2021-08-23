import React, { useState } from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";

import { AddAvatar } from "../AddAvatar/AddAvatar";
import { Sale } from "../Sale/Sale";

import { useForm } from "react-hook-form";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";

import { createProduct, generateId, updateProduct } from "../../utils";
import styles from "./new-product-form.module.scss";
import { storage } from "../../firebase";
import { useHistory, useParams } from "react-router-dom";
import { getProductById } from "../../redux/selectors";
import { IProduct } from "../../types";
import { IInitialState } from "../../redux/reducers";
import { PRIVATE_ROUTES } from "../../routes";
import { Portal } from "../Portal/Portal";
import { ModalCropImage } from "../ModalCropImage/ModalCropImage";
import { usePortal } from "../../customHooks/usePortal";

export interface NewProductFormInputs {
  title: string;
  image: string;
  price: string;
  sale?: number | null;
  description?: string;
  saleExpiredDay?: number | null | Date;
}

export const ProductForm: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const { push: redirectTo } = useHistory();
  const { id } = useParams<{ id?: string }>();
  const product: IProduct | null =
    useSelector((state: IInitialState) => getProductById(state, id)) || null;
  const [previewImage, setPreviewImage] = useState(product ? product.img : "");
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setError,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<NewProductFormInputs>({
    defaultValues: {
      title: product ? product.title : "",
      image: "",
      description: product ? product.description : "",
      price: product ? product.price.toString() : "",
      sale: product ? product.sale : null,
      saleExpiredDay: product ? new Date(product.saleExpiredDay * 1000) : null,
    },
  });
  const { isOpen, openPortal, closePortal } = usePortal();

  const onSubmit = (data: any) => {
    setLoading(true);

    if (!product) {
      const img = data.image[0];
      delete data.image;

      const uploadTask = storage.ref(`images/${img.name}`).put(img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => console.log(error),
        () => {
          storage
            .ref("images")
            .child(img.name)
            .getDownloadURL()
            .then((url) => {
              createProduct({
                id: generateId(),
                img: url,
                ...data,
              }).then(() => {
                setLoading(false);
                reset();
                redirectTo(PRIVATE_ROUTES.GOODS);
              });
            });
        }
      );
    } else if (product) {
      const img = data.image[0] || product.img;
      data.saleExpiredDay =
        typeof getValues().saleExpiredDay === "number"
          ? getValues().saleExpiredDay
          : product.saleExpiredDay;
      delete data.image;

      if (typeof img === "string") {
        data.img = product.img;
        updateProduct(product.id, data).then(() => {
          setLoading(false);
          redirectTo(PRIVATE_ROUTES.GOODS);
        });
      } else {
        const uploadTask = storage.ref(`images/${img.name}`).put(img);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => console.log(error),
          () => {
            storage
              .ref("images")
              .child(img.name)
              .getDownloadURL()
              .then((url) => {
                data.img = url;
                updateProduct(product.id, data).then(() => {
                  setLoading(false);
                  redirectTo(PRIVATE_ROUTES.GOODS);
                });
              });
          }
        );
      }
    }
  };

  return (
    <section className={styles.ProductFormWrapper}>
      <h2>{product ? "Edit" : "Add"} Product</h2>
      <form className={styles.ProductForm} onSubmit={handleSubmit(onSubmit)}>
        <AddAvatar
          register={register}
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}
          watch={watch}
          openPortal={openPortal}
          errors={errors}
          previewImage={previewImage}
        />
        {errors.image && (
          <small className={styles["ProductForm-Error"]}>
            {errors.image.message}
          </small>
        )}
        <input
          type="text"
          placeholder="Title (required)"
          className={classnames(styles["ProductForm-Control"], {
            [styles["ProductForm-Control_withError"]]: errors.title,
          })}
          {...register("title", {
            required: {
              value: true,
              message: "This field is required",
            },
            minLength: {
              value: 20,
              message:
                "Title must be at least 20 and not greater than 60 characters",
            },
            maxLength: {
              value: 60,
              message:
                "Title must be at least 20 and not greater than 60 characters",
            },
          })}
        />
        {errors.title && (
          <small className={styles["ProductForm-Error"]}>
            {errors.title.message}
          </small>
        )}
        <input
          type="text"
          placeholder="Price (required)"
          className={classnames(styles["ProductForm-Control"], {
            [styles["ProductForm-Control_withError"]]: errors.price,
          })}
          {...register("price", {
            valueAsNumber: true,
            required: {
              value: true,
              message: "This field is required",
            },
            pattern: {
              // TODO: Replace all regexp with constant
              value: /^\d{1,8}(\.\d{0,2})?$/,
              message:
                "You have to use positive numbers. Maximum price is 99999999.99",
            },
          })}
        />
        {errors.price && (
          <small className={styles["ProductForm-Error"]}>
            {errors.price.message}
          </small>
        )}
        <Sale
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          choosedExpiredDay={
            product ? new Date(product.saleExpiredDay * 1000) : null
          }
        />
        {errors.sale && (
          <small className={styles["ProductForm-Error"]}>
            {errors.sale.message}
          </small>
        )}
        {errors.saleExpiredDay && !errors.sale && (
          <small className={styles["ProductForm-Error"]}>
            {errors.saleExpiredDay.message}
          </small>
        )}
        <textarea
          placeholder="Description"
          className={styles["ProductForm-Control"]}
          {...register("description")}
        />
        <Button
          variant="outlined"
          component="button"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : product ? "Save" : "Create"}
        </Button>
      </form>
      <Portal isOpen={isOpen}>
        <ModalCropImage
          openPortal={openPortal}
          closePortal={closePortal}
          setPreviewImage={setPreviewImage}
          setValue={setValue}
          previewImage={previewImage}
        />
      </Portal>
    </section>
  );
};
