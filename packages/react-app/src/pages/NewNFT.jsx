import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';

// Components
import Layout from '../components/layouts/Layout';

// Styled
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;
    padding-bottom: 5rem;
`;

const Form = styled.form`

`;

const Field = styled.div`
    margin-bottom: 1.5rem;

    label {
        display: block;
        margin-left: .5rem;
        margin-bottom: .3rem;
        font-size: 1.4rem;
        line-height: 2.4rem;
        color: var(--gray);
    }

    label span {
        color: var(--gray2);
    }

    input, textarea, select {
        display: block;
        width: 100%;
        padding: 1.2rem;
        border-radius: .5rem;
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.3;
        background-color: var(--gray4);
        border: .2rem solid transparent;
        outline: none;
        transition: background-color .1s ease-out;

        &:focus {
            background-color: white;
            border: .2rem solid var(--gray);
        }

        &:disabled {
            cursor: not-allowed;
        }
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }

    textarea {
        resize: vertical;
    }
`;

const InputContainer = styled.div`
    position: relative;
    cursor: ${props => props.disabled ? 'not-allowed' : 'default'};

    p {
        position: absolute;
        font-size: 1.4rem;
        right: 2rem;
        top: 1.4rem;
    }
`;

const InputSubmit = styled.button`
    display: block;
    width: 100%;
    height: 5rem;
    font-size: 1.6rem;
    font-weight: 600;
    transition: border .1s ease-in-out, background .1s ease-in-out, transform .1s ease-out;
    line-height: 1.5;
    border: .2rem solid transparent;
    border-radius: .5rem;
    background-color: var(--black);
    color: var(--white);
    cursor: pointer;

    &:hover {
        background-color: var(--gray);
    }
`;

const InputFile = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1.2rem;
    border-radius: .5rem;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.3;
    background-color: var(--gray4);
    border: .2rem solid transparent;
    outline: none;
    transition: background-color .1s ease-out;
    cursor: pointer;

    &:hover {
        background-color: var(--gray3);
    }

    div {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    img {
        max-width: 4rem;
        max-height: 4rem;
    }
`;

const InfoContainer = styled.div`
    -webkit-box-shadow: 0px 0px 13px 1px rgba(0,0,0,0.5);
    -moz-box-shadow: 0px 0px 13px 1px rgba(0,0,0,0.5);
    box-shadow: 0px 0px 13px 1px rgba(0,0,0,0.5);
    padding: 1.5rem 2rem;
    margin-bottom: 2rem;
    border-radius: .5rem;
`;

