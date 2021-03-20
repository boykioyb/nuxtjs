async function getModel(context, namespace, ...args) {
  const [path, fn] = namespace.split('/')

  if (!path || !fn) {
    const message = `Namespace ${namespace} is invalid.`
    console.warn(message)
    throw new Error(message)
  }

  const model = require('~/models/' + path)
  if (!model) {
    const message = "Can't find namespace " + path
    console.warn(message)
    throw new Error(message)
  }

  const method = model[fn]
  if (!method || typeof method !== 'function') {
    const message = "Can't find method " + fn
    console.warn(message)
    throw new Error(message)
  }

  return await method(context, ...args)
}

export default function (context, inject) {
  async function instance() {
    return await getModel(context, ...arguments)
  }
  inject('models', instance)
  context.$models = instance
}
