import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { storage } from "../../firebase";
import classnames from "classnames";

// Redux
import { getProductById } from "../../redux/selectors";
import { IInitialState } from "../../redux/reducers";

// Components
import { AddAvatar } from "../AddAvatar/AddAvatar";
import { Sale } from "../Sale/Sale";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";
import { Portal } from "../Portal/Portal";
import { ModalCropImage } from "../ModalCropImage/ModalCropImage";

// Custom hooks
import { usePortal } from "../../customHooks/usePortal";

import { IProduct } from "../../types";
import { PRIVATE_ROUTES } from "../../routes";

import {
  createProduct,
  generateId,
  getBase64,
  notify,
  updateProduct,
} from "../../utils";

import styles from "./new-product-form.module.scss";
import { MAX_DIGIT_REGEXP } from "../../constants";

export interface NewProductFormInputs {
  title: string;
  image: string;
  price: string;
  sale?: number | string | null;
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
  const [croppedImage, setCroppedImage] = useState("");
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
      saleExpiredDay:
        product && product!.saleExpiredDay
          ? new Date(product!.saleExpiredDay * 1000)
          : new Date(),
    },
  });
  const { isOpen, openPortal, closePortal } = usePortal();

  useEffect(() => {
    if (getValues().image.length) {
      // @ts-ignore
      getBase64(getValues().image[0]).then(setPreviewImage);
    }
  }, [getValues().image]);

  const onSubmit = (data: any) => {
    setLoading(true);
    data.price = +data.price;
    data.sale = !data.sale ? "" : data.sale;

    // Check if the new product should be create
    if (!product) {
      const img = data.image[0];
      delete data.image;

      // Check if the image was cropped
      if (croppedImage) {
        const imgId = generateId();
        const uploadTask = storage
          .ref(`images/${imgId}`)
          .putString(croppedImage, "data_url");

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => console.log(error),
          () => {
            storage
              .ref("images")
              .child(imgId)
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
                  notify("success", "Product created!");
                });
              });
          }
        );
      } else {
        // The image wasn't cropped
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
                  notify("success", "Product created!");
                });
              });
          }
        );
      }
    } else if (product) {
      // The product already exists
      const img = data.image[0] || product.img;
      data.saleExpiredDay =
        typeof getValues().saleExpiredDay === "number"
          ? getValues().saleExpiredDay
          : product.saleExpiredDay;
      delete data.image;

      // Check if the image already exists
      if (typeof img === "string") {
        data.img = product.img;

        // Check if we have new cropped image
        if (croppedImage) {
          const imgId = generateId();
          const uploadTask = storage
            .ref(`images/${imgId}`)
            .putString(croppedImage, "data_url");
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => console.log(error),
            () => {
              storage
                .ref("images")
                .child(imgId)
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
        } else {
          // We don't have the cropped image
          updateProduct(product.id, data).then(() => {
            setLoading(false);
            redirectTo(PRIVATE_ROUTES.GOODS);
            notify("success", "Product edited!");
          });
        }
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
                  notify("success", "Product edited!");
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
            required: "This field is required",
            min: {
              value: 1,
              message: "You have to use positive numbers",
            },
            pattern: {
              value: MAX_DIGIT_REGEXP,
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
            product && product!.saleExpiredDay
              ? new Date(product!.saleExpiredDay * 1000)
              : new Date()
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
          closePortal={closePortal}
          setPreviewImage={setPreviewImage}
          setCroppedImage={setCroppedImage}
          previewImage={previewImage}
        />
      </Portal>
    </section>
  );
};
