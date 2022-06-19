import {dependencies as DEPENDENCY_MODULES, variables as DEPENDENCY_NAMES} from './dependency-data.js'

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
    "if (!doesVariablesListExists) {const variablesListID = dataModel.addDeserializedItemToPage(ps, pageId, VARIABLES_NAMESPACE, {type: 'VariablesList',variables: [`#${variableID}`]})dataModel.linkComponentToItemByType(ps, componentPointer, variablesListID, VARIABLES_NAMESPACE)}"
];

const getRandomDependency = (dependenciesArr, i, choice) => {
    const availableDependencies = dependenciesArr.length - i;
    const dependencyIndex = choice || Math.floor(Math.random() * availableDependencies) + i;
    const dependency = dependenciesArr.splice(dependencyIndex, 1)[0];
    dependenciesArr.unshift(dependency);

    return [dependency, dependencyIndex];
};

const generateDependencies = ({depNames, depModules} = {}) => {
    const dependencyModules = depModules || DEPENDENCY_MODULES
    const dependencyNames = depNames || DEPENDENCY_NAMES
    const dependenciesCount = Math.ceil(
        Math.random() * 20
    );

    const dependencies = [];
    for (let i = 0; i < dependenciesCount; i++) {
        const [name, index] = getRandomDependency(dependencyNames, i);
        const [module] = getRandomDependency(dependencyModules, i, index);
        dependencies.push({name, module});
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
    dependencies: generateDependencies(options)
    // code: generateCode()
});

export const generateData = (linesCount, options) => {
    const data = [];
    for (let i = 0; i < linesCount; i++) {
        data.push(generateSingleData(options));
    }

    return data;
};
