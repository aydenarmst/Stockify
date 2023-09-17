import React from 'react';
import { Typography, Container, Box } from "@mui/material";

const TermsOfService = () => {
    return (
        <Box style={{ 
            display: 'flex', 
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: 'white' 
        }}>
            <Container maxWidth="lg" style={{ marginTop: '2em', marginBottom: '2em', padding: '0' }}>
                <Typography variant="h3" gutterBottom style={{ borderBottom: '1px solid #ddd', paddingBottom: '0.5em' }}>
                    Terms of Service
                </Typography>
                
                <Typography variant="h5" gutterBottom style={{ paddingTop: '1em', borderBottom: '1px solid #ddd', paddingBottom: '0.5em' }}>
                    1. No Financial Advice
                </Typography>
                <Typography style={{ fontSize: '1.1em', paddingLeft: '1em', paddingRight: '1em' }} paragraph>
                    The information provided by Stockify on this platform is for informational purposes only and does not constitute financial, investment, or any other form of advice. Always seek the guidance of a qualified professional with any questions you may have regarding financial matters or investment strategies. Never disregard professional advice or delay seeking it because of something you've read on this platform.
                </Typography>

                <Typography variant="h5" gutterBottom style={{ paddingTop: '1em', borderBottom: '1px solid #ddd', paddingBottom: '0.5em' }}>
                    2. Data Accuracy
                </Typography>
                <Typography style={{ fontSize: '1.1em', paddingLeft: '1em', paddingRight: '1em' }} paragraph>
                    While we strive to provide accurate and timely data, we make no guarantees of the accuracy, reliability, and completeness of the information provided. Users are strongly advised to verify any data or information before making any investment decision or taking any action. Stockify will not be responsible for any decisions made based on the data or information provided here.
                </Typography>

                <Typography variant="h5" gutterBottom style={{ paddingTop: '1em', borderBottom: '1px solid #ddd', paddingBottom: '0.5em' }}>
                    3. No Liability
                </Typography>
                <Typography style={{ fontSize: '1.1em', paddingLeft: '1em', paddingRight: '1em' }} paragraph>
                    Stockify, its affiliates, and its personnel shall not be liable for any losses or damages related to actions or failure to act related to the content on this platform.
                </Typography>
            </Container>
        </Box>
    );
};

export default TermsOfService;
