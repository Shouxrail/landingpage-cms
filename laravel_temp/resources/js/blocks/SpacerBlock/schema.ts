export const SpacerSchema = {
  height: { type: "number", label: "Height", default: 40 },
  unit: {
    type: "select",
    label: "Unit",
    options: [
      { label: "Pixels (Scaled)", value: "px" },
      { label: "Percentage (%)", value: "%" },
      { label: "Viewport Height (vh)", value: "vh" }
    ],
    default: "px"
  },
};
