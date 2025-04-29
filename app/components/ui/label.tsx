"use client";

import * as React from "react";
import { forwardRef } from "react";


export const Label = forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>((props, ref) => {
  return (
    <label
      {...props}
      ref={ref}
      className={`block text-sm font-medium text-gray-700 ${
        props.className || ""
      }`}
    >
      {props.children}
    </label>
  );
});

Label.displayName = "Label";
