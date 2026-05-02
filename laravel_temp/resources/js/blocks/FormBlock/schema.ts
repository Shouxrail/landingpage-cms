export const FormBlockSchema = {
    title: {
        type: "text",
        label: "Form Title",
        default: "Get in Touch"
    },
    description: {
        type: "text",
        label: "Form Description",
        default: "Please fill out the form below and we will get back to you as soon as possible."
    },
    formId: {
        type: "text",
        label: "Unique Form Name/ID",
        default: "contact-form"
    },
    fields: {
        type: "objectList",
        label: "Form Fields",
        default: [
            {
                name: "full_name", label: "Full Name", type: "multiple", fields: [
                    { type: "text", label: "First Name", name: "first_name", required: true, placeholder: "Matthew" },
                    { type: "text", label: "Last Name", name: "last_name", required: true, placeholder: "McCougnahey" }
                ]
            },
            { name: "email", label: "Email", type: "email", required: true, placeholder: "matthew.mccougnahey@mccougnahey.com" },
            {
                name: "phone", label: "Phone", type: "multiple", fields: [
                    {
                        type: "text",
                        label: "Line Phone",
                        name: "line_phone",
                        required: false,
                        placeholder: "+1 4522 5204"
                    },
                    {
                        type: "text",
                        label: "Mobile Phone",
                        name: "mobile_phone",
                        required: false,
                        placeholder: "+1768 4522 5204"
                    }
                ]
            },
            {
                name: "social_media", label: "Social Media", type: "multiple", fields: [
                    {
                        type: "text",
                        label: "Telegram",
                        name: "telegram",
                        required: false,
                        placeholder: "Telegram"
                    }, {
                        type: "text",
                        label: "X",
                        name: "x",
                        required: false,
                        placeholder: "X"
                    }, {
                        type: "text",
                        label: "Instagram",
                        name: "instagram",
                        required: false,
                        placeholder: "Instagram"
                    }
                ]
            },
            { name: "message", label: "Message", type: "textarea", required: true, placeholder: "" }
        ],
        itemSchema: {
            name: { type: "text", label: "Field ID (lowercase, no spaces)" },
            label: { type: "text", label: "Label Text" },
            type: {
                type: "select",
                label: "Input Type",
                options: [
                    { label: "Text", value: "text" },
                    { label: "Email", value: "email" },
                    { label: "Number", value: "number" },
                    { label: "Textarea", value: "textarea" },
                    { label: "Select Dropdown", value: "select" },
                    { label: "Multiple", value: "multiple" },
                ]
            },
            placeholder: { type: "text", label: "Placeholder" },
            required: { type: "boolean", label: "Required?" },
            options: { type: "text", label: "Select Options (comma separated)" }
        }
    },
    submitText: {
        type: "text",
        label: "Submit Button Text",
        default: "Send Message"
    },
    successMessage: {
        type: "text",
        label: "Success Message",
        default: "Thank you! Your message has been sent."
    },
    bgColor: {
        type: "color",
        label: "Form Background Color",
        default: "transparent"
    }
};
