
import * as Yup from 'yup';

export const contactEditFormSchema = Yup.object().shape({
  // Contact & Residence fields
   email: Yup.string().email('Invalid email address').required('Email is required'),
   phoneNumber: Yup.object().shape({
    countryCode: Yup.string()
      .matches(/^\+\d{1,3}$/, 'Country code must be in the format +XX or +XXX')
      .required('Country code is required'),
    number: Yup.string()
      .matches(/^\d{3} \d{3} \d{4}$/, 'Number must be in the format XXX XXX XXXX')
      .required('Phone number is required'),
  }),
  whatsappNumber: Yup.object().shape({
    countryCode: Yup.string()
      .matches(/^\+\d{1,3}$/, 'Country code must be in the format +XX or +XXX'),
    number: Yup.string()
    .matches(/^\d{3} \d{3} \d{4}$/, 'Number must be in the format XXX XXX XXXX'),
  }),
//    currentCountry: Yup.string().when('residency', (residency, schema) =>
//      residency === 'non-resident'
//        ? schema.required('Current country is required for non-UAE residents')
//        : schema
//    ),
   nationality: Yup.string().when('residency', (residency, schema) =>
    residency === 'resident'
      ? schema.Required()
      : schema.notRequired('Nationality is required')
  ),

  // Emirates ID fields (conditional based on residency)
  emiratesIDNumber: Yup.string()
    .when('residency', (residency, schema) => 
      residency === 'resident'
        ? schema
            .required('Emirates ID number is required')
            .matches(
              /^\d{3}-\d{4}-\d{7}-\d{1}$/,
              'Emirates ID must be in format XXX-XXXX-XXXXXXX-X'
            )
        : schema
    ),
  emiratesIDIssueDate: Yup.date()
    .when('residency', (residency, schema) =>
      residency === 'resident'
        ? schema
            .required('Emirates ID issue date is required')
            .max(new Date(), 'Issue date cannot be in the future')
        : schema
    ),
  emiratesIDExpiryDate: Yup.date()
    .when('residency', (residency, schema) =>
      residency === 'resident'
        ? schema
            .required('Emirates ID expiry date is required')
            .min(new Date(), 'Expiry date must be in the future')
        : schema
    ),
  emiratesIDFront: Yup.mixed()
    .when('residency', (residency, schema) =>
      residency === 'resident'
        ? schema
            .required('Emirates ID front scan is required')
            .test('fileType', 'Only PDF files are allowed', (value) => {
              if (!value) return true; // Let required handle empty
              return value && value.type === 'application/pdf';
            })
            .test('fileSize', 'File must be less than 5MB', (value) => {
              if (!value) return true; // Let required handle empty
              return value && value.size <= 5000000;
            })
        : schema
    ),
  emiratesIDBack: Yup.mixed()
    .when('residency', (residency, schema) =>
      residency === 'resident'
        ? schema
            .required('Emirates ID back scan is required')
            .test('fileType', 'Only PDF files are allowed', (value) => {
              if (!value) return true;
              return value && value.type === 'application/pdf';
            })
            .test('fileSize', 'File must be less than 5MB', (value) => {
              if (!value) return true;
              return value && value.size <= 5000000;
            })
        : schema
    ),
  residencyIqama: Yup.mixed()
    .when('residency', (residency, schema) =>
      residency === 'resident'
        ? schema
            .required('Residency/Iqama scan is required')
            .test('fileType', 'Only PDF files are allowed', (value) => {
              if (!value) return true;
              return value && value.type === 'application/pdf';
            })
            .test('fileSize', 'File must be less than 5MB', (value) => {
              if (!value) return true;
              return value && value.size <= 5000000;
            })
        : schema
    ),

});

