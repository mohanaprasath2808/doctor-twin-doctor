export type HealthJournalEntryType = "blood_pressure" | "blood_sugar" | "weight";

export type HealthJournalFieldConfig = {
  key: string;
  label: string;
  placeholder: string;
  keyboardType?: "default" | "decimal-pad" | "number-pad";
};

/** Group fields into sections so new metrics (height, glucose, etc.) can be added without layout changes. */
export type HealthJournalSectionConfig = {
  id: string;
  title?: string;
  fields: Array<HealthJournalFieldConfig | HealthJournalFieldConfig[]>;
};

export type HealthJournalEntryConfig = {
  title: string;
  instruction: string;
  showTimeSection: boolean;
  sections: HealthJournalSectionConfig[];
  initialValues: Record<string, string>;
};

const bloodPressureConfig: HealthJournalEntryConfig = {
  title: "Blood Pressure Entry",
  instruction: "Let's record your blood pressure.",
  showTimeSection: true,
  initialValues: {
    systolic: "120",
    diastolic: "80",
    pulse: "72",
  },
  sections: [
    {
      id: "vitals",
      fields: [
        [
          { key: "systolic", label: "Systolic", placeholder: "120", keyboardType: "number-pad" },
          { key: "diastolic", label: "Diastolic", placeholder: "80", keyboardType: "number-pad" },
        ],
        {
          key: "pulse",
          label: "Pulse (optional)",
          placeholder: "72",
          keyboardType: "number-pad",
        },
      ],
    },
  ],
};

const bloodSugarConfig: HealthJournalEntryConfig = {
  title: "Blood Sugar Entry",
  instruction: "Let's record your blood sugar.",
  showTimeSection: true,
  initialValues: {
    glucose: "110 mg/dL",
    beforeMeal: "106 mg/dL",
    afterMeal: "112 mg/dL",
  },
  sections: [
    {
      id: "glucose",
      fields: [
        {
          key: "glucose",
          label: "Glucose Level",
          placeholder: "110 mg/dL",
          keyboardType: "default",
        },
      ],
    },
    {
      id: "meals",
      fields: [
        [
          {
            key: "beforeMeal",
            label: "Before Meal",
            placeholder: "106 mg/dL",
            keyboardType: "default",
          },
          {
            key: "afterMeal",
            label: "After Meal",
            placeholder: "112 mg/dL",
            keyboardType: "default",
          },
        ],
      ],
    },
  ],
};

const weightConfig: HealthJournalEntryConfig = {
  title: "Weight Entry",
  instruction: "Let's record your Weight.",
  showTimeSection: true,
  initialValues: {
    weight: "72.5 kg",
  },
  sections: [
    {
      id: "body",
      fields: [
        {
          key: "weight",
          label: "Weight",
          placeholder: "72.5 kg",
          keyboardType: "decimal-pad",
        },
      ],
    },
  ],
};

export const HEALTH_JOURNAL_ENTRY_CONFIGS: Record<
  HealthJournalEntryType,
  HealthJournalEntryConfig
> = {
  blood_pressure: bloodPressureConfig,
  blood_sugar: bloodSugarConfig,
  weight: weightConfig,
};
