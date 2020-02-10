const elementTypes = {
    CHECKBOX: 1,
    DROPDOWN: 2,
    TEXT: 3
}
const filtersSectionBinding = [
    {
        filterClass: "patient-type-check",
        arrayName: "patientTypes",
        featurePropertyName: "patienttype",
        elementType: elementTypes.CHECKBOX
    },
    {
        filterClass: "service-category",
        arrayName: "serviceCategories",
        featurePropertyName: "ac1",
        elementType: elementTypes.CHECKBOX
    },
    {
        filterClass: "mental-health-worker",
        arrayName: "mentalHealthWorkers",
        featurePropertyName: "healthworker", //TODO: Add this filter type to the actual layout
        elementType: elementTypes.CHECKBOX
    },
    {
        filterClass: "boolean-category-check",
        arrayName: "booleanCategories"
    }
];

const codesProperties = [
	{
		name: "ac1",
		columnName: "Activity code"
	},
	{
		name: "activitycategory",
		columnName: "Activity category"
	},
	{
		name: "activitycodename",
		columnName: "Activity code name"
	},
	{
		name: "subactivitycode",
		columnName: "Subactivity code"
	},
	{
		name: "subactivitycodename",
		columnName: "Subactivity code name"
	}
];

const buttonsJson = [
    {
        buttonId : "clearPatientTypeFiltersBtn",
        className : "patient-type-check",
    },
    {
        buttonId : "clearServiceCategoryFiltersBtn",
        className : "service-category"
    },
    {
        buttonId : "clearMentalHealthWorkersBtn",
        className : "mental-health-worker"
    },
    {
        buttonId : "clearisInpatientFiltersBtn",
        className : "is-inpatient-check",

        buttonId : "clearbooleancategoryFiltersBtn",
        className : "boolean-category-check"
    }
];

const markerColors = [
    {
        code: "1",
        color: "blue"
    },
    {
        code: "2",
        color: "orange"
    },  
    {
        code: "3",
        color: "red"
    },  
    {
        code: "4",
        color: "yellow"
    },  
    {
        code: "5",
        color: "lightgreen"
    },  
    {
        code: "6",
        color: "lightpurple"
    },  
    {
        code: "7",
        color: "lightgreen"
    },
    {
        code: "8",
        color: "green"
    },  
    {
        code: "9",
        color: "pink"
    },
    {
        code: "10",
        color: "darkred"
    },
    {
        code: "11",
        color: "darkgreen"
    },
    {
        code: "12",
        color: "cadetblue"
    },
    {
        code: "13",
        color: "darkblue"
    },
    {
        code: "14",
        color: "gray"
    },
    {
        code: "15",
        color: "purple"
    },
    {
        code: "16",
        color: "lightgray"
    },
    {
        code: "default",
        color: "blue"
    }
                        
];
