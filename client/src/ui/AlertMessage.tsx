"use client";
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface AlertMessageProps {
    message: string;
    severity: "success" | "info" | "warning" | "error";
    onClose: () => void;
    open: boolean;
    autoHideDuration?: number;
}

export function AlertMessage({
    message,
    severity,
    onClose,
    open,
    autoHideDuration = 6000,
}: AlertMessageProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert severity={severity} onClose={onClose} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
