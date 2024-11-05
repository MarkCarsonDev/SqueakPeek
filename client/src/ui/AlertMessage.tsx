"use client"
import {Alert} from '@mui/material';
import React from 'react';


interface AlertMessageProps {
    message: string;
    severity: "success" | "info" | "warning" | "error";
    onClose: () => void;
}

export function AlertMessage({message, severity, onClose}: AlertMessageProps) {
    return (
        <Alert severity={severity} onClose={onClose}>
            {message}
        </Alert>
    );
}