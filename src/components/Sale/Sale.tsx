import React, { useState } from "react";
import classnames from "classnames";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import DayPickerInput from "react-day-picker/DayPickerInput";

import { NewProductFormInputs } from "../ProductForm/ProductForm";

import saleStyles from "./sale.module.scss";
import styles from "../ProductForm/new-product-form.module.scss";
import "react-day-picker/lib/style.css";

interface ISaleProps {
  register: UseFormRegister<NewProductFormInputs>;
  watch: (field: string) => unknown;
  setValue: any;
  errors: FieldErrors<NewProductFormInputs>;
  choosedExpiredDay: Date | null;
}

export const Sale: React.FC<ISaleProps> = ({
  register,
  watch,
  setValue,
  errors,
  choosedExpiredDay,
}) => {
  const [choosedDay, setChoosedDay] = useState(choosedExpiredDay);
  const watchSaleField = watch("sale");

  const handleDayClick = (day: any, { selected }: any) => {
    setChoosedDay(day);
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
        <div
          className={classnames({
            [saleStyles["ErrorWrapper"]]: errors.saleExpiredDay,
          })}
        >
          <DayPickerInput
            {...register("saleExpiredDay", {
              required: {
                value: true,
                message: "Choose the sale expired date",
              },
            })}
            onDayChange={handleDayClick}
            // @ts-ignore
            value={choosedDay}
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
        </div>
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
