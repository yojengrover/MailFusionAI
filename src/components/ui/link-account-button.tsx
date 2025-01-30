'use client'
import React from "react";
import { Button } from "./button";
import { getAurinkoÄuthUrl } from "@/lib/aurinko";

const LinkAccountButton = ({ }) => {
    return <Button onClick={async () => {
        const authUrl = await getAurinkoÄuthUrl('Google');
        window.location.href = authUrl;

    }}
    >
        Link Account</Button>
}
export default LinkAccountButton;

// 'use client'
// import React from "react";
// import { Button } from "./button";

// const LinkAccountButton = () => {
//     return (
//         <Button
//             onClick={async () => {
//                 const response = await fetch("/api/auth/aurinko");
//                 if (!response.ok) {
//                     console.error("Failed to get Aurinko Auth URL");
//                     return;
//                 }
//                 const { authUrl } = await response.json();
//                 window.location.href = authUrl;
//             }}
//         >
//             Link Account
//         </Button>
//     );
// };

// export default LinkAccountButton;
