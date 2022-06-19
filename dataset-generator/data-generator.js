const DEPENDENCY_NAMES = [
  "_",
  "constants",
  "dataIds",
  "variantsUtils",
  "variants",
  "dataSerialization",
  "dataModel",
  "dsUtils",
  "extensionsAPI",
  "documentManagerUtils",
];

const DEPENDENCY_MODULES = [
  "lodash",
  "documentServices/constants/constants",
  "documentServices/dataModel/dataIds",
  "documentServices/variants/variantsUtils",
  "documentServices/variants/variants",
  "documentServices/dataModel/dataSerialization",
  "documentServices/dataModel/dataModel",
  "documentServices/utils/utils",
  "documentServices/extensionsAPI/extensionsAPI",
  "@wix/document-manager-utils",
];

const CODE_LINES = [
  "validateCompPointer(ps, componentPointer)",
  "if (!variableData) {throw createVariablesError('The variableData is missing')}",
  "if (!variableData.type) {throw createVariablesError('The variableData is missing variable type')}",
  "if (!variableData.value) {throw createVariablesError('The variableData is missing default value for the variant')}",
  "const pagePointer = ps.pointers.components.getPageOfComponent(componentPointer)",
  "const pageId = pagePointer && pagePointer.id",
  "//create variable",
  "const variableID = dataSerialization.addSerializedItemToPage(ps,pageId,{name: variableData.name,type: variableData.type},variableToAddRef.id,VARIABLES_NAMESPACE)",
  "//add default value",
  "variantsUtils.updateDataConsideringVariants(ps, variableToAddRef, 'value', variableData.value, VARIABLES_NAMESPACE)",
  "const variablesListPointer = dataModel.getComponentDataPointerByType(ps, componentPointer, VARIABLES_NAMESPACE)",
  "const doesVariablesListExists = ps.dal.isExist(variablesListPointer)",
  "if (!doesVariablesListExists) {const variablesListID = dataModel.addDeserializedItemToPage(ps, pageId, VARIABLES_NAMESPACE, {type: 'VariablesList',variables: [`#${variableID}`]})dataModel.linkComponentToItemByType(ps, componentPointer, variablesListID, VARIABLES_NAMESPACE)}",
];

const getRandomDependency = (dependenciesArr, i) => {
  const availableDependencies = dependenciesArr.length - i;
  const dependencyIndex = Math.floor(Math.random() * availableDependencies) + i;
  const dependency = dependenciesArr.splice(dependencyIndex, 1)[0];
  dependenciesArr.unshift(dependency);

  return dependency;
};

const generateDependencies = ({depNames, depModules} = {}) => {
  const dependencyModules = depModules || DEPENDENCY_MODULES
  const dependencyNames = depNames || DEPENDENCY_NAMES
  const dependenciesCount = Math.floor(
    Math.random() * dependencyModules.length
  );

  const dependencies = [];
  for (let i = 0; i < dependenciesCount; i++) {
    const name = getRandomDependency(dependencyNames, i);
    const module = getRandomDependency(dependencyModules, i);
    dependencies.push({ name, module });
  }

  return dependencies;
};

const generateCode = () => {
  const linesCount = Math.floor(Math.random() * (CODE_LINES.length - 3)) + 3;

  const code = [];
  for (let i = 0; i < linesCount; i++) {
    const lineIndex = Math.floor(Math.random() * CODE_LINES.length);
    code.push(CODE_LINES[lineIndex]);
  }

  return code.join("\\n");
};

const generateSingleData = (options) => ({
  dependencies: generateDependencies(options),
  code: generateCode(),
});

export const generateData = (linesCount, options) => {
  const data = [];
  for (let i = 0; i < linesCount; i++) {
    data.push(generateSingleData(options));
  }

  return data;
};
