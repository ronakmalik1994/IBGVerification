import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import EduCrackAPI from '@lipihipi/client-sdk';
import '@lipihipi/theme';
import EducrackAPI from '@lipihipi/client-sdk';
import VerificationListing from '../src/admin/list/index'
import CreateVerificationPage from '../src/admin/Create/index'
// import './style.css';

export default {
    title: 'Admin',
};

EduCrackAPI.setENV('development');

export const adminBoardingListing = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        EduCrackAPI.auth
            .login({
                email: 'educrack2023@gmail.com',
                password: 'password',
            })
            .then(() => {
                setLoggedIn(true);
            });
    }, []);

    return (
        <BrowserRouter>
            {isLoggedIn && (
                <VerificationListing
                    getCandidateList={EducrackAPI.bgv.list}
                    title={"All Candidate - Applied"}
                    breadCrumbs={[
                        { title: "All Candidates" }
                    ]}
                    onAddCandidate={() => console.log("On Add new request")}
                    onEditClick={(id: String) => {
                        console.log('Edit request clicked', id);
                    }}
                />
            )}
        </BrowserRouter>
    );
};

export const adminBoardingProfile = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        EduCrackAPI.auth
            .login({
                email: 'educrack2023@gmail.com',
                password: 'password',
            })
            .then(() => {
                setLoggedIn(true);
            });
    }, []);

    return (
        <BrowserRouter>
            {isLoggedIn && (
                <CreateVerificationPage
                    getAssetUrl={EduCrackAPI.asset.getAssetUrl}
                    createAsset={EduCrackAPI.asset.create}
                    title={"iBGV Management"}
                    breadCrumbs={[
                        { title: "IBGV" }
                    ]}
                    uploadFile={EduCrackAPI.asset.create}
                    onCancelRequest={EduCrackAPI.asset.cancel}
                    createProfile={EduCrackAPI.bgv.create}
                />
            )}
        </BrowserRouter>
    );
};