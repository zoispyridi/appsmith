import React from "react";
import BaseControl, { ControlProps } from "./BaseControl";
import { InputType } from "components/constants";
import { ControlType } from "constants/PropertyControlConstants";
import TextInput from "components/ads/TextInput";
import {
  Field,
  WrappedFieldMetaProps,
  WrappedFieldInputProps,
} from "redux-form";

export function FixedKeyInput(props: {
  label: string;
  value: string;
  isValid: boolean;
  subtitle?: string;
  initialValue?: string;
  validationMessage?: string;
  placeholder?: string;
  dataType?: string;
  isRequired?: boolean;
  name: string;
  encrypted?: boolean;
  disabled?: boolean;
  fixedKey: string;
}) {
  const { dataType, disabled, fixedKey, name, placeholder } = props;

  return (
    <div data-cy={name} style={{ width: "20vw" }}>
      <Field
        component={renderComponent}
        datatype={dataType}
        disabled={disabled || false}
        placeholder={placeholder}
        {...props}
        asyncControl
        format={(value: any) => {
          // Get the value property
          if (value) {
            return value.value;
          }
          return "";
        }}
        parse={(value: any) => {
          // Store the value in this field as {key: fixedKey, value: <user-input>}
          return {
            key: fixedKey,
            value: value,
          };
        }}
      />
    </div>
  );
}
class FixKeyInputControl extends BaseControl<FixedKeyInputControlProps> {
  render() {
    const {
      configProperty,
      dataType,
      disabled,
      encrypted,
      fixedKey,
      initialValue,
      isValid,
      label,
      placeholderText,
      propertyValue,
      subtitle,
      validationMessage,
    } = this.props;

    return (
      <FixedKeyInput
        dataType={this.getType(dataType)}
        disabled={disabled}
        encrypted={encrypted}
        fixedKey={fixedKey}
        initialValue={initialValue as string}
        isValid={isValid}
        label={label}
        name={configProperty}
        placeholder={placeholderText}
        subtitle={subtitle}
        validationMessage={validationMessage}
        value={propertyValue}
      />
    );
  }

  getType(dataType: InputType | undefined) {
    switch (dataType) {
      case "PASSWORD":
        return "password";
      case "NUMBER":
        return "number";
      default:
        return "text";
    }
  }

  getControlType(): ControlType {
    return "FIXED_KEY_INPUT";
  }
}

function renderComponent(
  props: {
    placeholder: string;
    dataType?: InputType;
    disabled?: boolean;
    initialValue?: string;
  } & {
    meta: Partial<WrappedFieldMetaProps>;
    input: Partial<WrappedFieldInputProps>;
  },
) {
  return (
    <TextInput
      dataType={props.dataType}
      defaultValue={props.initialValue}
      disabled={props.disabled || false}
      name={props.input?.name}
      onChange={props.input.onChange}
      placeholder={props.placeholder}
      value={props.input.value}
      {...props.input}
      isCopy
      width="100%"
    />
  );
}

export interface FixedKeyInputControlProps extends ControlProps {
  placeholderText: string;
  inputType?: InputType;
  dataType?: InputType;
  fixedKey: string;
}

export default FixKeyInputControl;
