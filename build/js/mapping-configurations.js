define([], function () {
  "use strict";

  var elementTypes = {
    CHECKBOX: 1,
    DROPDOWN: 2,
    TEXT: 3
  };
  var searchByMapping = ["officialName", "mentalhealthworkers", "activitycategory", "activitycodename", "subactivitycodename"];
  var codesTab = "[conf] Coding table for mental health services mapping";
  var administrativeUnitsBindingTemplate = [{
    auLevel: 0,
    auSourceProperty: "",
    auId: "root"
  }, {
    auLevel: 1,
    auSourceProperty: "region",
    auId: "region"
  }, {
    auLevel: 2,
    auSourceProperty: "district",
    auId: "district"
  }];
  var filtersSectionBinding = [{
    filterClass: "patient-type-check",
    arrayName: "patientTypes",
    featurePropertyName: "patienttype",
    elementType: elementTypes.CHECKBOX
  }, {
    filterClass: "service-category",
    arrayName: "serviceCategories",
    featurePropertyName: "ac1",
    elementType: elementTypes.CHECKBOX
  }, {
    filterClass: "mental-health-worker",
    arrayName: "mentalHealthWorkers",
    featurePropertyName: "healthworker",
    //TODO: Add this filter type to the actual layout
    elementType: elementTypes.CHECKBOX
  }, {
    filterClass: "boolean-category-check",
    arrayName: "booleanCategories"
  }];
  var codesProperties = [{
    name: "ac1",
    columnName: "Activity code"
  }, {
    name: "activitycategory",
    columnName: "Activity category"
  }, {
    name: "activitycodename",
    columnName: "Activity code name"
  }, {
    name: "subactivitycode",
    columnName: "Subactivity code"
  }, {
    name: "subactivitycodename",
    columnName: "Subactivity code name"
  }];
  var buttonsJson = [{
    buttonId: "clearPatientTypeFiltersBtn",
    className: "patient-type-check"
  }, {
    buttonId: "clearServiceCategoryFiltersBtn",
    className: "service-category"
  }, {
    buttonId: "clearMentalHealthWorkersBtn",
    className: "mental-health-worker"
  }, {
    buttonId: "clearisInpatientFiltersBtn",
    className: "is-inpatient-check",
    buttonId: "clearbooleancategoryFiltersBtn",
    className: "boolean-category-check"
  }]; //TODO: populate an array of health workers in a facility for filtering

  var mentalHealthWorkers = [{
    healthworkersavailiable: ["Сімейні лікарі_filter", "Психіатри_filter", "Дитячі психіатри_filter", "Неврологи _filter", "Педіатри_filter", "Наркологи_filter", "Медичні психологи_filter", "Лікарі психотерапевти_filter", "Психологи_filter", "Психотерапевти _filter", "Логопеди_filter", "Терапевти _filter"]
  }];
});