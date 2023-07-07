import React, { useState } from 'react';
import {
    IconButton,
    PageHeader,
    PaginatedTable,
} from '@lipihipi/ec-ui';
import { AiOutlinePlusCircle } from 'react-icons/ai';
// import {ReactComponent as aadharBlack} from 'src\admin\assests\aadhaar_black.svg'



export const getComponent = (onClick: any, name: string) => {
    return (
        <IconButton onClick={onClick} className="primary-outine-button ml-2">
            <AiOutlinePlusCircle />
            {name}
        </IconButton>
    );
};


const VerificationListing = ({
    getCandidateList,
    title,
    breadCrumbs,
    onAddCandidate,
    onEditClick
}: any) => {
    const [params, setParams] = useState<any>({
        page: 1,
        perPage: 10,
    });
    const [candidate, setCandidate] = React.useState<any>({
        totalItems: 0,
        bgv: [],
    });

    React.useEffect(() => {
        getCandidateList({ params })
            .then(({ data }: any) => {
                setCandidate(data);
            })
    }, []);

    const verificationCode = (data: any) => {
        console.log(data, 'data')
        // switch (data.code) {
        //     case 'PANV':
        //         {data.status==='PANVCompleted'?
        //         :(data.status==='PANVCompleted'? :
        //         )}
        //     case 'VIDV':
        //         return (
                
        //        )
        //     case 'DLV':
        //         return (
                
        //             );
        //     case 'AV':
        //         return (
                
        //             )
        //     default:
        //         return (
                
        //             )
        // }
    }

    return (
        <>
            <section className="main-structure">
                <>
                    <PageHeader
                        title={title || 'All Candidates - Applied'}
                        breadCrumbs={breadCrumbs || [{ title: 'All Candidates' }]}
                        component={
                            <div className='d-flex align-items-center'>
                                {getComponent(
                                    onAddCandidate,
                                    'Create new request'
                                )}

                            </div>
                        }
                    />

                    <PaginatedTable
                        data={candidate.bgv}
                        columns={[
                            {
                                dataRenderer: (data: any, index: number) => (
                                    <>
                                        <div className="primary-text">{index + 1}</div>
                                    </>
                                ),
                                title: 'S.No',
                                width: '15%',
                            },
                            {
                                dataRenderer: (data: any) => (
                                    <div className="primary-text">{data?.name}</div>
                                ),
                                title: 'Name',
                                width: '20%',
                            },
                            {
                                dataRenderer: (data: any) => (
                                    <div className="primary-text">
                                        <span>{data?.phone}<br></br></span>
                                        <span>{data?.email}<br></br></span>
                                        <span>{data?.permanentAddress?.state}<br></br></span>
                                    </div>
                                ),
                                title: 'Personal Details',
                                width: '25%',
                            },
                            {
                                dataRenderer: (data: any) => (
                                    <div className="primary-text">
                                        {data?.verifications.map((item: any) => {
                                            <span>{verificationCode(item)}<br></br></span>
                                        })}
                                    </div>
                                ),
                                title: 'verification',
                                width: '25%',
                            },
                            {
                                dataRenderer: (data: any) => (
                                    <div className="primary-text">
                                        {data?.documents.map((item: any) => {
                                            <span>{verificationCode(item)}<br></br></span>
                                        })}
                                    </div>
                                ),
                                title: 'Documents',
                                width: '15%',
                            },
                            // {
                            //     dataRenderer: (data: any) => (
                            //         <ListItemAction className="action-button">
                            //             <ActionButton>
                            //                 <BsThreeDotsVertical />
                            //             </ActionButton>
                            //             <Menu>
                            //                 <li onClick={() => onEditClick(data._id)}>Edit</li>
                            //             </Menu>
                            //         </ListItemAction>
                            //     ),
                            //     title: '',
                            //     width: '10%',
                            // },
                        ]}
                        totalItems={candidate.totalItems}
                        onPageChange={(page: any) => {
                            setParams({ ...params, page: page });
                        }}
                        itemsPerPage={10}
                        currentPage={params.page || 1}
                    />
                </>

            </section>
        </>
    );
};

export default VerificationListing;
