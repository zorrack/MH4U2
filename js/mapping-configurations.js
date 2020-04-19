const elementTypes = {
    CHECKBOX: 1,
    DROPDOWN: 2,
    TEXT: 3
}

const searchByMapping = [
    "officialName",
    "mentalhealthworkers",
    "activitycategory",
    "activitycodename",
    "subactivitycodename"

];

const codesTab = "[conf] Coding table for mental health services mapping";

const administrativeUnitsBindingTemplate = [
    {
        auLevel: 0,
        auSourceProperty: "",
        auId: "root",
    },
    {
        auLevel: 1,
        auSourceProperty: "region",
        auId: "region",
    },
    {
        auLevel: 2,
        auSourceProperty: "district",
        auId: "district"
    }
];

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
        filterClass: "boolean-categories",
        arrayName: "booleanCategories"
    },
    {
        filterClass: "other-categories-check",
        arrayName: "otherCategories"
    },
    {
        filterClass: "facility-type-check",
        arrayName: "facilityTypes",
        featurePropertyName: "facilitytype",
        elementType: elementTypes.CHECKBOX
    }
];

const codesProperties = [
	{
		name: "ac1",
		columnName: "Activity code",
        category: "1"
	},
	{
		name: "activitycategory",
		columnName: "Activity category",
        category: "1"
	},
	{
		name: "activitycodename",
		columnName: "Activity code name",
        category: "1"
	},
	{
		name: "subactivitycode",
		columnName: "Subactivity code",
        category: "1"
	},
	{
		name: "subactivitycodename",
		columnName: "Subactivity code name",
        category: "1"
	},
    {
        name: "ac2",
        columnName: "Activity code",
        category: "2"
    },
    {
        name: "subactivitycode2",
        columnName: "Subactivity code",
        category: "2"
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
        buttonId : "clearbooleancategoryFiltersBtn",
        className : "boolean-category-check"
    },
    {
        buttonId : "clearOtherCategoryFiltersBtn",
        className : "other-categories-check",
    },
    {
        buttonId : "clearFacilityTypeFiltersBtn",
        className : "facility-type-check",
    }
];