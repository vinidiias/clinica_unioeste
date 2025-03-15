import { Fragment } from "react";
import styles from "./FichaForm.module.css";
import Input from "../form/Input";
import Table from "../form/Table";
import TextArea from "../form/TextArea";
import Button from "../form/Button";
import Select from "../form/Select";
import { useFormContext } from "react-hook-form";

const FichaForm = ({ disabled, fieldsContainers, buttons, title }) => {
  const { watch } = useFormContext();

  return (
    <>
      <h1>{title}</h1>
      {fieldsContainers.map((container, containerIndex) => {
        return (
          <div key={containerIndex} className={styles.flex}>
            {container.fields.map((field, index) => {
              const value = watch(field.name);
              const uniqueFieldKey = `${containerIndex}-${index}`;
              switch (field.type) {
                case "text":
                  return (
                    <Input
                      key={uniqueFieldKey}
                      name={field.name}
                      text={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      disabled={disabled}
                    />
                  );
                  case "email":
                  return (
                    <Input
                      key={uniqueFieldKey}
                      name={field.name}
                      text={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      disabled={disabled}
                    />
                  );
                case "select":
                  const dep_result = container.child?.[0]?.dep?.some(
                    (dep) => dep === value
                  );
                  return (
                    <Fragment key={uniqueFieldKey}>
                      <Select
                        name={field.name}
                        text={field.label}
                        options={field.options}
                        disabled={disabled}
                      />
                      {dep_result &&
                        container.child[0].fields.map(
                          (childField, childIndex) => {
                            const childKey = `${uniqueFieldKey}-child-${childIndex}`;
                            switch (childField.type) {
                              case "text":
                                return (
                                  <Input
                                    key={childKey}
                                    name={childField.name}
                                    text={childField.label}
                                    type={childField.type}
                                    placeholder={childField.placeholder}
                                    disabled={disabled}
                                  />
                                );
                              case "select":
                                return (
                                  <Select
                                    key={childKey}
                                    name={childField.name}
                                    text={childField.label}
                                    options={childField.options}
                                    disabled={disabled}
                                  />
                                );
                              case "time":
                                return (
                                  <Input
                                    key={childKey}
                                    name={childField.name}
                                    text={childField.label}
                                    type={childField.type}
                                    placeholder={childField.placeholder}
                                    disabled={disabled}
                                  />
                                );
                              default:
                                return null;
                            }
                          }
                        )}
                    </Fragment>
                  );
                case "time":
                  return (
                    <Input
                      key={uniqueFieldKey}
                      name={field.name}
                      text={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      disabled={disabled}
                    />
                  );
                case "date":
                  return (
                    <Input
                      key={uniqueFieldKey}
                      name={field.name}
                      text={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      disabled={disabled}
                    />
                  );
                case "table":
                  return (
                    <Table
                      key={uniqueFieldKey}
                      title="Dia de Preferência"
                      disabled={disabled}
                    />
                  );
                case "textarea":
                  return (
                    <TextArea
                      key={uniqueFieldKey}
                      label={field.label}
                      name={field.name}
                      rows="4"
                      placeholder={field.placeholder}
                      disabled={disabled}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>
        );
      })}

      <div className={styles.btnSubmit}>
        {buttons && buttons.map((btn, index) => (
          <Button
            key={`button-${index}`}
            text={btn.label}
            type={btn.type}
            customClass={btn.customClass}
            handleClick={btn?.handleClick}
          />
        ))}
      </div>
    </>
  );
};

export default FichaForm;
