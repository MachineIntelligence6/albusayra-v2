
import * as Yup from 'yup';

export const addUserSchema = Yup.object().shape({
    profileImage: Yup.mixed().required('Profile image is required'),
    campaignName: Yup.string().required('Campaign Name is required'),
    residency: Yup.string()
        .oneOf(['resident', 'non-resident'], 'Please select a valid residency status')
        .required('Residency status is required'),
    fullName: Yup.string().required('Full Name is required'),
    gender: Yup.string()
        .oneOf(['male', 'female', 'other'], 'Please select a valid gender')
        .required('Gender is required'),
    employeeStatus: Yup.string()
        .oneOf(['fullTime', 'partTime', 'contractor'], 'Please select a valid employment status')
        .required('Employment Status is required'),
    workingCountry: Yup.string()
        .oneOf(['uae', 'other'], 'Please select a valid working country')
        .required('Preferred Working Country is required'),
    workingCity: Yup.string()
        .oneOf(['dubai', 'other'], 'Please select a valid working city')
        .required('Preferred Working City is required'),
    interestedplatform: Yup.string()
        .oneOf(['dubai', 'abuDhabi', 'sharjah'], 'Please select a valid platform')
        .when('residency', (residency, schema) =>
            residency === 'resident'
                ? schema.required('Interested platform is required for UAE residents')
                : schema
        ),
    learnedFrom: Yup.string()
        .oneOf(['social', 'friend', 'other'], 'Please select a valid option')
        .required('Please specify how you learned about this form'),
    companyprovideNOC: Yup.string()
        .oneOf(['social', 'friend', 'other'], 'Please select a valid option')
        .when('residency', (residency, schema) =>
            residency === 'resident'
                ? schema.required('This field is required for UAE residents')
                : schema
        ),

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
    currentCountry: Yup.string().when('residency', (residency, schema) =>
        residency === 'non-resident'
            ? schema.required('Current country is required for non-UAE residents')
            : schema
    ),
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

    // Driving License fields
    isLicenseHolder: Yup.string().required('Please specify if you hold a driving license'),
    licenseNumber: Yup.string().when('isLicenseHolder', (isLicenseHolder, schema) =>
        isLicenseHolder
            ? schema.required('License number is required for license holders')
            : schema
    ),
    licenseIssueDate: Yup.date().when('isLicenseHolder', (isLicenseHolder, schema) =>
        isLicenseHolder
            ? schema.required('License issue date is required for license holders')
            : schema
    ),
    licenseExpiryDate: Yup.date().when('isLicenseHolder', (isLicenseHolder, schema) =>
        isLicenseHolder
            ? schema.required('License expiry date is required for license holders')
            : schema
    ),

    // Passport Details fields
    passportNumber: Yup.string().required('Passport number is required'),
    passportIssueDate: Yup.date().required('Passport issue date is required'),
    passportExpiryDate: Yup.date().required('Passport expiry date is required'),
    passportCopy: Yup.mixed().required('Passport copy is required'),
    visaApplied: Yup.boolean().required('Please specify if you have applied for a visa'),

    // Referral fields
    referralName: Yup.string().required('Referral name is required'),
    referralPhone: Yup.object().shape({
        countryCode: Yup.string()
            .matches(/^\+\d{1,3}$/, 'Country code must be in the format +XX or +XXX')
            .required('Country code is required'),
        number: Yup.string()
            .matches(/^\d{3} \d{3} \d{4}$/, 'Number must be in the format XXX XXX XXXX')
            .required('Phone number is required'),
    }),

    referralAddress: Yup.string().required('Referral address is required'),
});