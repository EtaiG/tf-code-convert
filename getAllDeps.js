import glob from 'glob'
import _ from 'lodash'
import fs from 'fs-extra'

const packageJsons = glob.sync('node_modules/**/package.json')
let dependencies = []
packageJsons.forEach(packageJson => {
    let file
    try {
        file = fs.readJsonSync(packageJson)
    } catch (e){
        file = {}
    }
    const newDeps = _.keys(file.dependencies || {}).concat(_.keys(file.devDependencies || {}))
    dependencies = dependencies.concat(newDeps)
})
const uniqueDeps = _.uniq(dependencies)
const uniqueVars = uniqueDeps.map(v => _.camelCase(v))

const badKeys = _.keys({
    "rollupPluginCommonjs": [
        "rollupPluginCommonjs",
        "rollupPluginCommonjs"
    ],
    "rollupPluginNodeResolve": [
        "rollupPluginNodeResolve",
        "rollupPluginNodeResolve"
    ],
    "babelCore": [
        "babelCore",
        "babelCore"
    ],
    "babelPresetEnv": [
        "babelPresetEnv",
        "babelPresetEnv"
    ],
    "babelCli": [
        "babelCli",
        "babelCli"
    ],
    "rollupPluginBabel": [
        "rollupPluginBabel",
        "rollupPluginBabel"
    ],
    "babelPolyfill": [
        "babelPolyfill",
        "babelPolyfill"
    ],
    "babelRegister": [
        "babelRegister",
        "babelRegister"
    ],
    "babelPluginExternalHelpers": [
        "babelPluginExternalHelpers",
        "babelPluginExternalHelpers"
    ],
    "babelPluginTransformReactJsx": [
        "babelPluginTransformReactJsx",
        "babelPluginTransformReactJsx"
    ],
    "rollupPluginReplace": [
        "rollupPluginReplace",
        "rollupPluginReplace"
    ],
    "objectAssign": [
        "objectAssign",
        "objectAssign"
    ]
})

const reallyUniqueDeps = []
const reallyUniqueVars = []
_.forEach(uniqueVars, (v, i) => {
    if (!badKeys.includes(v)) {
        reallyUniqueDeps.push(uniqueDeps[i])
        reallyUniqueVars.push(v)
    }
})
fs.outputFileSync('./dataset-generator/dependency-data.json', JSON.stringify({
    dependencies: reallyUniqueDeps,
    variables: reallyUniqueVars
}, null, 4))