const NewNFT = () => {

    // UseRef
    const inputFileRef = useRef();
    
    // States
    const [ NFT, setNFT ] = useState({
        name: '',
        symbol: '',
        description: '',
        file: null,
        price: '',
        size: '0',
        edition: '',
        start: '',
        end: '',
        royalty: '',
        payout: ''
    });


    const handleSubmit = async e => {
        
        try {

            e.preventDefault();

        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = e => {
        setNFT({
            ...NFT,
            [e.target.name]: e.target.value
        });
    }

    const handleChangeSymbol = e => {
        setNFT({
            ...NFT,
            [e.target.name]: e.target.value.replace('$', '').toUpperCase()
        });
    }

    const handleChangeFile = e => {
        
        try {

            setNFT({
                ...NFT,
                file: e.target.files[0]
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <Container>
                <div>
                    <h1>Collection Details</h1>

                    <Form onSubmit={handleSubmit}>
                        <Field>
                            <label htmlFor='name'>Name</label>
                            <input id='name' name='name' type='text' value={NFT.name} onChange={handleChange} />
                        </Field>

                        <Field>
                            <label htmlFor='symbol'>Symbol</label>
                            <input id='symbol' name='symbol' type='text' value={`$${NFT.symbol}`} onChange={handleChangeSymbol} />
                        </Field>

                        <Field>
                            <label htmlFor='description'>Description</label>
                            <textarea id='description' name='description' value={NFT.description} onChange={handleChange} />
                        </Field>

                        <Field>
                            <label htmlFor='file'>File</label>
                            <input ref={inputFileRef} id='file' name='file' type='file' accept='video/mp4' onChange={handleChangeFile} style={{ display: 'none' }} />
                            <InputFile onClick={() => inputFileRef.current.click()}>
                                <p>{NFT.file ? NFT.file.name : 'None selected'}</p>
                                <p>{NFT.file ? 'Replace' : 'Upload'}</p>
                            </InputFile>
                        </Field>

                        <Field>
                            <label htmlFor='price'>Price</label>
                            <InputContainer>
                                <input id='price' name='price' type='number' value={NFT.price} onChange={handleChange} />
                                <p>ETH</p>
                            </InputContainer>
                        </Field>

                        <Field>
                            <label htmlFor='size'>Edition size</label>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                                <select id='size' name='size' value={NFT.size} onChange={handleChange} style={{ flex: '0 0 130px' }}>
                                    <option value='0'>Fixed</option>
                                    <option value='1'>Open edition</option>
                                </select>
                                <InputContainer style={{ flex: '1' }} disabled={NFT.size === '1'}>
                                    <input id='edition' name='edition' type='number' value={NFT.edition} disabled={NFT.size === '1'} onChange={handleChange} />
                                    <p>editions</p>
                                </InputContainer>
                            </div>
                        </Field>

                        <Field>
                            <label htmlFor='start'>Start & end time <span>Optional</span></label>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <input id='start' name='start' type='date' value={NFT.start}  onChange={handleChange} />
                                <p style={{ fontSize: '1.8rem' }}>&rArr;</p>
                                <input id='end' name='end' type='date' value={NFT.end} onChange={handleChange} />
                            </div>
                        </Field>

                        <Field>
                            <label htmlFor='royalty'>Royalty</label>
                            <InputContainer style={{ flex: '1' }}>
                                <input id='royalty' name='royalty' type='number' value={NFT.royalty} onChange={handleChange} />
                                <p>%</p>
                            </InputContainer>
                        </Field>

                        <Field>
                            <label htmlFor='payout'>Payout address</label>
                            <input id='payout' name='payout' type='text' value={NFT.payout} onChange={handleChange} />
                            <p style={{ fontSize: '1.2rem' }}>The address that will receive any withdrawals and royalties. It can be your personal wallet, a multisignature wallet, or an external splits contract.</p>
                        </Field>


                        <InputSubmit>Create</InputSubmit>
                    </Form>
                </div>
                <div style={{ marginTop: '6rem', padding: '2rem' }}>
                    <InfoContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minBlockSize: '30rem' }}>
                        { NFT.file ? (
                            <video width='100%' autoPlay controls>
                                <source src={URL.createObjectURL(NFT.file)} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <p style={{ fontSize: '3.2rem', lineHeight: '3rem', fontWeight: '500' }}>No video uploaded</p>
                        )}
                    </InfoContainer>
                    <InfoContainer style={{ fontSize: '1.4rem', color: 'var(--gray1)', lineHeight: '3rem', fontWeight: '500', letterSpacing: '.05em' }}>
                        <p style={{ fontSize: '3.5rem' }}>{NFT.name || 'Name'}</p>
                        <p style={{ marginTop: '2rem' }}><span style={{ backgroundColor: 'var(--black)', color: 'var(--white)', padding: '.2rem .5rem' }}>${NFT.symbol}</span> EDITION</p>
                        <p style={{ marginTop: '1rem' }}>{NFT.description || 'Description'}</p>

                        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                            <div>
                                <p>EDITION PRICE</p>
                                <p style={{ fontSize: '3.5rem' }}>{NFT.price} ETH</p>
                            </div>
                            
                            <div>
                                <p>TOTAL SUPPLY</p>
                                <p style={{ fontSize: '3.5rem' }}>{NFT.edition || 'OPEN'}</p>
                            </div>
                        </div>
                    </InfoContainer>
                </div>
            </Container>
        </Layout>
    ) 
};

export default NewNFT;
