module.exports = {
  process(fileContent) {
    return `module.exports = ${JSON.stringify(fileContent)}`
  },
}
