require('dotenv').config()

function getValidConfig (configEnv, keys) {
  let {config, missingKeys} = keys.reduce((acc, key) => {
    if (!configEnv[key]) {
      acc.missingKeys.push(key)
    } else {
      acc.config[key] = configEnv[key]
    }
    return acc
  }, {config: {}, missingKeys: []})

  if (missingKeys.length) {
    throw new Error(`Contentful key is missing : ${missingKeys.join(', ')}`)
  }
  return config
}

module.exports = {
  getConfigForKeys (keys) {
    const configEnv = {
      CTF_SPACE_ID: process.CTF_SPACE_ID,
      CTF_CDA_ACCESS_TOKEN: process.CTF_CDA_ACCESS_TOKEN,
      CTF_PERSON_ID: process.CTF_PERSON_ID,
      CTF_BLOG_ID: process.CTF_BLOG_ID,
    }
    return getValidConfig(configEnv, keys)
  }
}
