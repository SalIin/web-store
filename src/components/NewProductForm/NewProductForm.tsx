import React, { useState } from "react";
import classnames from "classnames";

import { AddAvatar } from "../AddAvatar/AddAvatar";
import { Sale } from "../Sale/Sale";

import { useForm } from "react-hook-form";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";

import { createProduct, generateId } from "../../utils";
import styles from "./new-product-form.module.scss";

export interface NewProductFormInputs {
  title: string;
  image: string;
  price: string;
  sale?: number | null;
  description?: string;
  saleExpiredDay?: number | null;
}

export const NewProductForm: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NewProductFormInputs>({
    defaultValues: {
      title: "",
      image: "",
      description: "",
      price: "",
      sale: null,
      saleExpiredDay: null,
    },
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    const img = URL.createObjectURL(data.image[0]);
    delete data.image;

    createProduct({
      id: generateId(),
      img,
      ...data,
    }).then(() => {
      setLoading(false);
      reset();
    });
  };

  return (
    <section className={styles.ProductFormWrapper}>
      <h2>Add Product</h2>
      <form className={styles.ProductForm} onSubmit={handleSubmit(onSubmit)}>
        <AddAvatar
          register={register}
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}
          watch={watch}
          errors={errors}
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
        {/* TODO: Fix datepicker error */}
        <Sale
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
        {errors.sale && (
          <small className={styles["ProductForm-Error"]}>
            {errors.sale.message}
          </small>
        )}
        {errors.saleExpiredDay && (
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
          {isLoading ? <Loader /> : "Create"}
        </Button>
      </form>
    </section>
  );
};
