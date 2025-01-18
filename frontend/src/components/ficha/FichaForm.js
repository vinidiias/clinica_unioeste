import { Fragment } from "react";
import styles from "./FichaForm.module.css";
import Input from "../form/Input";
import Table from "../form/Table";
import TextArea from "../form/TextArea";
import Button from "../form/Button";
import Select from "../form/Select";
import { useFormContext } from "react-hook-form";

const FichaForm = ({
  infoCompletPatient,
  fieldsContainers,
  buttons,
  title,
}) => {

  const { watch } = useFormContext()

  return (
    <>
      <h1>{title}</h1>
      {fieldsContainers.map((container, containerIndex) => {
        return container.fields.map((field, index) => {
          const value = watch(field.name);
          const uniqueFieldKey = `${containerIndex}-${index}`
          switch (field.type) {
            case "text":
              return (
                <div className={styles.flex} key={uniqueFieldKey}>
                  <Input
                    name={field.name}
                    text={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                </div>
              );
            case "select":
              const dep_result = container.child?.[0]?.dep?.some(
                (dep) => dep === value
              );
              return (
                <Fragment key={uniqueFieldKey}>
                  <div className={styles.flex}>
                    <Select
                      name={field.name}
                      text={field.label}
                      options={field.options}
                    />
                    {dep_result &&
                      container.child[0].fields.map((childField, childIndex) => {
                        const childKey = `${uniqueFieldKey}-child-${childIndex}`;
                        switch (childField.type) {
                          case "text":
                            return (
                              <div className={styles.flex} key={childKey}>
                                <Input
                                  name={childField.name}
                                  text={childField.label}
                                  type={childField.type}
                                  placeholder={childField.placeholder}
                                />
                              </div>
                            );
                          case "select":
                            return (
                              <div className={styles.flex} key={childKey}>
                                <Select
                                  name={childField.name}
                                  text={childField.label}
                                  options={childField.options}
                                />
                              </div>
                            );
                          case "time":
                            return (
                              <div className={styles.flex} key={childKey}>
                                <Input
                                  name={childField.name}
                                  text={childField.label}
                                  type={childField.type}
                                  placeholder={childField.placeholder}
                                />
                              </div>
                            );
                          default:
                            return null;
                        }
                      })}
                  </div>
                </Fragment>
              );
            case "time":
              return (
                <div className={styles.flex} key={uniqueFieldKey}>
                  <Input
                    name={field.name}
                    text={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                </div>
              );
            case 'date':
              return (
                <div className={styles.flex} key={uniqueFieldKey}>
                  <Input
                    name={field.name}
                    text={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                </div>
              );
            case "table":
              return (
                <div className={styles.flex} key={uniqueFieldKey}>
                  <Table title="Dia de Preferência" />
                </div>
              );
            case "textarea":
              return (
                <div className={styles.flex} key={uniqueFieldKey}>
                  <TextArea
                    label={field.label}
                    name={field.name}
                    rows="4"
                    placeholder={field.placeholder}
                  />
                </div>
              );
            default:
              return null;
          }
        });
      })}

      <div className={styles.btnSubmit}>
        {buttons.map((btn, index) => (
          <Button
            key={`button-${index}`}
            text={btn.label}
            type={btn.type}
            customClass={btn.customClass}
          />
        ))}
      </div>
    </>
  );
};

export default FichaForm;