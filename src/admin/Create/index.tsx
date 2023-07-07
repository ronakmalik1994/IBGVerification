import React, { useEffect, useState } from 'react';
import { PageHeader, Button } from '@lipihipi/ec-ui';
import swal from 'sweetalert';
import { CheckBox, DateTime, FileUpload, Form, ImageCropper, Input, Select } from '@lipihipi/form';

const CreateVerificationPage = ({
    getAssetUrl,
    createAsset,
    deleteAsset,
    title,
    breadCrumbs,
    uploadFile,
    onCancelRequest,
    createProfile
}: any) => {
    const [params, setParams] = useState<any>({
        page: 1,
        perPage: 10,
    });
    const [data, setData] = useState([]);
    const [permanentAddressData, setPermanentAddressData] = useState([]);
    const [currentAddressData, setCurrentAddressData] = useState([]);
    const [IdData, setIdData] = useState([]);
    const [bgvFormData, setBGVFormData] = useState([]);
    const [socialData, setSocialData] = useState([]);
    const [authorisationData, setAuthorisationData] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [stateName, setStateName] = useState("");
    const [constent, setConsent] = useState(false);
    const [sameAsPermanentAddressCheck, setSameAsPermanentAddressCheck] = useState<boolean>(false);

    useEffect(() => {
        fetch('https://countriesnow.space/api/v0.1/countries/states')
            .then(response => response.json())
            .then(data => {
                const stateNames = data.data.filter((state: any) => state.name === 'India');
                setStateList(stateNames[0].states);
            });
    }, []);

    useEffect(() => {
        fetch(`https://api.indiaapi.in/v2/locations/districts/${stateName}`)
            .then(response => response.json())
            .then(data => {
                const districtNames = data?.districts || [];
                setDistrictList(districtNames);
            });
    }, [stateName]);

    useEffect(() => {
        if (sameAsPermanentAddressCheck === true) {
            console.log(permanentAddressData, 'permanentAddressData');
            setCurrentAddressData(permanentAddressData);
        }
    }, [sameAsPermanentAddressCheck])

    const handleGenderSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
    };

    const handleConsentSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
    };

    const mapOptions = (values: any[]) => {
        if (values != undefined) {
            const newValue = values.map(value => ({ label: value.name, value: value.state_code }));
            return newValue;
        }
        return [];
    };

    const selectStateValue = (option: any) => {
        setStateName(option.value);
    };

    const handlePermanentAddressSave = (values: any) => {
        console.log(values, 'permanentFlat')
        setPermanentAddressData(values);
    };

    const handleCurrentAddressSave = (values: any) => {

    };
    const handleAuthorisationSave = (values: any) => {

    };
    const handleBGVFormSave = (values: any) => {

    };
    const handleSocialDataSave = (values: any) => {

    };

    const handleIdSave = (values: any) => {

    };
    const handleSave = (values: any) => {
        let payload = {
            name: "",
            uid: "457856985478",
            professionId: "16",
            xotherProfession: "",
            gender: "M",
            city: "CMP::SCS::city",
            phone: "9145785236",
            xuid: "",
            email: "test@test.com",
            dob: "1995-08-05",
            hasConsent: true,
            consentText: "The Individual does not and will not have any objection to Lipitech sharing the Individual personal information or documents including but not limited to name gender date of birth addresses mobile number email education record employment record Aadhaar number other government issued IDs such as Voter ID PAN card driving license etc. Collectively Proprietary Information with OnGrid Handy Online Solutions Private Limited for the purpose of background checks and verification. The individual understands that OnGrid maintains Proprietary Information on its platform in a secure manner and it will only be accessible to Lipitech and its associates partners or affiliates and will not be shared with any other individual or organisation without the Individuals explicit consent.",
            permanentAddress: {
                co: "test",
                line1: "line1",
                locality: "local",
                landmark: "plane",
                district: "",
                state: "hyderabad",
                pincode: "214587",
                fullAddress: ""
            },
            xcurrentAddress: {
                co: "test",
                line1: "line1",
                locality: "local",
                landmark: "plane",
                district: "",
                state: "hyderabad",
                pincode: "214587",
                fullAddress: ""
            },
            employeeId: "SKU001",
            fathersName: "Test Father",
            alternatePhone: "",
            joiningDate: "2023-07-01",
            xuans: [
                ""
            ],
            verifications: [
                {
                    code: "PANV",
                    key: "1",
                    data: {
                        documentUID: "APSOE9278F",
                        nameAsPerDocument: "CMP::VER::Pradeep Kumar"
                    }
                },
                {
                    code: "VIDV",
                    key: "2",
                    data: {
                        documentUID: "VOTER145254",
                        nameAsPerDocument: "CMP::VER::Pradeep Kumar"
                    }
                },
                {
                    code: "DLV",
                    key: "3",
                    data: {
                        documentUID: "DL001 00245 125445",
                        nameAsPerDocument: "CMP::VER::Pradeep Kumar"
                    }
                }
            ]
        }


        createProfile(payload).then(() => {
            swal({
                title: 'Success',
                text: 'Program Updated',
                icon: 'success',
            }).then(function () {

            });
        })
    };

    return (
        <>
            <section className="main-structure">
                <>
                    <PageHeader
                        title={title || 'All Candidates - Applied'}
                        breadCrumbs={breadCrumbs || [{ title: 'All Candidates' }]}
                    />

                    <Form
                        initialValues={data}
                        onSubmit={handleSave}
                        render={({ values, setFieldValue, errors, ...rest }: any) => (
                            <>
                                <div className="row">
                                    <div className="col-md-4">
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            label="Name"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div className='col-md-4'>
                                        <ImageCropper
                                            id="photograph"
                                            name="photograph"
                                            previewPic={values?.displayPicture}
                                            label="Photograph"
                                            width={200}
                                            splitView
                                            required
                                            ratio={2 / 1}
                                            accept={['image/jpeg', 'image/jpg', 'image/png']}
                                            uploadFile={createAsset}
                                            deleteFile={deleteAsset}
                                            getAssetUrl={getAssetUrl}
                                            getUploadFile={() => { }}
                                            getDeleteFile={() => { }}
                                        />
                                        <p className='small m-0'>max size 200*300</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <span>Gender</span>
                                </div>
                                <div className='row'>
                                    <div className="col-md-4">
                                        <CheckBox
                                            id={"male"}
                                            name={"male"}
                                            label={"Male"}
                                            onChange={event => handleGenderSelect(event)}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <CheckBox
                                            id={"female"}
                                            name={"female"}
                                            label={"Female"}
                                            onChange={event => handleGenderSelect(event)}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <CheckBox
                                            id={"others"}
                                            name={"others"}
                                            label={"Others"}
                                            onChange={event => handleGenderSelect(event)}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <DateTime
                                            id={'dateOfBirth'}
                                            name={'dateOfBirth'}
                                            label="Date Of Birth"
                                            placeholderText="Date Of Birth"
                                            timeCaption="Time"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <Input
                                            id="profession"
                                            name="profession"
                                            type="text"
                                            label="Profession/Title"
                                            placeholder="Profession/Title"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <Input
                                            id="staffId"
                                            name="staffId"
                                            label="Staff Id"
                                            placeholder="Profession/Title"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <Input
                                            id="currentCity"
                                            name="currentCity"
                                            label="Current City"
                                            type='text'
                                            placeholder="Current City"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <Input
                                            id="fatherName"
                                            name="fatherName"
                                            label="Father's Name"
                                            type='text'
                                            placeholder="Father's Name"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <Input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="tel"
                                            label="Phone Number"
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <Input
                                            id="mobileNumber"
                                            name="movileNumber"
                                            type="tel"
                                            label="Mobile Number"
                                            placeholder="Mobile Number"
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <Input
                                            id="emailAddress"
                                            name="emailAddress"
                                            type="email"
                                            label="Email ID"
                                            placeholder="Email Address"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <Input
                                            id="uan"
                                            name="uan"
                                            type="text"
                                            label="UAN(Universal Account Number)"
                                            placeholder="UAN(Universal Account Number)"
                                        />
                                    </div>
                                </div>
                                {/* Permanent Address */}
                                <Form
                                    initialValues={permanentAddressData}
                                    onSubmit={handlePermanentAddressSave}
                                    render={() => (
                                        <>
                                            <div>
                                                <div>
                                                    <span>Permanent Address</span>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="permanentFlat"
                                                            name="permanentFlat"
                                                            type="text"
                                                            label="Flat/Building/Floor/House Number"
                                                            placeholder="Flat/Building/Floor/House Number"
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="colony"
                                                            name="colony"
                                                            type="text"
                                                            label="Colony/Street/Locality"
                                                            placeholder="Colony/Street/Locality"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="locality"
                                                            name="locality"
                                                            type="text"
                                                            label="Locality"
                                                            placeholder="Locality"
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="landmark"
                                                            name="landmark"
                                                            type="text"
                                                            label="Landmark"
                                                            placeholder="Landmark"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="village"
                                                            name="village"
                                                            type="text"
                                                            label="Village/Town/City"
                                                            placeholder="Village/Town/City"
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="pincode"
                                                            name="pincode"
                                                            type="number"
                                                            label="Pincode"
                                                            placeholder="Pincode"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Select
                                                            id="state"
                                                            name="state"
                                                            label="State"
                                                            placeholder="Select State"
                                                            options={[...mapOptions(stateList)]}
                                                            onChange={e => selectStateValue(e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Select
                                                            id="district"
                                                            name="district"
                                                            label="District"
                                                            placeholder="Select district"
                                                            options={[...mapOptions(districtList)]}
                                                            onChange={e => console.log(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <Button shape="primary" type="submit">
                                                    Save this section
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                />
                                {/* //curent Address */}
                                <Form
                                    initialValues={currentAddressData}
                                    onSubmit={handleCurrentAddressSave}
                                    render={() => (
                                        <>
                                            <div>
                                                <div>
                                                    <span>Current Address</span>
                                                </div>
                                                <div>
                                                    <CheckBox
                                                        id="same"
                                                        name="same"
                                                        label="same as Permanent address"
                                                        onChange={(event: any) => setSameAsPermanentAddressCheck(event.target.checked)}
                                                    />
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="currentFlat"
                                                            name="currentFlat"
                                                            type="text"
                                                            label="Flat/Building/Floor/House Number"
                                                            placeholder="Flat/Building/Floor/House Number"
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="currentColony"
                                                            name="currentColony"
                                                            type="text"
                                                            label="Colony/Street/Locality"
                                                            placeholder="Colony/Street/Locality"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="currentLocality"
                                                            name="currentLocality"
                                                            type="text"
                                                            label="Locality"
                                                            placeholder="Locality"
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="currentLandmark"
                                                            name="currentLandmark"
                                                            type="text"
                                                            label="Landmark"
                                                            placeholder="Landmark"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="currentVillage"
                                                            name="currentVillage"
                                                            type="text"
                                                            label="Village/Town/City"
                                                            placeholder="Village/Town/City"
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="currentPincode"
                                                            name="currentPincode"
                                                            type="number"
                                                            label="Pincode"
                                                            placeholder="Pincode"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Select
                                                            id="currentState"
                                                            name="currentState"
                                                            label="State"
                                                            placeholder="Select State"
                                                            options={[...mapOptions(stateList)]}
                                                            onChange={e => selectStateValue(e)}
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Select
                                                            id="currentDistrict"
                                                            name="currentDistrict"
                                                            label="District"
                                                            placeholder="Select district"
                                                            options={districtList}
                                                            onChange={e => console.log(e)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <Button shape="primary" type="submit">
                                                    Save this section
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                />

                                {/* ID */}
                                <Form
                                    initialValues={IdData}
                                    onSubmit={handleIdSave}
                                    render={() => (
                                        <>
                                            <div>
                                                <div>
                                                    <span>ID</span>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="aadharNumber"
                                                            name="aadharNumber"
                                                            type="number"
                                                            label="Aadhar Number"
                                                            placeholder="Aadhar Number"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="voterId"
                                                            name="voterId"
                                                            type="number"
                                                            label="Voter Id Number"
                                                            placeholder="Voter Id Number"
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <FileUpload
                                                            name="voterIdFile"
                                                            upload={uploadFile}
                                                            accept={[
                                                                'application/pdf',
                                                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                                                'application/vnd.ms-excel',
                                                                'application/msword',
                                                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                                                'application/vnd.ms-powerpoint',
                                                                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                                                'text/plain'
                                                            ]}
                                                            label={''}
                                                            type={'single'}
                                                            maxSize={'2gb'}
                                                            onCancel={onCancelRequest}
                                                            isCancelAllowed={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="panNumber"
                                                            name="panNumber"
                                                            type="text"
                                                            label="Pan Number"
                                                            placeholder="Pan Number"
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <FileUpload
                                                            name="panCardFile"
                                                            upload={uploadFile}
                                                            accept={[
                                                                'application/pdf',
                                                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                                                'application/vnd.ms-excel',
                                                                'application/msword',
                                                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                                                'application/vnd.ms-powerpoint',
                                                                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                                                'text/plain'
                                                            ]}
                                                            label={''}
                                                            type={'single'}
                                                            maxSize={'2gb'}
                                                            onCancel={onCancelRequest}
                                                            isCancelAllowed={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="drivingLicense"
                                                            name="drivingLicense"
                                                            type="text"
                                                            label="Driving License"
                                                            placeholder="Driving License"
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <FileUpload
                                                            name="drivingLicenseFile"
                                                            upload={uploadFile}
                                                            accept={[
                                                                'application/pdf',
                                                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                                                'application/vnd.ms-excel',
                                                                'application/msword',
                                                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                                                'application/vnd.ms-powerpoint',
                                                                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                                                'text/plain'
                                                            ]}
                                                            label={''}
                                                            type={'single'}
                                                            maxSize={'2gb'}
                                                            onCancel={onCancelRequest}
                                                            isCancelAllowed={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <Button shape="primary" type="submit">
                                                    Save this section & Proceed
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                />
                                {/* letter of authorisation */}
                                <Form
                                    initialValues={authorisationData}
                                    onSubmit={handleAuthorisationSave}
                                    render={() => (
                                        <>
                                            <div>
                                                <div>
                                                    <span>Letter Of Authorisation</span>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <FileUpload
                                                            name="letterOfAuthorisation"
                                                            upload={uploadFile}
                                                            accept={[
                                                                'application/pdf',
                                                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                                                'application/vnd.ms-excel',
                                                                'application/msword',
                                                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                                                'application/vnd.ms-powerpoint',
                                                                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                                                'text/plain'
                                                            ]}
                                                            label={''}
                                                            type={'single'}
                                                            maxSize={'2gb'}
                                                            onCancel={onCancelRequest}
                                                            isCancelAllowed={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <Button shape="primary" type="submit">
                                                    Save this section & Proceed
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                />

                                {/* BGV Form */}
                                <Form
                                    initialValues={bgvFormData}
                                    onSubmit={handleBGVFormSave}
                                    render={() => (
                                        <>
                                            <div>
                                                <div>
                                                    <span>BGV Form</span>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <FileUpload
                                                            name="bgvForm"
                                                            upload={uploadFile}
                                                            accept={[
                                                                'application/pdf',
                                                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                                                'application/vnd.ms-excel',
                                                                'application/msword',
                                                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                                                'application/vnd.ms-powerpoint',
                                                                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                                                'text/plain'
                                                            ]}
                                                            label={''}
                                                            type={'single'}
                                                            maxSize={'2gb'}
                                                            onCancel={onCancelRequest}
                                                            isCancelAllowed={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <Button shape="primary" type="submit">
                                                    Save this section
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                />

                                {/* social media */}

                                <Form
                                    initialValues={socialData}
                                    onSubmit={handleSocialDataSave}
                                    render={() => (
                                        <>
                                            <div>
                                                <div>
                                                    <span>Social Media Handles</span>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="linkedin"
                                                            name="linkedin"
                                                            type="text"
                                                            label="Linkedin ID / URL"
                                                            placeholder="Linkedin ID / URL"
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="instagram"
                                                            name="instagram"
                                                            type="text"
                                                            label="Instagram ID / URL"
                                                            placeholder="Instagram ID / URL"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="twitter"
                                                            name="twitter"
                                                            type="text"
                                                            label="Twitter ID / URL"
                                                            placeholder="Twitter ID / URL"
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Input
                                                            id="facebook"
                                                            name="facebook"
                                                            type="text"
                                                            label="FaceBook ID / URL"
                                                            placeholder="Facebook ID / URL"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <Button shape="primary" type="submit">
                                                    Save this section & Proceed
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                />
                                <div className='row'>
                                    <div className="col-md-12">
                                        <CheckBox
                                            id={"consent"}
                                            name={"consent"}
                                            label={"The Individual does not and will not have any objection to Lipitech sharing the Individual personal information or documents including but not limited to name gender date of birth addresses mobile number email education record employment record Aadhaar number other government issued IDs such as Voter ID PAN card driving license etc. Collectively Proprietary Information with OnGrid Handy Online Solutions Private Limited for the purpose of background checks and verification. The individual understands that OnGrid maintains Proprietary Information on its platform in a secure manner and it will only be accessible to Lipitech and its associates partners or affiliates and will not be shared with any other individual or organisation without the Individuals explicit consent."}
                                            onChange={event => handleConsentSelect(event)}
                                        />
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <Button shape="primary" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </>
                        )}
                    />
                </>

            </section>
        </>
    );
};

export default CreateVerificationPage;
