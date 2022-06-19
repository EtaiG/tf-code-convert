import {dependencies as DEPENDENCY_MODULES, variables as DEPENDENCY_NAMES} from './dependency-data.js'
import {filePaths} from './random-file-as-code.js'
import fs from 'fs-extra'
import path from 'path'

const getCodeContent = ind => fs.readFileSync(path.resolve('..', filePaths[ind]), 'utf-8').replace(/\s\s+/gm, ' ')
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

const generateSingleData = (options, iteration) => ({
    dependencies: generateDependencies(options),
    code: getCodeContent(iteration)
});

export const generateData = (linesCount, options, startInd = 0) => {
    const data = [];
    for (let i = 0; i < linesCount; i++) {
        data.push(generateSingleData(options, startInd + i));
    }

    return data;
};
