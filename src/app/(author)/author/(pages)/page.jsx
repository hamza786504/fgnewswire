"use client";
import React from 'react'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function page() {

const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const expiry = localStorage.getItem("token_expiry");

        if (!token || !expiry || Date.now() > parseInt(expiry)) {
            router.replace("/author/signin");
        }
    }, [router]);

    return (
        <>

        </>
    )
}

export default page
