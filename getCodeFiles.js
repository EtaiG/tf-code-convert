import glob from 'glob'
import _ from 'lodash'
import fs from 'fs-extra'

const projects = ['santa-core', 'document-management', 'restaurants']
let files = []
projects.forEach((project, ind) => {
    const filePaths = glob.sync(`../${project}/!(node_modules|dist)*/!(node_modules|dist)/**/*.js`, {})

    files = files.concat(filePaths.filter(filePath => {
        let file
        try {
            file = fs.readFileSync(filePath, 'utf-8')
        } catch (e){
            file = ''
        }
        return file.length > 1000 && file.length < 1500
    }))
})
fs.outputFileSync(`./dataset-generator/random-file-as-code.js`, `export const filePaths = ${JSON.stringify(_.shuffle(files))}`)

