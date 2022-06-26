import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

//components
import TextField from "../../../components/TextField/TextField";
import Button from "../../../components/Button/Button";

const schema = Yup.object().shape({
  name: Yup.string().required("Folder name is required"),
});

const AddFolderForm = (props) => (
  <Formik
    initialValues={{
      name: "",
    }}
    validationSchema={schema}
    onSubmit={(values) => {
      props.handleSubmit(values);
    }}
  >
    {({ handleSubmit, handleBlur, handleChange, values, errors, touched }) => (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <TextField
            placeholder="Folder name"
            name="name"
            type="text"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.name && touched.name ? errors.name : null}
          />
        </div>

        <div className="mt-3 text-center">
          <Button
            type="button"
            text="Close"
            onClick={() => props.close()}
            btnClass="m-2"
          />
          <Button
            type="submit"
            text="Add"
            isDisable={props.uploading}
            btnClass="m-2"
          />
        </div>
      </form>
    )}
  </Formik>
);

export default AddFolderForm;
