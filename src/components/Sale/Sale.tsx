import React from "react";
import classnames from "classnames";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import DayPickerInput from "react-day-picker/DayPickerInput";

import { NewProductFormInputs } from "../NewProductForm/NewProductForm";

import saleStyles from "./sale.module.scss";
import styles from "../NewProductForm/new-product-form.module.scss";
import "react-day-picker/lib/style.css";

interface ISaleProps {
  register: UseFormRegister<NewProductFormInputs>;
  watch: (field: string) => unknown;
  setValue: any;
  errors: FieldErrors<NewProductFormInputs>;
}

export const Sale: React.FC<ISaleProps> = ({
  register,
  watch,
  setValue,
  errors,
}) => {
  const watchSaleField = watch("sale");

  const handleDayClick = (day: any, { selected }: any) => {
    setValue("saleExpiredDay", selected ? undefined : day.getTime() / 1000, {
      shouldValidate: true,
    });
  };

  return (
    <div className={saleStyles.SaleWrapper}>
      <input
        type="text"
        placeholder="Sale %"
        className={classnames(styles["ProductForm-Control"], {
          [styles["ProductForm-Control_withError"]]: errors.sale,
        })}
        {...register("sale", {
          valueAsNumber: true,
          min: {
            value: 10,
            message: "Sale must be 10-90%",
          },
          max: {
            value: 90,
            message: "Sale must be 10-90%",
          },
        })}
      />

      {!!watchSaleField && !errors.sale && (
        <DayPickerInput
          {...register("saleExpiredDay", {
            required: {
              value: true,
              message: "Choose the sale expired date",
            },
          })}
          onDayChange={handleDayClick}
          style={{
            color: "#040f0f",
            position: "relative",
          }}
          overlayComponent={OverlayComponent}
          dayPickerProps={{
            modifiers: {
              disabled: [{ before: new Date() }],
            },
          }}
        />
      )}
    </div>
  );
};

const OverlayComponent: React.FC<{
  selectedDay: Date;
  classNames: object;
}> = ({ children, selectedDay, classNames, ...resProps }) => {
  return (
    <div className={saleStyles.Calendar} {...resProps}>
      {children}
    </div>
  );
};
