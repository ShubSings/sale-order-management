
export const customerSchema = async () => {
    // Mimic API call
    return [
        {
            id: 9,
            customer: 11908,
            customer_profile: {
                id: 11908,
                name: "Ram",
                color: [182, 73, 99],
                email: "5QfZ7@example.com",
                pincode: "Mumbai",
                location_name: "Mumbai, Maharastra, India",
                type: "C",
                profile_pic: null,
                gst: "",
            },
        },
        {
            id: 10,
            customer: 12908,
            customer_profile: {
                id: 12908,
                name: "Kam",
                color: [450, 66, 55],
                email: "gae@example.com",
                pincode: "Lanka",
                location_name: "Lanka, shri, India",
                type: "C",
                profile_pic: null,
                gst: "",
            },
        },
    ];
};
