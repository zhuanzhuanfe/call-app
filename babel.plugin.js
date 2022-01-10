const replaceVersionPlugin = (babel) => {
  const t = babel.types
  return {
    name: 'replace-version',
    visitor: {
      Identifier(path, state) {
        let replacementDescriptor =
          state.opts.hasOwnProperty(path.node.name) && state.opts[path.node.name]

        if (!replacementDescriptor) return

        console.log('replacementDescriptor', replacementDescriptor, state.opts[path.node.name])
        const type = typeof replacementDescriptor

        if (type === 'string' || type === 'boolean') {
          replacementDescriptor = {
            type: type,
            replacement: replacementDescriptor,
          }
        }

        const replacement = replacementDescriptor.replacement

        switch (replacementDescriptor.type) {
          case 'boolean':
            path.replaceWith(t.booleanLiteral(replacement))
            break
          default:
            // treat as string
            const str = String(replacement)
            path.replaceWith(t.stringLiteral(str))
            break
        }
      },
    },
  }
}

module.exports = {
  replaceVersionPlugin,
}
