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
            { name: "name", label: "Full Name", type: "text", required: true, placeholder: "John Doe" },
            { name: "email", label: "Email Address", type: "email", required: true, placeholder: "john@example.com" },
            { name: "message", label: "Your Message", type: "textarea", required: true, placeholder: "How can we help?" }
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
                    { label: "Select Dropdown", value: "select" }
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
        type: "text", 
        label: "Form Background Color", 
        default: "rgba(255, 255, 255, 0.05)" 
    }
};
