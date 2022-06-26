import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"

//components
import TextField from "../../../components/TextField/TextField"
import Button from "../../../components/Button/Button"

const schema = Yup.object().shape({
  newName: Yup.string().required("New name is required"),
})

const RenameFolderForm = (props) => (
  <Formik
    initialValues={{
      newName: "",
    }}
    validationSchema={schema}
    onSubmit={(values) => {
      props.handleSubmit(values)
    }}
  >
    {({ handleSubmit, handleBlur, handleChange, values, errors, touched }) => (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <TextField
            placeholder='new folder name'
            name='newName'
            type='text'
            value={values.newName}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.newName && touched.newName ? errors.newName : null}
          />
        </div>

        <div className='mt-3 text-center'>
          <Button
            type='button'
            text='Close'
            onClick={() => props.close()}
            btnClass='m-2'
          />
          <Button
            type='submit'
            text='Rename'
            isDisable={props.renaming}
            btnClass='m-2'
          />
        </div>
      </form>
    )}
  </Formik>
)

export default RenameFolderForm
