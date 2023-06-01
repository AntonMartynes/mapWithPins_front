import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

const validationSchema = yup.object({
  name: yup
    .string('Enter the name of the mark')
    .min(3, 'Name should be of minimum 3 characters length')
    .required('Name is required'),
  description: yup
    .string('Enter description of the mark')
    .min(3, 'Description should be of minimum 3 characters length')
    .required('Description is required'),
  latitude: yup
    .number('Enter latitude')
    .required('latitude is required'),
  longitude: yup
    .number('Enter longitude')
    .required('longitude is required'),

});

export const FormField = ({ setActive }) => {

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      latitude: '',
      longitude: '',
    },
    validationSchema: validationSchema,
      onSubmit: (values) => {
        const postData = async () => {
          try {
            const response = await fetch('http://localhost:8080/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values, null, 2), // Replace `data` with your request payload
            });
      
            if (response.ok) {
              // Handle successful response
              console.log('Post request successful');
            } else {
              // Handle error response
              console.log('Error:', response.status);
            }
          } catch (error) {
            // Handle network or other errors
            console.log('Error:', error);
          }
        };
      
        postData();
        setActive(false); // Call the function to make the POST request
        // alert(JSON.stringify(values, null, 2));
      },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name of the mark"
          type="text"
          margin="dense"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          type="text"
          margin="dense"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />

        <TextField
          fullWidth
          id="latitude"
          name="latitude"
          label="Latitude"
          type="text"
          margin="dense"
          value={formik.values.latitude}
          onChange={formik.handleChange}
          error={formik.touched.latitude && Boolean(formik.errors.latitude)}
          helperText={formik.touched.latitude && formik.errors.latitude}
        />

        <TextField
          fullWidth
          id="longitude"
          name="longitude"
          label="Longitude"
          type="text"
          margin="dense"
          value={formik.values.longitude}
          onChange={formik.handleChange}
          error={formik.touched.longitude && Boolean(formik.errors.longitude)}
          helperText={formik.touched.longitude && formik.errors.longitude}
        />
        
        <Button 
          color="primary" 
          variant="contained" 
          fullWidth 
          type="submit"
          sx={{ my: 1.5 }}
          // onClick={sendData()}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}