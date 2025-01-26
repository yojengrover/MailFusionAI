import { db } from "@/server/db";

export const POST = async (req: Request) => {
    const { data } = await req.json();
    console.log("Clerk webhook received", data);
    
    const { email_address: emailAddress } = data.email_addresses[0];
    const firstName = data.first_name;
    const lastName = data.last_name;
    const imageUrl = data.image_url;
    const id = data.id;

    try {
        await db.user.create({
            data: {
                id: id,
                emailAddress: emailAddress, // Correct field name
                firstName: firstName,
                lastName: lastName,
                imageUrl: imageUrl,
            },
        });

        console.log("Clerk webhook received", data);
        return new Response("Webhook received", { status: 200 });
    } catch (error) {
        console.error("Error creating user:", error);
        return new Response("Error processing webhook", { status: 500 });
    }
};
